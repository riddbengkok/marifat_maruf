// Subject detection using saliency mapping and edge detection
export interface SubjectRegion {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  type: 'salient' | 'edge' | 'contrast';
}

export interface ImageContext {
  isBlackAndWhite: boolean;
  isLowKey: boolean;
  isHighKey: boolean;
  isPortrait: boolean;
  hasBackgroundBlur: boolean;
  subjectRegion: SubjectRegion | null;
}

// Detect if image is black and white
export function detectBlackAndWhite(data: Uint8ClampedArray): boolean {
  let colorVariance = 0;
  const sampleSize = Math.min(1000, data.length / 4);

  for (let i = 0; i < sampleSize; i++) {
    const idx = Math.floor(Math.random() * (data.length / 4)) * 4;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];

    // Calculate color variance
    const avg = (r + g + b) / 3;
    const variance = Math.abs(r - avg) + Math.abs(g - avg) + Math.abs(b - avg);
    colorVariance += variance;
  }

  const avgVariance = colorVariance / sampleSize;
  return avgVariance < 15; // Low color variance indicates B&W
}

// Detect if image is low-key (mostly dark)
export function detectLowKey(data: Uint8ClampedArray): boolean {
  let darkPixels = 0;
  const totalPixels = data.length / 4;

  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
    if (brightness < 50) darkPixels++;
  }

  return darkPixels / totalPixels > 0.6; // More than 60% dark pixels
}

// Detect if image is high-key (mostly bright)
export function detectHighKey(data: Uint8ClampedArray): boolean {
  let brightPixels = 0;
  const totalPixels = data.length / 4;

  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
    if (brightness > 200) brightPixels++;
  }

  return brightPixels / totalPixels > 0.6; // More than 60% bright pixels
}

// Detect if image is portrait (taller than wide)
export function detectPortrait(width: number, height: number): boolean {
  return height > width * 1.2;
}

// Simple saliency detection using center-surround contrast
export function detectSalientRegion(
  data: Uint8ClampedArray,
  width: number,
  height: number
): SubjectRegion | null {
  const centerX = Math.floor(width / 2);
  const centerY = Math.floor(height / 2);
  const regionSize = Math.min(width, height) / 3;

  // Calculate center region average brightness
  let centerBrightness = 0;
  let centerPixels = 0;

  const startX = Math.max(0, centerX - regionSize / 2);
  const endX = Math.min(width, centerX + regionSize / 2);
  const startY = Math.max(0, centerY - regionSize / 2);
  const endY = Math.min(height, centerY + regionSize / 2);

  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      const idx = (y * width + x) * 4;
      const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
      centerBrightness += brightness;
      centerPixels++;
    }
  }

  if (centerPixels === 0) return null;

  centerBrightness /= centerPixels;

  // Calculate surrounding region average brightness
  let surroundBrightness = 0;
  let surroundPixels = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Skip center region
      if (x >= startX && x < endX && y >= startY && y < endY) continue;

      const idx = (y * width + x) * 4;
      const brightness = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
      surroundBrightness += brightness;
      surroundPixels++;
    }
  }

  if (surroundPixels === 0) return null;

  surroundBrightness /= surroundPixels;

  // Calculate contrast between center and surround
  const contrast = Math.abs(centerBrightness - surroundBrightness);
  const confidence = Math.min(100, contrast / 2);

  if (confidence > 20) {
    return {
      x: startX,
      y: startY,
      width: endX - startX,
      height: endY - startY,
      confidence,
      type: 'salient',
    };
  }

  return null;
}

// Detect background blur using edge density
export function detectBackgroundBlur(
  data: Uint8ClampedArray,
  width: number,
  height: number
): boolean {
  let edgePixels = 0;
  const totalPixels = width * height;

  // Simple edge detection using gradient
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      const current = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;

      // Check horizontal gradient
      const left = (data[idx - 4] + data[idx - 3] + data[idx - 2]) / 3;
      const right = (data[idx + 4] + data[idx + 5] + data[idx + 6]) / 3;
      const horizontalGradient =
        Math.abs(current - left) + Math.abs(current - right);

      // Check vertical gradient
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

      const totalGradient = horizontalGradient + verticalGradient;
      if (totalGradient > 50) edgePixels++;
    }
  }

  const edgeDensity = edgePixels / totalPixels;
  return edgeDensity < 0.1; // Low edge density indicates blur
}

// Main function to analyze image context
export function analyzeImageContext(
  data: Uint8ClampedArray,
  width: number,
  height: number
): ImageContext {
  const isBlackAndWhite = detectBlackAndWhite(data);
  const isLowKey = detectLowKey(data);
  const isHighKey = detectHighKey(data);
  const isPortrait = detectPortrait(width, height);
  const hasBackgroundBlur = detectBackgroundBlur(data, width, height);
  const subjectRegion = detectSalientRegion(data, width, height);

  return {
    isBlackAndWhite,
    isLowKey,
    isHighKey,
    isPortrait,
    hasBackgroundBlur,
    subjectRegion,
  };
}

// Get pixel data for a specific region
export function getRegionData(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  region: SubjectRegion
): Uint8ClampedArray {
  const { x, y, width: regionWidth, height: regionHeight } = region;
  const regionData = new Uint8ClampedArray(regionWidth * regionHeight * 4);

  for (let row = 0; row < regionHeight; row++) {
    for (let col = 0; col < regionWidth; col++) {
      const srcX = Math.max(0, Math.min(width - 1, x + col));
      const srcY = Math.max(0, Math.min(height - 1, y + row));
      const srcIdx = (srcY * width + srcX) * 4;
      const dstIdx = (row * regionWidth + col) * 4;

      regionData[dstIdx] = data[srcIdx];
      regionData[dstIdx + 1] = data[srcIdx + 1];
      regionData[dstIdx + 2] = data[srcIdx + 2];
      regionData[dstIdx + 3] = data[srcIdx + 3];
    }
  }

  return regionData;
}
