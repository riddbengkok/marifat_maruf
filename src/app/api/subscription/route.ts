// Add this at the top for TypeScript module declaration
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
// @ts-expect-error: No types available for 'midtrans-client', safe to ignore for JS import
import midtransClient from 'midtrans-client';
import { NextRequest, NextResponse } from 'next/server';
const prisma = new PrismaClient();

type CustomerDetails = {
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
};

type ItemDetail = {
  id: string;
  price: number;
  quantity: number;
  name: string;
};

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
  const snap = new midtransClient.Snap({
    isProduction,
    serverKey: process.env.SERVER_KEY_MIDTRANS,
    clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY_MIDTRANS,
  });

  // Explicitly set the Snap API base URL for prod/staging
  snap.apiConfig.apiBaseUrl = isProduction
    ? 'https://app.midtrans.com/snap/v1'
    : 'https://app.sandbox.midtrans.com/snap/v1';

  const parameter = {
    transaction_details: {
      order_id,
      gross_amount: 10000, // Fixed gross amount as requested
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
    const body = await req.json();
    // If this is a Midtrans notification (webhook), reject here (handled in notify route)
    if (body.order_id && body.transaction_status) {
      return NextResponse.json(
        { error: 'Webhook not allowed here' },
        { status: 405 }
      );
    }
    // --- Handle Snap Token Generation (frontend) ---
    const { customer_details, item_details, email } = body;
    if (!email) {
      return NextResponse.json({ error: 'email is required' }, { status: 400 });
    }
    // 1. Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
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
    return NextResponse.json({
      token,
      order_id,
    });
  } catch (error) {
    let message = 'Failed to process request';
    if (error instanceof Error) message = error.message;
    else if (typeof error === 'string') message = error;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// --- New: /api/subscription/notify for Midtrans webhook ---
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      order_id,
      transaction_status,
      signature_key,
      status_code,
      gross_amount,
    } = body;
    if (
      !order_id ||
      !transaction_status ||
      !signature_key ||
      !status_code ||
      !gross_amount
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    // Signature verification
    const serverKey = process.env.SERVER_KEY_MIDTRANS || '';
    const input = order_id + status_code + gross_amount + serverKey;
    const expectedSignature = crypto
      .createHash('sha512')
      .update(input)
      .digest('hex');
    if (signature_key !== expectedSignature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
    }
    // Extract order id from order_id string
    const orderIdNum = parseInt(order_id.replace('order-', ''));
    const order = await prisma.order.findUnique({
      where: { id: orderIdNum },
      include: { user: true },
    });
    if (!order || !order.user) {
      return NextResponse.json(
        { error: 'Order or user not found' },
        { status: 404 }
      );
    }
    // If payment is success, update subscription and order
    if (
      transaction_status === 'settlement' ||
      transaction_status === 'capture' ||
      transaction_status === 'success' ||
      transaction_status === 'paid'
    ) {
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
    return NextResponse.json({ success: true });
  } catch (error) {
    let message = 'Failed to process notification';
    if (error instanceof Error) message = error.message;
    else if (typeof error === 'string') message = error;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }
    const orderIdNum = parseInt(id);
    await prisma.order.delete({ where: { id: orderIdNum } });
    return NextResponse.json({ success: true });
  } catch (error) {
    let message = 'Failed to delete order';
    if (error instanceof Error) message = error.message;
    else if (typeof error === 'string') message = error;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
