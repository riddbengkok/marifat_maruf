import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { ApiErrorResponse } from './api-types';

// Standardized error response
export function createErrorResponse(
  message: string,
  status: number = 500
): NextResponse<ApiErrorResponse> {
  return NextResponse.json({ error: message }, { status });
}

// Standardized success response
export function createSuccessResponse<T>(
  data: T,
  status: number = 200
): NextResponse<T> {
  return NextResponse.json(data, { status });
}

// Midtrans signature verification
export function verifyMidtransSignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  signatureKey: string
): boolean {
  const serverKey = process.env.SERVER_KEY_MIDTRANS || '';
  const input = orderId + statusCode + grossAmount + serverKey;
  const expectedSignature = crypto
    .createHash('sha512')
    .update(input)
    .digest('hex');

  return signatureKey === expectedSignature;
}

// Extract order ID from Midtrans order_id format
export function extractOrderId(orderId: string): number {
  return parseInt(orderId.replace('order-', ''));
}

// Validate required fields
export function validateRequiredFields(
  body: unknown,
  requiredFields: string[]
): string | null {
  const obj = body as Record<string, unknown>;
  for (const field of requiredFields) {
    const v = obj[field];
    if (
      v === undefined ||
      v === null ||
      (typeof v === 'string' && v.trim() === '')
    ) {
      return `${field} is required`;
    }
  }
  return null;
}

// Get subscription price from environment
export function getSubscriptionPrice(): number {
  return typeof process !== 'undefined' &&
    process.env.NEXT_PUBLIC_SUBSCRIBE_PRICE
    ? parseInt(process.env.NEXT_PUBLIC_SUBSCRIBE_PRICE, 10)
    : 10000;
}

// Check if transaction status indicates success
export function isSuccessfulTransaction(status: string): boolean {
  return ['settlement', 'capture', 'success', 'paid'].includes(status);
}

// Rate limiting helper (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}
