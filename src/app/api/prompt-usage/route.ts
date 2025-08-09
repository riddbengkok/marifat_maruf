import { PromptUsageRequest, PromptUsageResponse } from '@/lib/api-types';
import {
  createErrorResponse,
  createSuccessResponse,
  validateRequiredFields,
} from '@/lib/api-utils';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

// GET: Get current user's promptGenCount
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return createErrorResponse('Missing email', 400);
    }

    // Only select promptGenCount for type safety
    const user = await prisma.user.findUnique({
      where: { email },
      select: { promptGenCount: true },
    });

    if (!user) {
      return createErrorResponse('User not found', 404);
    }

    const response: PromptUsageResponse = { count: user.promptGenCount };
    return createSuccessResponse(response);
  } catch (error) {
    console.error('Prompt usage GET error:', error);
    return createErrorResponse('Server error');
  }
}

// POST: Decrement current user's promptGenCount
export async function POST(req: NextRequest) {
  try {
    const body: PromptUsageRequest = await req.json();

    const validationError = validateRequiredFields(body, ['email']);
    if (validationError) {
      return createErrorResponse(validationError, 400);
    }

    const { email } = body;

    // Only select promptGenCount for type safety
    const user = await prisma.user.findUnique({
      where: { email },
      select: { promptGenCount: true },
    });

    if (!user) {
      return createErrorResponse('User not found', 404);
    }

    // Only decrement if count is above 0
    if (user.promptGenCount > 0) {
      const updated = await prisma.user.update({
        where: { email },
        data: { promptGenCount: { decrement: 1 } },
        select: { promptGenCount: true },
      });

      const response: PromptUsageResponse = { count: updated.promptGenCount };
      return createSuccessResponse(response);
    } else {
      const response: PromptUsageResponse = { count: 0 };
      return createSuccessResponse(response);
    }
  } catch (error) {
    console.error('Prompt usage POST error:', error);
    return createErrorResponse('Server error');
  }
}
