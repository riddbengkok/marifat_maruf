import { createErrorResponse, createSuccessResponse } from '@/lib/api-utils';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

function isAuthorized(req: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) return true;
  return req.headers.get('x-admin-secret') === adminSecret;
}

export async function GET() {
  const items = await prisma.visionTest.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return createSuccessResponse({ items });
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) return createErrorResponse('Unauthorized', 401);
  const body = await req.json();

  // require at least one image source
  const hasUrl = Boolean(body.imageUrl);
  const hasData = Boolean(body.imageData);
  if (!hasUrl && !hasData)
    return createErrorResponse('imageUrl or imageData is required', 400);

  const item = await prisma.visionTest.create({
    data: {
      title: body.title ?? null,
      imageUrl: body.imageUrl ?? null,
      imageData: body.imageData ?? null,
      method: 'vision',
      status: 'pending',
    },
  });

  // auto-run if requested ?run=1
  const url = new URL(req.url);
  if (url.searchParams.get('run') === '1') {
    // return created item and let client call /run endpoint; keeps POST fast
  }

  return createSuccessResponse({ item }, 201);
}
