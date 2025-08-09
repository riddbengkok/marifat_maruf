import { OrderStatusResponse } from '@/lib/api-types';
import { createErrorResponse, createSuccessResponse } from '@/lib/api-utils';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const email = searchParams.get('email');

    if (id) {
      const order = await prisma.order.findUnique({
        where: { id: parseInt(id) },
      });

      if (!order) {
        return createErrorResponse('Order not found', 404);
      }

      const response: OrderStatusResponse = {
        status: order.status,
        id: order.id,
      };
      return createSuccessResponse(response);
    } else if (email) {
      // Find the user by email
      const user = await prisma.user.findUnique({
        where: { email },
        include: { order: { orderBy: { createdAt: 'desc' }, take: 1 } },
      });

      if (!user || !user.order.length) {
        return createErrorResponse('Order not found', 404);
      }

      const order = user.order[0];
      const response: OrderStatusResponse = {
        status: order.status,
        id: order.id,
        statusPayment: order.statusPayment ?? undefined,
        price: order.price ?? undefined,
        published: order.published,
        createdAt: order.createdAt.toISOString(),
        updatedAt: order.updatedAt.toISOString(),
        userId: order.userId ?? undefined,
      };
      return createSuccessResponse(response);
    } else {
      return createErrorResponse('Missing id or email', 400);
    }
  } catch (error) {
    console.error('Order status error:', error);
    return createErrorResponse('Failed to fetch order status');
  }
}
