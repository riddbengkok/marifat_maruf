import { ImageContext, getRegionData } from './subject-detection';

export interface ContextAwareMetrics {
  brightness: number;
  contrast: number;
  sharpness: number;
  colorBalance: number;
  noiseLevel: number;
  context: ImageContext;
}

// Calculate brightness with context awareness
export function calculateContextAwareBrightness(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  context: ImageContext
): number {
  if (context.subjectRegion) {
    // Calculate brightness only in subject region
    const subjectData = getRegionData(
      data,
      width,
      height,
      context.subjectRegion
    );
    const subjectBrightness = calculateBrightness(subjectData);

    // For low-key images, check if subject is visible
    if (context.isLowKey) {
      return subjectBrightness >= 30 ? 70 : 40; // Reward visible subject in low-key
    }

    // For high-key images, check if subject isn't overexposed
    if (context.isHighKey) {
      return subjectBrightness <= 200 ? 80 : 60; // Penalize overexposed subject
    }

    return subjectBrightness;
  }

  // Fallback to global brightness with context adjustments
  const globalBrightness = calculateBrightness(data);

  if (context.isLowKey) {
    // Low-key images can have low global brightness if subject is visible
    return globalBrightness >= 20 ? 60 : 30;
  }

  if (context.isHighKey) {
    // High-key images should have high brightness but not overexposed
    return globalBrightness <= 220 ? 80 : 60;
  }

  return globalBrightness;
}

// Calculate sharpness with context awareness
export function calculateContextAwareSharpness(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  context: ImageContext
): number {
  if (context.subjectRegion) {
    // Calculate sharpness only in subject region
    const subjectData = getRegionData(
      data,
      width,
      height,
      context.subjectRegion
    );
    const subjectSharpness = calculateSharpness(
      subjectData,
      context.subjectRegion.width,
      context.subjectRegion.height
    );

    // If background is blurred and subject is sharp, reward this
    if (context.hasBackgroundBlur && subjectSharpness > 60) {
      return Math.min(100, subjectSharpness + 20); // Bonus for good bokeh
    }

    return subjectSharpness;
  }

  // Fallback to global sharpness
  const globalSharpness = calculateSharpness(data, width, height);

  // For portraits with background blur, don't penalize low global sharpness
  if (context.isPortrait && context.hasBackgroundBlur) {
    return Math.max(globalSharpness, 50); // Minimum score for intentional blur
  }

  return globalSharpness;
}

// Calculate color balance with context awareness
export function calculateContextAwareColorBalance(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  context: ImageContext
): number {
  // Skip color balance for black and white images
  if (context.isBlackAndWhite) {
    return 100; // Perfect score for intentional B&W
  }

  if (context.subjectRegion) {
    // Calculate color balance only in subject region
    const subjectData = getRegionData(
      data,
      width,
      height,
      context.subjectRegion
    );
    return calculateColorBalance(subjectData);
  }

  // Fallback to global color balance
  return calculateColorBalance(data);
}

// Calculate contrast with context awareness
export function calculateContextAwareContrast(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  context: ImageContext
): number {
  if (context.subjectRegion) {
    // Calculate contrast only in subject region
    const subjectData = getRegionData(
      data,
      width,
      height,
      context.subjectRegion
    );
    return calculateContrast(subjectData);
  }

  // Fallback to global contrast
  return calculateContrast(data);
}

// Calculate noise level with context awareness
export function calculateContextAwareNoiseLevel(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  context: ImageContext
): number {
  if (context.subjectRegion) {
    // Calculate noise only in subject region
    const subjectData = getRegionData(
      data,
      width,
      height,
      context.subjectRegion
    );
    return calculateNoiseLevel(
      subjectData,
      context.subjectRegion.width,
      context.subjectRegion.height
    );
  }

  // Fallback to global noise level
  return calculateNoiseLevel(data, width, height);
}

// Main function to calculate all context-aware metrics
export function calculateContextAwareMetrics(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  context: ImageContext
): ContextAwareMetrics {
  return {
    brightness: calculateContextAwareBrightness(data, width, height, context),
    contrast: calculateContextAwareContrast(data, width, height, context),
    sharpness: calculateContextAwareSharpness(data, width, height, context),
    colorBalance: calculateContextAwareColorBalance(
      data,
      width,
      height,
      context
    ),
    noiseLevel: calculateContextAwareNoiseLevel(data, width, height, context),
    context,
  };
}

// Helper functions (copied from original analysis)
function calculateBrightness(data: Uint8ClampedArray): number {
  let total = 0;
  for (let i = 0; i < data.length; i += 4) {
    total += (data[i] + data[i + 1] + data[i + 2]) / 3;
  }
  return total / (data.length / 4);
}

function calculateContrast(data: Uint8ClampedArray): number {
  const brightness = calculateBrightness(data);
  let variance = 0;
  for (let i = 0; i < data.length; i += 4) {
    const pixelBrightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
    variance += Math.pow(pixelBrightness - brightness, 2);
  }
  return Math.sqrt(variance / (data.length / 4));
}

function calculateSharpness(
  data: Uint8ClampedArray,
  width: number,
  height: number
): number {
  let sharpness = 0;
  let count = 0;

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      const current = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;

      // Horizontal gradient
      const left = (data[idx - 4] + data[idx - 3] + data[idx - 2]) / 3;
      const right = (data[idx + 4] + data[idx + 5] + data[idx + 6]) / 3;
      const horizontalGradient =
        Math.abs(current - left) + Math.abs(current - right);

      // Vertical gradient
      const up =
        (data[(y - 1) * width * 4 + x * 4] +
          data[(y - 1) * width * 4 + x * 4 + 1] +
          data[(y - 1) * width * 4 + x * 4 + 2]) /
        3;
      const down =
        (data[(y + 1) * width * 4 + x * 4] +
          data[(y + 1) * width * 4 + x * 4 + 1] +
          data[(y + 1) * width * 4 + x * 4 + 2]) /
        3;
      const verticalGradient =
        Math.abs(current - up) + Math.abs(current - down);

      sharpness += horizontalGradient + verticalGradient;
      count++;
    }
  }

  return count > 0 ? sharpness / count : 0;
}

function calculateColorBalance(data: Uint8ClampedArray): number {
  let rTotal = 0,
    gTotal = 0,
    bTotal = 0;
  const pixelCount = data.length / 4;

  for (let i = 0; i < data.length; i += 4) {
    rTotal += data[i];
    gTotal += data[i + 1];
    bTotal += data[i + 2];
  }

  const rAvg = rTotal / pixelCount;
  const gAvg = gTotal / pixelCount;
  const bAvg = bTotal / pixelCount;

  const total = rAvg + gAvg + bAvg;
  const rRatio = rAvg / total;
  const gRatio = gAvg / total;
  const bRatio = bAvg / total;

  // Ideal ratios (approximately)
  const idealR = 0.299;
  const idealG = 0.587;
  const idealB = 0.114;

  const deviation =
    Math.abs(rRatio - idealR) +
    Math.abs(gRatio - idealG) +
    Math.abs(bRatio - idealB);
  return Math.max(0, 100 - deviation * 200);
}

function calculateNoiseLevel(
  data: Uint8ClampedArray,
  width: number,
  height: number
): number {
  let noise = 0;
  let count = 0;

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      const current = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;

      // Compare with neighbors
      const neighbors = [
        (data[idx - 4] + data[idx - 3] + data[idx - 2]) / 3, // left
        (data[idx + 4] + data[idx + 5] + data[idx + 6]) / 3, // right
        (data[(y - 1) * width * 4 + x * 4] +
          data[(y - 1) * width * 4 + x * 4 + 1] +
          data[(y - 1) * width * 4 + x * 4 + 2]) /
          3, // up
        (data[(y + 1) * width * 4 + x * 4] +
          data[(y + 1) * width * 4 + x * 4 + 1] +
          data[(y + 1) * width * 4 + x * 4 + 2]) /
          3, // down
      ];

      const avgNeighbor =
        neighbors.reduce((a, b) => a + b, 0) / neighbors.length;
      noise += Math.abs(current - avgNeighbor);
      count++;
    }
  }

  const avgNoise = count > 0 ? noise / count : 0;
  return Math.max(0, 100 - avgNoise);
}
