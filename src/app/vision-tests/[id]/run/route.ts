import { createErrorResponse, createSuccessResponse } from '@/lib/api-utils';
import { analyzeImageVision } from '@/lib/image-analysis-server';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

function isAuthorized(req: NextRequest): boolean {
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) return true;
  return req.headers.get('x-admin-secret') === adminSecret;
}

async function toBuffer(
  imageUrl?: string | null,
  imageData?: string | null
): Promise<Buffer> {
  if (imageData) {
    const b64 = imageData.startsWith('data:')
      ? imageData.split(',')[1]
      : imageData;
    return Buffer.from(b64, 'base64');
  }
  if (imageUrl) {
    const resp = await fetch(imageUrl);
    if (!resp.ok) throw new Error(`Fetch failed: ${resp.status}`);
    const ab = await resp.arrayBuffer();
    return Buffer.from(ab);
  }
  throw new Error('No image source');
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorized(req)) return createErrorResponse('Unauthorized', 401);
  const id = Number(params.id);

  const item = await prisma.visionTest.findUnique({ where: { id } });
  if (!item) return createErrorResponse('Not found', 404);

  try {
    const buffer = await toBuffer(item.imageUrl, item.imageData);
    const result = await analyzeImageVision(buffer);

    const updated = await prisma.visionTest.update({
      where: { id },
      data: {
        status: 'done',
        score: result.score,
        isGood: result.isGood,
        result: {
          features: result.features,
          reasons: result.reasons,
        },
        error: null,
      },
    });

    return createSuccessResponse({ item: updated });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    const updated = await prisma.visionTest.update({
      where: { id },
      data: { status: 'error', error: message },
    });
    return createErrorResponse(`Run failed: ${message}`, 500);
  }
}
