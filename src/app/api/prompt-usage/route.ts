import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET: Get current user's promptGenCount
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }
    // Only select promptGenCount for type safety
    const user = await prisma.user.findUnique({
      where: { email },
      select: { promptGenCount: true },
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({ count: user.promptGenCount });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST: Decrement current user's promptGenCount
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;
    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }
    // Only select promptGenCount for type safety
    const user = await prisma.user.findUnique({
      where: { email },
      select: { promptGenCount: true },
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    // Only decrement if count is above 0
    if (user.promptGenCount > 0) {
      const updated = await prisma.user.update({
        where: { email },
        data: { promptGenCount: { decrement: 1 } },
        select: { promptGenCount: true },
      });
      return NextResponse.json({ count: updated.promptGenCount });
    } else {
      return NextResponse.json({ count: 0 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
