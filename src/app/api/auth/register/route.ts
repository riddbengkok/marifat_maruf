import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, firebaseUid } = body;
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
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
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}

// New API route for subscription status
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const firebaseUid = searchParams.get('firebaseUid');
    const email = searchParams.get('email');
    if (!firebaseUid && !email) {
      return NextResponse.json(
        { error: 'firebaseUid or email is required' },
        { status: 400 }
      );
    }
    // Find user by firebaseUid or email
    const user = await prisma.user.findFirst({
      where: firebaseUid ? { firebaseUid } : { email },
      include: { subscription: true },
    });
    if (!user) {
      return NextResponse.json({ status: 'none' });
    }
    if (!user.subscription) {
      return NextResponse.json({ status: 'none' });
    }
    // Consider 'active' if status is 'active' and not expired
    const now = new Date();
    const isActive =
      user.subscription.status === 'active' &&
      (!user.subscription.endsAt || new Date(user.subscription.endsAt) > now);
    return NextResponse.json({ status: isActive ? 'active' : 'inactive' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch subscription status' },
      { status: 500 }
    );
  }
}

// Subscribe a user (admin/dev utility)
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { firebaseUid, email, plan = 'pro' } = body;
    if (!firebaseUid && !email) {
      return NextResponse.json(
        { error: 'firebaseUid or email is required' },
        { status: 400 }
      );
    }
    // Find user by firebaseUid or email
    const user = await prisma.user.findFirst({
      where: firebaseUid ? { firebaseUid } : { email },
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
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
    return NextResponse.json({ success: true, subscription });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to subscribe user' },
      { status: 500 }
    );
  }
}
