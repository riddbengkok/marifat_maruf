import {
  StoryGenerationRequest,
  StoryGenerationResponse,
} from '@/lib/api-types';
import {
  checkRateLimit,
  createErrorResponse,
  createSuccessResponse,
  validateRequiredFields,
} from '@/lib/api-utils';
import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body: StoryGenerationRequest = await req.json();

    const validationError = validateRequiredFields(body, ['prompt']);
    if (validationError) {
      return createErrorResponse(validationError, 400);
    }

    const { prompt } = body;

    // Rate limiting (optional - you can adjust the limits)
    const clientIP =
      req.headers.get('x-forwarded-for') ||
      req.headers.get('x-real-ip') ||
      'unknown';
    if (!checkRateLimit(clientIP, 5, 60000)) {
      // 5 requests per minute
      return createErrorResponse('Rate limit exceeded', 429);
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are a creative writing assistant that generates engaging stories based on prompts. Generate a well-structured story with a clear beginning, middle, and end.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const story =
      completion.choices[0]?.message?.content || 'Failed to generate story';

    const response: StoryGenerationResponse = { story };
    return createSuccessResponse(response);
  } catch (error) {
    console.error('OpenAI API error:', error);
    return createErrorResponse('Failed to generate story');
  }
}
