import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
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
          paymentProvider: 'midtrans',
          paymentRef: order_id,
        },
        create: {
          userId: order.user.id,
          status: 'active',
          plan: 'pro',
          startedAt: now,
          endsAt,
          paymentProvider: 'midtrans',
          paymentRef: order_id,
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
