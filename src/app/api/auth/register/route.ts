import {
  SubscriptionStatusResponse,
  UserRegistrationRequest,
  UserRegistrationResponse,
} from '@/lib/api-types';
import {
  createErrorResponse,
  createSuccessResponse,
  validateRequiredFields,
} from '@/lib/api-utils';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body: UserRegistrationRequest = await req.json();

    const validationError = validateRequiredFields(body, ['email']);
    if (validationError) {
      return createErrorResponse(validationError, 400);
    }

    const { email, name, firebaseUid } = body;

    // Upsert user: create if not exists, update if exists
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        status: 'active',
        ...(firebaseUid ? { firebaseUid } : {}),
      },
      create: {
        email,
        name,
        status: 'active',
        ...(firebaseUid ? { firebaseUid } : {}),
      },
    });

    const response: UserRegistrationResponse = { user };
    return createSuccessResponse(response);
  } catch (error) {
    console.error('User registration error:', error);
    return createErrorResponse('Failed to register user');
  }
}

// Get subscription status
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const firebaseUid = searchParams.get('firebaseUid');
    const email = searchParams.get('email');

    if (!firebaseUid && !email) {
      return createErrorResponse('firebaseUid or email is required', 400);
    }

    // Find user by firebaseUid or email
    let user = null;
    if (firebaseUid) {
      user = await prisma.user.findUnique({
        where: { firebaseUid },
      });
    } else if (email) {
      user = await prisma.user.findUnique({
        where: { email },
      });
    }

    if (!user) {
      const response: SubscriptionStatusResponse = { status: 'none' };
      return createSuccessResponse(response);
    }

    // Fetch subscription separately
    const subscription = await prisma.subscription.findUnique({
      where: { userId: user.id },
    });

    if (!subscription) {
      const response: SubscriptionStatusResponse = { status: 'none' };
      return createSuccessResponse(response);
    }

    // Consider 'active' if status is 'active' and not expired
    const now = new Date();
    const isActive =
      subscription.status === 'active' &&
      (!subscription.endsAt || new Date(subscription.endsAt) > now);

    const response: SubscriptionStatusResponse = {
      status: isActive ? 'active' : 'inactive',
    };
    return createSuccessResponse(response);
  } catch (error) {
    console.error('Subscription status error:', error);
    return createErrorResponse('Failed to fetch subscription status');
  }
}

// Subscribe a user (admin/dev utility)
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { firebaseUid, email, plan = 'pro' } = body;

    if (!firebaseUid && !email) {
      return createErrorResponse('firebaseUid or email is required', 400);
    }

    // Find user by firebaseUid or email
    const user = await prisma.user.findFirst({
      where: firebaseUid ? { firebaseUid } : { email },
    });

    if (!user) {
      return createErrorResponse('User not found', 404);
    }

    // Upsert subscription
    const subscription = await prisma.subscription.upsert({
      where: { userId: user.id },
      update: {
        status: 'active',
        plan,
        startedAt: new Date(),
        endsAt: null,
      },
      create: {
        userId: user.id,
        status: 'active',
        plan,
        startedAt: new Date(),
      },
    });

    return createSuccessResponse({ success: true, subscription });
  } catch (error) {
    console.error('Subscribe user error:', error);
    return createErrorResponse('Failed to subscribe user');
  }
}
