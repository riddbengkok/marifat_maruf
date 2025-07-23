import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const email = searchParams.get('email');

  if (id) {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
    });
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ status: order.status, id: order.id });
  } else if (email) {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: { order: { orderBy: { createdAt: 'desc' }, take: 1 } },
    });
    if (!user || !user.order.length) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    const order = user.order[0];
    return NextResponse.json({
      status: order.status,
      id: order.id,
      statusPayment: order.statusPayment,
      price: order.price,
      published: order.published,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      userId: order.userId,
    });
  } else {
    return NextResponse.json({ error: 'Missing id or email' }, { status: 400 });
  }
}
