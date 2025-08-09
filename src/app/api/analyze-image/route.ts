import { ImageAnalysisRequest, ImageAnalysisResponse } from '@/lib/api-types';
import {
  checkRateLimit,
  createErrorResponse,
  createSuccessResponse,
  validateRequiredFields,
} from '@/lib/api-utils';
import { analyzeImageVision } from '@/lib/image-analysis-server';
import { NextRequest } from 'next/server';

// Helper function to generate stock photo recommendations
function generateStockRecommendations(score: number): string[] {
  const recommendations: string[] = [];

  if (score >= 80) {
    recommendations.push('Excellent quality - Ready for premium stock sites');
    recommendations.push('High commercial value potential');
    recommendations.push('Suitable for Shutterstock, iStock, Adobe Stock');
  } else if (score >= 70) {
    recommendations.push('Good quality - Acceptable for standard stock sites');
    recommendations.push('Consider minor adjustments for better acceptance');
    recommendations.push('Suitable for Shutterstock, Dreamstime');
  } else if (score >= 60) {
    recommendations.push('Acceptable quality - May need minor improvements');
    recommendations.push('Improve quality before submitting to premium sites');
    recommendations.push(
      'Suitable for microstock sites like Pixabay, Unsplash'
    );
  } else {
    recommendations.push(
      'Below stock standards - Significant improvements needed'
    );
    recommendations.push('Not suitable for commercial stock sites');
    recommendations.push('Focus on basic quality improvements first');
  }

  return recommendations;
}

export async function POST(req: NextRequest) {
  try {
    const body: ImageAnalysisRequest = await req.json();

    const validationError = validateRequiredFields(body, ['image']);
    if (validationError) {
      return createErrorResponse(validationError, 400);
    }

    const { image, method = 'local' } = body;

    // Rate limiting (5 requests per minute per IP)
    const clientIP =
      req.headers.get('x-forwarded-for') ||
      req.headers.get('x-real-ip') ||
      'unknown';
    if (!checkRateLimit(clientIP, 100, 60000)) {
      return createErrorResponse('Rate limit exceeded', 429);
    }

    // Validate base64 image
    if (
      !image.startsWith('data:image/') &&
      !image.match(/^[A-Za-z0-9+/]*={0,2}$/)
    ) {
      return createErrorResponse(
        'Invalid image format. Please provide a valid base64 encoded image',
        400
      );
    }

    // Convert base64 to buffer
    let imageBuffer: Buffer;
    try {
      if (image.startsWith('data:image/')) {
        // Handle data URL format
        const base64Data = image.split(',')[1];
        imageBuffer = Buffer.from(base64Data, 'base64');
      } else {
        // Handle raw base64
        imageBuffer = Buffer.from(image, 'base64');
      }
    } catch (error) {
      return createErrorResponse('Invalid base64 image data', 400);
    }

    // Validate image size (max 10MB)
    if (imageBuffer.length > 10 * 1024 * 1024) {
      return createErrorResponse('Image too large. Maximum size is 10MB', 400);
    }

    let analysis;
    let analysisMethod: 'local' | 'vision';

    try {
      if (method === 'vision') {
        // Check if Google Vision API is configured
        if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
          return createErrorResponse(
            'Google Vision API not configured. Please use local analysis or configure Google Vision API.',
            400
          );
        }

        analysis = await analyzeImageVision(imageBuffer);
        analysisMethod = 'vision';
      } else {
        // For local analysis, we'll return the image data for client-side processing
        // This avoids the canvas dependency issue on the server
        return createSuccessResponse({
          isGood: false,
          score: 0,
          method: 'local',
          analysis: {
            isGood: false,
            score: 0,
            metrics: {
              brightness: 0,
              contrast: 0,
              sharpness: 0,
              colorBalance: 0,
              composition: {
                overall: 0,
                ruleOfThirds: 0,
                goldenRatio: 0,
                symmetry: 0,
                leadingLines: 0,
                horizonPlacement: 0,
              },
            },
            reasons: [
              'Local analysis requires client-side processing',
              'Analysis will be performed in browser using Canvas API',
              'Results will include stock photo assessment criteria',
            ],
          },
          reasons: [
            'Local analysis requires client-side processing',
            'Analysis will be performed in browser using Canvas API',
            'Results will include stock photo assessment criteria',
          ],
          imageData: image, // Send the original base64 image data for client processing
        });
      }
    } catch (error) {
      console.error('Image analysis error:', error);
      return createErrorResponse('Image analysis failed', 500);
    }

    const response: ImageAnalysisResponse = {
      isGood: analysis.isGood,
      score: analysis.score,
      method: analysisMethod,
      analysis: {
        ...analysis,
        reasons: [
          ...analysis.reasons,
          ...generateStockRecommendations(analysis.score),
        ],
      },
      reasons: [
        ...analysis.reasons,
        ...generateStockRecommendations(analysis.score),
      ],
    };

    return createSuccessResponse(response);
  } catch (error) {
    console.error('Image analysis API error:', error);
    return createErrorResponse('Failed to analyze image');
  }
}

// GET method for API information
export async function GET() {
  return createSuccessResponse({
    message: 'Image Analysis API',
    methods: {
      local: {
        description: 'Local analysis using canvas and basic image metrics',
        features: [
          'Brightness',
          'Contrast',
          'Sharpness',
          'Color Balance',
          'Composition (Rule of Thirds, Golden Ratio, Symmetry, Leading Lines, Horizon Placement)',
        ],
        maxSize: '10MB',
        rateLimit: '100 requests per minute',
      },
      vision: {
        description: 'Google Vision API analysis with advanced features',
        features: [
          'Safe Search',
          'Label Detection',
          'Face Detection',
          'Text Detection',
          'Image Properties',
        ],
        maxSize: '10MB',
        rateLimit: '5 requests per minute',
        requires: 'GOOGLE_APPLICATION_CREDENTIALS environment variable',
      },
    },
  });
}
