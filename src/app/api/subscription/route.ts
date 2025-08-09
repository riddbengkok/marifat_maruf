// Add this at the top for TypeScript module declaration
import {
  CustomerDetails,
  ItemDetail,
  MidtransWebhookRequest,
  PaymentRequest,
  PaymentResponse,
} from '@/lib/api-types';
import {
  createErrorResponse,
  createSuccessResponse,
  extractOrderId,
  getSubscriptionPrice,
  isSuccessfulTransaction,
  validateRequiredFields,
  verifyMidtransSignature,
} from '@/lib/api-utils';
import { prisma } from '@/lib/prisma';
import midtransClient from 'midtrans-client';
import { NextRequest } from 'next/server';

// Function to generate Midtrans Snap token for an order
async function generateMidtransToken({
  order_id,
  customer_details,
  item_details,
}: {
  order_id: string;
  customer_details: CustomerDetails;
  item_details: ItemDetail[];
}) {
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';
  const serverKey = process.env.SERVER_KEY_MIDTRANS;
  const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY_MIDTRANS;
  if (!serverKey || !clientKey) throw new Error('Midtrans keys missing');
  const snap = new midtransClient.Snap({ isProduction, serverKey, clientKey });

  // Explicitly set the Snap API base URL for prod/staging
  snap.apiConfig.apiBaseUrl = isProduction
    ? 'https://app.midtrans.com/snap/v1'
    : 'https://app.sandbox.midtrans.com/snap/v1';

  const subscribePrice = getSubscriptionPrice();

  const parameter = {
    transaction_details: {
      order_id,
      gross_amount: subscribePrice,
    },
    customer_details,
    item_details,
    credit_card: {
      secure: true,
    },
  };

  // Use createTransactionToken to get only the token
  const token = await snap.createTransactionToken(parameter);
  return { token };
}

export async function POST(req: NextRequest) {
  try {
    const body: PaymentRequest = await req.json();

    // If this is a Midtrans notification (webhook), reject here
    const isWebhook = (b: unknown): b is MidtransWebhookRequest =>
      typeof b === 'object' &&
      b !== null &&
      'order_id' in b &&
      'transaction_status' in b &&
      'signature_key' in b &&
      'status_code' in b &&
      'gross_amount' in b;

    if (isWebhook(body)) {
      return createErrorResponse('Webhook not allowed here', 405);
    }

    const validationError = validateRequiredFields(body, [
      'customer_details',
      'item_details',
      'email',
    ]);
    if (validationError) {
      return createErrorResponse(validationError, 400);
    }

    const { customer_details, item_details, email } = body;

    // 1. Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return createErrorResponse('User not found', 404);
    }

    // 2. Check for existing pending order for this user
    let order = await prisma.order.findFirst({
      where: {
        userId: user.id,
        status: 'pending',
        statusPayment: 'pending',
      },
    });

    // 3. If not found, create a new order
    if (!order) {
      order = await prisma.order.create({
        data: {
          status: 'pending',
          statusPayment: 'pending',
          price: '10000',
          published: false,
          userId: user.id,
        },
      });
    }

    // 4. Use the order's id as order_id for Midtrans
    const order_id = `order-${order.id}`;
    const { token } = await generateMidtransToken({
      order_id,
      customer_details,
      item_details,
    });

    const response: PaymentResponse = { token, order_id };
    return createSuccessResponse(response);
  } catch (error) {
    console.error('Payment processing error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to process request';
    return createErrorResponse(message);
  }
}

// Handle Midtrans webhook
export async function PATCH(req: NextRequest) {
  try {
    const body: MidtransWebhookRequest = await req.json();
    const {
      order_id,
      transaction_status,
      signature_key,
      status_code,
      gross_amount,
    } = body;

    const validationError = validateRequiredFields(body, [
      'order_id',
      'transaction_status',
      'signature_key',
      'status_code',
      'gross_amount',
    ]);
    if (validationError) {
      return createErrorResponse(validationError, 400);
    }

    // Signature verification
    if (
      !verifyMidtransSignature(
        order_id,
        status_code,
        gross_amount,
        signature_key
      )
    ) {
      return createErrorResponse('Invalid signature', 403);
    }

    // Extract order id from order_id string
    const orderIdNum = extractOrderId(order_id);
    const order = await prisma.order.findUnique({
      where: { id: orderIdNum },
      include: { user: true },
    });

    if (!order || !order.user) {
      return createErrorResponse('Order or user not found', 404);
    }

    // If payment is success, update subscription and order
    if (isSuccessfulTransaction(transaction_status)) {
      const now = new Date();
      const endsAt = new Date(now);
      endsAt.setFullYear(now.getFullYear() + 1);

      await prisma.subscription.upsert({
        where: { userId: order.user.id },
        update: {
          status: 'active',
          plan: 'pro',
          startedAt: now,
          endsAt,
        },
        create: {
          userId: order.user.id,
          status: 'active',
          plan: 'pro',
          startedAt: now,
          endsAt,
        },
      });

      await prisma.order.update({
        where: { id: order.id },
        data: { status: 'success', statusPayment: 'success' },
      });
    } else {
      // Optionally update order status for other transaction_status
      await prisma.order.update({
        where: { id: order.id },
        data: { status: transaction_status, statusPayment: transaction_status },
      });
    }

    return createSuccessResponse({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to process notification';
    return createErrorResponse(message);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return createErrorResponse('Missing id', 400);
    }

    const orderIdNum = parseInt(id);
    await prisma.order.delete({ where: { id: orderIdNum } });

    return createSuccessResponse({ success: true });
  } catch (error) {
    console.error('Order deletion error:', error);
    const message =
      error instanceof Error ? error.message : 'Failed to delete order';
    return createErrorResponse(message);
  }
}
