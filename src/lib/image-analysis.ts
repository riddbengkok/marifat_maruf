import { ImageAnnotatorClient } from '@google-cloud/vision';
import { createCanvas, loadImage } from 'canvas';

// Local image analysis using canvas and basic metrics
export interface LocalImageAnalysis {
  isGood: boolean;
  score: number;
  metrics: {
    brightness: number;
    contrast: number;
    sharpness: number;
    colorBalance: number;
    composition: number;
  };
  reasons: string[];
}

// Google Vision API analysis
export interface VisionImageAnalysis {
  isGood: boolean;
  score: number;
  features: {
    safeSearch: any;
    labelDetection: any[];
    faceDetection: any[];
    textDetection: any[];
    imageProperties: any;
  };
  reasons: string[];
}

// Local analysis using canvas
export async function analyzeImageLocal(
  imageBuffer: Buffer
): Promise<LocalImageAnalysis> {
  try {
    const image = await loadImage(imageBuffer);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, image.width, image.height);
    const data = imageData.data;

    // Calculate metrics
    const brightness = calculateBrightness(data);
    const contrast = calculateContrast(data);
    const sharpness = calculateSharpness(data, image.width, image.height);
    const colorBalance = calculateColorBalance(data);
    const composition = calculateComposition(image.width, image.height);

    // Calculate overall score (0-100)
    const score = Math.round(
      brightness * 0.2 +
        contrast * 0.2 +
        sharpness * 0.3 +
        colorBalance * 0.2 +
        composition * 0.1
    );

    // Determine if image is good (score > 60)
    const isGood = score > 60;

    // Generate reasons
    const reasons = generateReasons({
      brightness,
      contrast,
      sharpness,
      colorBalance,
      composition,
      score,
    });

    return {
      isGood,
      score,
      metrics: {
        brightness,
        contrast,
        sharpness,
        colorBalance,
        composition,
      },
      reasons,
    };
  } catch (error) {
    throw new Error(`Local image analysis failed: ${error}`);
  }
}

// Google Vision API analysis
export async function analyzeImageVision(
  imageBuffer: Buffer
): Promise<VisionImageAnalysis> {
  try {
    const client = new ImageAnnotatorClient({
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    });

    const request = {
      image: {
        content: imageBuffer.toString('base64'),
      },
      features: [
        { type: 'SAFE_SEARCH_DETECTION' },
        { type: 'LABEL_DETECTION', maxResults: 10 },
        { type: 'FACE_DETECTION', maxResults: 10 },
        { type: 'TEXT_DETECTION' },
        { type: 'IMAGE_PROPERTIES' },
      ],
    };

    const [result] = await client.annotateImage(request);
    const safeSearch = result.safeSearchAnnotation;
    const labels = result.labelAnnotations || [];
    const faces = result.faceAnnotations || [];
    const texts = result.textAnnotations || [];
    const properties = result.imagePropertiesAnnotation;

    // Calculate score based on various factors
    const score = calculateVisionScore({
      safeSearch,
      labels,
      faces,
      texts,
      properties,
    });

    // Determine if image is good
    const isGood =
      score > 70 &&
      safeSearch?.adult === 'VERY_UNLIKELY' &&
      safeSearch?.violence === 'VERY_UNLIKELY';

    // Generate reasons
    const reasons = generateVisionReasons({
      safeSearch,
      labels,
      faces,
      texts,
      properties,
      score,
    });

    return {
      isGood,
      score,
      features: {
        safeSearch,
        labelDetection: labels,
        faceDetection: faces,
        textDetection: texts,
        imageProperties: properties,
      },
      reasons,
    };
  } catch (error) {
    throw new Error(`Vision API analysis failed: ${error}`);
  }
}

// Helper functions for local analysis
function calculateBrightness(data: Uint8ClampedArray): number {
  let total = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    total += (r + g + b) / 3;
  }
  return Math.min(100, (total / (data.length / 4) / 255) * 100);
}

function calculateContrast(data: Uint8ClampedArray): number {
  const values = [];
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    values.push((r + g + b) / 3);
  }

  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance =
    values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
  return Math.min(100, (Math.sqrt(variance) / 255) * 100);
}

function calculateSharpness(
  data: Uint8ClampedArray,
  width: number,
  height: number
): number {
  let totalGradient = 0;
  let count = 0;

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      const current = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
      const right = (data[idx + 4] + data[idx + 5] + data[idx + 6]) / 3;
      const down =
        (data[(y + 1) * width * 4 + x * 4] +
          data[(y + 1) * width * 4 + x * 4 + 1] +
          data[(y + 1) * width * 4 + x * 4 + 2]) /
        3;

      const gradientX = Math.abs(current - right);
      const gradientY = Math.abs(current - down);
      totalGradient += Math.sqrt(gradientX * gradientX + gradientY * gradientY);
      count++;
    }
  }

  return Math.min(100, (totalGradient / count / 255) * 100);
}

function calculateColorBalance(data: Uint8ClampedArray): number {
  let totalR = 0,
    totalG = 0,
    totalB = 0;
  let count = 0;

  for (let i = 0; i < data.length; i += 4) {
    totalR += data[i];
    totalG += data[i + 1];
    totalB += data[i + 2];
    count++;
  }

  const avgR = totalR / count;
  const avgG = totalG / count;
  const avgB = totalB / count;

  const maxAvg = Math.max(avgR, avgG, avgB);
  const balance = (avgR + avgG + avgB) / 3 / maxAvg;

  return balance * 100;
}

function calculateComposition(width: number, height: number): number {
  const aspectRatio = width / height;
  const goldenRatio = 1.618;

  // Score based on aspect ratio (closer to golden ratio is better)
  const ratioScore =
    100 - (Math.abs(aspectRatio - goldenRatio) / goldenRatio) * 100;

  // Score based on resolution (higher resolution is better)
  const resolutionScore = Math.min(
    100,
    ((width * height) / (1920 * 1080)) * 100
  );

  return (ratioScore + resolutionScore) / 2;
}

function calculateVisionScore(features: any): number {
  let score = 50; // Base score

  // Safe search scoring
  if (features.safeSearch) {
    const safe = features.safeSearch;
    if (safe.adult === 'VERY_UNLIKELY') score += 20;
    if (safe.violence === 'VERY_UNLIKELY') score += 20;
    if (safe.racy === 'VERY_UNLIKELY') score += 10;
  }

  // Label detection scoring
  if (features.labels && features.labels.length > 0) {
    score += Math.min(20, features.labels.length * 2);
  }

  // Face detection scoring
  if (features.faces && features.faces.length > 0) {
    score += Math.min(10, features.faces.length * 2);
  }

  // Text detection scoring
  if (features.texts && features.texts.length > 1) {
    score += 10;
  }

  return Math.min(100, score);
}

function generateReasons(metrics: any): string[] {
  const reasons = [];

  if (metrics.score > 80) {
    reasons.push('Excellent overall image quality');
  } else if (metrics.score > 60) {
    reasons.push('Good image quality');
  } else {
    reasons.push('Image quality needs improvement');
  }

  if (metrics.brightness < 30) {
    reasons.push('Image is too dark');
  } else if (metrics.brightness > 80) {
    reasons.push('Image is too bright');
  }

  if (metrics.contrast < 20) {
    reasons.push('Low contrast - image appears flat');
  }

  if (metrics.sharpness < 30) {
    reasons.push('Image appears blurry');
  }

  if (metrics.colorBalance < 50) {
    reasons.push('Poor color balance');
  }

  return reasons;
}

function generateVisionReasons(features: any): string[] {
  const reasons = [];

  if (features.score > 80) {
    reasons.push('High-quality image with good content');
  } else if (features.score > 60) {
    reasons.push('Acceptable image quality');
  } else {
    reasons.push('Image quality needs improvement');
  }

  if (features.safeSearch) {
    const safe = features.safeSearch;
    if (safe.adult !== 'VERY_UNLIKELY') {
      reasons.push('Contains potentially inappropriate content');
    }
    if (safe.violence !== 'VERY_UNLIKELY') {
      reasons.push('Contains potentially violent content');
    }
  }

  if (features.labels && features.labels.length > 0) {
    reasons.push(`Detected ${features.labels.length} objects/scenes`);
  }

  if (features.faces && features.faces.length > 0) {
    reasons.push(`Contains ${features.faces.length} face(s)`);
  }

  if (features.texts && features.texts.length > 1) {
    reasons.push('Contains readable text');
  }

  return reasons;
}
