# API Documentation

## Overview

This document describes the optimized API endpoints for the application. All endpoints use standardized error handling and response formats.

## Base URL

```
https://your-domain.com/api
```

## Response Format

### Success Response

```json
{
  "data": "response data"
}
```

### Error Response

```json
{
  "error": "error message"
}
```

## Authentication Endpoints

### POST /api/auth/register

Register a new user or update existing user.

**Request Body:**

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "firebaseUid": "firebase_uid_optional"
}
```

**Response:**

```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "status": "active",
    "firebaseUid": "firebase_uid"
  }
}
```

### GET /api/auth/register

Get subscription status for a user.

**Query Parameters:**

- `email` (optional): User email
- `firebaseUid` (optional): Firebase UID

**Response:**

```json
{
  "status": "active" | "inactive" | "none"
}
```

### PUT /api/auth/register

Subscribe a user (admin utility).

**Request Body:**

```json
{
  "email": "user@example.com",
  "firebaseUid": "firebase_uid",
  "plan": "pro"
}
```

## Payment Endpoints

### POST /api/subscription

Generate payment token for subscription.

**Request Body:**

```json
{
  "email": "user@example.com",
  "customer_details": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "user@example.com",
    "phone": "+1234567890"
  },
  "item_details": [
    {
      "id": "sub001",
      "price": 10000,
      "quantity": 1,
      "name": "Subscription"
    }
  ]
}
```

**Response:**

```json
{
  "token": "midtrans_token",
  "order_id": "order-123"
}
```

### PATCH /api/subscription

Handle Midtrans webhook notifications.

**Request Body:**

```json
{
  "order_id": "order-123",
  "transaction_status": "settlement",
  "signature_key": "signature_hash",
  "status_code": "200",
  "gross_amount": "10000"
}
```

### DELETE /api/subscription

Delete an order (admin utility).

**Query Parameters:**

- `id`: Order ID

## Order Management

### GET /api/order-status

Get order status by ID or email.

**Query Parameters:**

- `id` (optional): Order ID
- `email` (optional): User email

**Response:**

```json
{
  "status": "pending",
  "id": 123,
  "statusPayment": "pending",
  "price": "10000",
  "published": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "userId": 1
}
```

## Prompt Usage

### GET /api/prompt-usage

Get current user's prompt generation count.

**Query Parameters:**

- `email`: User email

**Response:**

```json
{
  "count": 5
}
```

### POST /api/prompt-usage

Decrement user's prompt generation count.

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "count": 4
}
```

## AI Generation

### POST /api/generate-story

Generate a story using OpenAI.

**Request Body:**

```json
{
  "prompt": "Write a story about a magical forest"
}
```

**Response:**

```json
{
  "story": "Once upon a time in a magical forest..."
}
```

## Image Analysis

### POST /api/analyze-image

Analyze an image to determine if it's good or bad quality.

**Request Body:**

```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
  "method": "local"
}
```

**Parameters:**

- `image` (required): Base64 encoded image data
- `method` (optional): Analysis method - "local" or "vision" (default: "local")

**Response:**

```json
{
  "isGood": true,
  "score": 85,
  "method": "local",
  "analysis": {
    "isGood": true,
    "score": 85,
    "metrics": {
      "brightness": 65,
      "contrast": 75,
      "sharpness": 90,
      "colorBalance": 80,
      "composition": 85
    },
    "reasons": ["Excellent overall image quality", "Good image quality"]
  },
  "reasons": ["Excellent overall image quality", "Good image quality"]
}
```

### GET /api/analyze-image

Get information about the image analysis API.

**Response:**

```json
{
  "message": "Image Analysis API",
  "methods": {
    "local": {
      "description": "Local analysis using canvas and basic image metrics",
      "features": [
        "Brightness",
        "Contrast",
        "Sharpness",
        "Color Balance",
        "Composition"
      ],
      "maxSize": "10MB",
      "rateLimit": "5 requests per minute"
    },
    "vision": {
      "description": "Google Vision API analysis with advanced features",
      "features": [
        "Safe Search",
        "Label Detection",
        "Face Detection",
        "Text Detection",
        "Image Properties"
      ],
      "maxSize": "10MB",
      "rateLimit": "5 requests per minute",
      "requires": "GOOGLE_APPLICATION_CREDENTIALS environment variable"
    }
  }
}
```

## Error Codes

| Code | Description                             |
| ---- | --------------------------------------- |
| 400  | Bad Request - Missing required fields   |
| 403  | Forbidden - Invalid signature           |
| 404  | Not Found - Resource not found          |
| 405  | Method Not Allowed                      |
| 429  | Too Many Requests - Rate limit exceeded |
| 500  | Internal Server Error                   |

## Rate Limiting

- **Story Generation**: 5 requests per minute per IP
- **Other endpoints**: No rate limiting by default

## Security Features

1. **Signature Verification**: All Midtrans webhooks are verified using SHA512 signatures
2. **Input Validation**: All endpoints validate required fields
3. **Type Safety**: Full TypeScript support for request/response types
4. **Error Logging**: Comprehensive error logging for debugging

## Performance Optimizations

1. **Database Connection Pooling**: Singleton Prisma client for connection reuse
2. **Response Caching**: Standardized response formats
3. **Error Handling**: Consistent error responses across all endpoints
4. **Type Safety**: Compile-time validation of request/response types
