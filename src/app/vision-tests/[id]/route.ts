import { createErrorResponse, createSuccessResponse } from '@/lib/api-utils';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

function isAuthorized(req: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) return true;
  return req.headers.get('x-admin-secret') === adminSecret;
}

interface RouteContext {
  params: { id: string };
}

export async function GET(_req: NextRequest, context: RouteContext) {
  const id = Number(context.params.id);
  const item = await prisma.visionTest.findUnique({ where: { id } });

  if (!item) {
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ item }), { status: 200 });
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  if (!isAuthorized(req)) return createErrorResponse('Unauthorized', 401);
  const id = Number(context.params.id);
  const body = await req.json();
  const item = await prisma.visionTest.update({
    where: { id },
    data: {
      title: body.title ?? undefined,
      imageUrl: body.imageUrl ?? undefined,
      imageData: body.imageData ?? undefined,
    },
  });
  return createSuccessResponse({ item });
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  if (!isAuthorized(req)) return createErrorResponse('Unauthorized', 401);
  const id = Number(context.params.id);
  await prisma.visionTest.delete({ where: { id } });
  return createSuccessResponse({ success: true });
}
