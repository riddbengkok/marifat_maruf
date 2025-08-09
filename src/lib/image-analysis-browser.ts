// Local image analysis using browser canvas (no server-side canvas dependency)
export interface LocalImageAnalysis {
  isGood: boolean;
  score: number;
  metrics: {
    brightness: number;
    contrast: number;
    sharpness: number;
    colorBalance: number;
    composition: {
      overall: number;
      ruleOfThirds: number;
      goldenRatio: number;
      symmetry: number;
      leadingLines: number;
      horizonPlacement: number;
    };
  };
  reasons: string[];
}

interface CompositionMetrics {
  brightness: number;
  contrast: number;
  sharpness: number;
  colorBalance: number;
  composition:
    | number
    | {
        overall: number;
        ruleOfThirds: number;
        goldenRatio: number;
        symmetry: number;
        leadingLines: number;
        horizonPlacement: number;
      };
  score: number;
}

// Browser-based local analysis
export async function analyzeImageLocalBrowser(
  base64Image: string
): Promise<LocalImageAnalysis> {
  try {
    console.log(
      'Starting browser analysis with image length:',
      base64Image.length
    );

    // Validate input
    if (!base64Image || base64Image.length < 100) {
      throw new Error('Invalid or empty image data');
    }

    // Create a temporary image element to get dimensions
    const img = new Image();

    // Set crossOrigin to handle potential CORS issues
    img.crossOrigin = 'anonymous';

    const imageData = await new Promise<{
      width: number;
      height: number;
      data: Uint8ClampedArray;
    }>((resolve, reject) => {
      img.onload = () => {
        console.log(
          'Image loaded successfully, dimensions:',
          img.width,
          'x',
          img.height
        );

        // Check if image is too large (browser canvas limits)
        if (img.width > 4096 || img.height > 4096) {
          console.warn('Image is very large, may cause performance issues');
        }

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        try {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          console.log('Canvas data extracted, size:', imageData.data.length);

          resolve({
            width: img.width,
            height: img.height,
            data: imageData.data,
          });
        } catch (canvasError: unknown) {
          console.error('Canvas error:', canvasError);
          const message =
            canvasError instanceof Error
              ? canvasError.message
              : 'Unknown canvas error';
          reject(new Error(`Canvas processing failed: ${message}`));
        }
      };

      img.onerror = () => {
        console.error('Image failed to load');
        reject(new Error('Failed to load image'));
      };

      img.src = base64Image.startsWith('data:')
        ? base64Image
        : `data:image/jpeg;base64,${base64Image}`;
    });

    console.log('Starting metric calculations...');

    // Calculate basic metrics
    const brightness = calculateBrightness(imageData.data);
    const contrast = calculateContrast(imageData.data);
    const sharpness = calculateSharpness(
      imageData.data,
      imageData.width,
      imageData.height
    );
    const colorBalance = calculateColorBalance(imageData.data);

    console.log('Basic metrics calculated:', {
      brightness,
      contrast,
      sharpness,
      colorBalance,
    });

    // Calculate advanced composition metrics
    const composition = calculateAdvancedComposition(
      imageData.data,
      imageData.width,
      imageData.height
    );

    console.log('Composition metrics calculated:', composition);

    // setelah komposisi dihitung
    const focalPoints = findFocalPoints(
      imageData.data,
      imageData.width,
      imageData.height
    );

    function localLaplacianVar(x: number, y: number, win = 7): number {
      const { width: W, height: H, data: D } = imageData;
      const half = Math.floor(win / 2);

      const clamp = (v: number, lo: number, hi: number) =>
        Math.max(lo, Math.min(hi, v));

      const gray = (px: number, py: number) => {
        const ix = clamp(px, 0, W - 1);
        const iy = clamp(py, 0, H - 1);
        const idx = (iy * W + ix) * 4;
        return (D[idx] + D[idx + 1] + D[idx + 2]) / 3;
      };

      const vals: number[] = [];
      for (let j = -half; j <= half; j++) {
        for (let i = -half; i <= half; i++) {
          const cx = x + i;
          const cy = y + j;
          const c = gray(cx, cy);
          const l = gray(cx - 1, cy);
          const r = gray(cx + 1, cy);
          const u = gray(cx, cy - 1);
          const d = gray(cx, cy + 1);
          const lap = 4 * c - (l + r + u + d);
          vals.push(lap);
        }
      }

      const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
      const variance =
        vals.reduce((a, b) => a + (b - mean) * (b - mean), 0) / vals.length;
      const rms = Math.sqrt(variance);
      const score = Math.min(100, Math.max(0, (rms / 255) * 100));
      return score;
    }

    const subjectSharpness = focalPoints.length
      ? focalPoints
          .slice(0, 5)
          .map(
            p =>
              localLaplacianVar(
                Math.round(p.x * imageData.width),
                Math.round(p.y * imageData.height),
                9
              ) * p.weight
          )
          .reduce((a, b) => a + b, 0) /
        focalPoints.reduce((a, b) => a + b.weight, 0)
      : sharpness;

    const finalSharpness = Math.round(0.7 * subjectSharpness + 0.3 * sharpness);

    // Advanced brightness (subject-weighted, clipping-aware)
    const { global: brightnessGlobalScore, subject: subjectBrightnessScore } =
      calculateBrightnessAdvanced(
        imageData.data,
        imageData.width,
        imageData.height,
        focalPoints
      );

    const finalBrightness = Math.round(
      0.6 * subjectBrightnessScore + 0.4 * brightnessGlobalScore
    );

    // Advanced contrast (subject-weighted, clipping-aware)
    const { global: contrastGlobalScore, subject: subjectContrastScore } =
      calculateContrastAdvanced(
        imageData.data,
        imageData.width,
        imageData.height,
        focalPoints
      );

    const finalContrast = Math.round(
      0.6 * subjectContrastScore + 0.4 * contrastGlobalScore
    );

    // Advanced color balance (subject-weighted, cast & saturation aware)
    const {
      global: colorBalanceGlobalScore,
      subject: subjectColorBalanceScore,
    } = calculateColorBalanceAdvanced(
      imageData.data,
      imageData.width,
      imageData.height,
      focalPoints
    );

    const finalColorBalance = Math.round(
      0.6 * subjectColorBalanceScore + 0.4 * colorBalanceGlobalScore
    );

    // gunakan finalSharpness untuk skor & gatekeeper
    const score = Math.round(
      finalBrightness * 0.1 +
        finalContrast * 0.1 +
        finalSharpness * 0.2 +
        finalColorBalance * 0.1 +
        composition.overall * 0.5
    );

    const meetsTechnical =
      (subjectSharpness >= 50 || finalSharpness >= 40) &&
      finalBrightness >= 30 &&
      finalBrightness <= 80 &&
      finalContrast >= 20 &&
      finalColorBalance >= 50;

    // Final judgment
    const isGood = score > 65 && meetsTechnical;

    // Generate reasons
    const reasons = generateReasons({
      brightness: finalBrightness,
      contrast: finalContrast,
      sharpness,
      colorBalance: finalColorBalance,
      composition,
      score,
    });

    const result = {
      isGood,
      score,
      metrics: {
        brightness: finalBrightness,
        contrast: finalContrast,
        sharpness,
        colorBalance: finalColorBalance,
        composition,
      },
      reasons,
    };

    console.log('Analysis completed successfully:', result);
    return result;
  } catch (error) {
    console.error('Browser analysis failed:', error);
    throw new Error(`Local image analysis failed: ${error}`);
  }
}

// Helper functions (unchanged)
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

// Enhanced composition analysis with professional photography rules
function calculateAdvancedComposition(
  data: Uint8ClampedArray,
  width: number,
  height: number
): {
  overall: number;
  ruleOfThirds: number;
  goldenRatio: number;
  symmetry: number;
  leadingLines: number;
  horizonPlacement: number;
} {
  // Find focal points (salient regions)
  const focalPoints = findFocalPoints(data, width, height);

  // Calculate composition scores
  const ruleOfThirds = calculateRuleOfThirds(focalPoints, width, height);
  const goldenRatio = calculateGoldenRatio(focalPoints, width, height);
  const symmetry = calculateSymmetry(data, width, height);
  const leadingLines = calculateLeadingLines(data, width, height);
  const horizonPlacement = calculateHorizonPlacement(data, width, height);

  // Overall composition score (weighted average)
  const overall = Math.round(
    ruleOfThirds * 0.3 +
      goldenRatio * 0.25 +
      symmetry * 0.2 +
      leadingLines * 0.15 +
      horizonPlacement * 0.1
  );

  return {
    overall,
    ruleOfThirds,
    goldenRatio,
    symmetry,
    leadingLines,
    horizonPlacement,
  };
}

// Find focal points using saliency detection
function findFocalPoints(
  data: Uint8ClampedArray,
  width: number,
  height: number
): Array<{ x: number; y: number; weight: number }> {
  const focalPoints: Array<{ x: number; y: number; weight: number }> = [];

  // Simple edge-based saliency detection
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      const current = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;

      // Calculate gradient magnitude
      const right = (data[idx + 4] + data[idx + 5] + data[idx + 6]) / 3;
      const down =
        (data[(y + 1) * width * 4 + x * 4] +
          data[(y + 1) * width * 4 + x * 4 + 1] +
          data[(y + 1) * width * 4 + x * 4 + 2]) /
        3;

      const gradientX = Math.abs(current - right);
      const gradientY = Math.abs(current - down);
      const gradientMagnitude = Math.sqrt(
        gradientX * gradientX + gradientY * gradientY
      );

      // If gradient is significant, consider it a focal point
      if (gradientMagnitude > 30) {
        focalPoints.push({
          x: x / width,
          y: y / height,
          weight: gradientMagnitude / 255,
        });
      }
    }
  }

  // Return top focal points
  return focalPoints.sort((a, b) => b.weight - a.weight).slice(0, 5);
}

// Calculate Rule of Thirds compliance
function calculateRuleOfThirds(
  focalPoints: Array<{ x: number; y: number; weight: number }>,
  width: number,
  height: number
): number {
  if (focalPoints.length === 0) return 50; // Neutral score if no focal points

  const thirdX = [1 / 3, 2 / 3];
  const thirdY = [1 / 3, 2 / 3];

  let totalScore = 0;
  let totalWeight = 0;

  for (const point of focalPoints) {
    // Find distance to nearest third intersection
    let minDistance = Infinity;

    for (const x of thirdX) {
      for (const y of thirdY) {
        const distance = Math.sqrt(
          Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2)
        );
        minDistance = Math.min(minDistance, distance);
      }
    }

    // Score based on proximity (closer = higher score)
    const score = Math.max(0, 100 - minDistance * 200);
    totalScore += score * point.weight;
    totalWeight += point.weight;
  }

  return totalWeight > 0 ? totalScore / totalWeight : 50;
}

// Calculate Golden Ratio compliance
function calculateGoldenRatio(
  focalPoints: Array<{ x: number; y: number; weight: number }>,
  width: number,
  height: number
): number {
  if (focalPoints.length === 0) return 50;

  const phi = 1.61803398875;
  const goldenX = [1 / phi, 1 - 1 / phi];
  const goldenY = [1 / phi, 1 - 1 / phi];

  let totalScore = 0;
  let totalWeight = 0;

  for (const point of focalPoints) {
    let minDistance = Infinity;

    for (const x of goldenX) {
      for (const y of goldenY) {
        const distance = Math.sqrt(
          Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2)
        );
        minDistance = Math.min(minDistance, distance);
      }
    }

    const score = Math.max(0, 100 - minDistance * 200);
    totalScore += score * point.weight;
    totalWeight += point.weight;
  }

  return totalWeight > 0 ? totalScore / totalWeight : 50;
}

// Calculate symmetry score
function calculateSymmetry(
  data: Uint8ClampedArray,
  width: number,
  height: number
): number {
  let symmetryScore = 0;
  let comparisons = 0;

  // Check horizontal symmetry
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width / 2; x++) {
      const leftIdx = (y * width + x) * 4;
      const rightIdx = (y * width + (width - 1 - x)) * 4;

      const leftBrightness =
        (data[leftIdx] + data[leftIdx + 1] + data[leftIdx + 2]) / 3;
      const rightBrightness =
        (data[rightIdx] + data[rightIdx + 1] + data[rightIdx + 2]) / 3;

      const difference = Math.abs(leftBrightness - rightBrightness) / 255;
      symmetryScore += 1 - difference;
      comparisons++;
    }
  }

  return comparisons > 0 ? (symmetryScore / comparisons) * 100 : 50;
}

// Calculate leading lines score
function calculateLeadingLines(
  data: Uint8ClampedArray,
  width: number,
  height: number
): number {
  let lineScore = 0;
  let lineCount = 0;

  // Detect strong horizontal and vertical lines
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      const current = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;

      // Check horizontal continuity
      const left = (data[idx - 4] + data[idx - 3] + data[idx - 2]) / 3;
      const right = (data[idx + 4] + data[idx + 5] + data[idx + 6]) / 3;

      const horizontalContinuity =
        1 - Math.abs(current - left) / 255 - Math.abs(current - right) / 255;

      // Check vertical continuity
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

      const verticalContinuity =
        1 - Math.abs(current - up) / 255 - Math.abs(current - down) / 255;

      const maxContinuity = Math.max(horizontalContinuity, verticalContinuity);
      if (maxContinuity > 0.7) {
        lineScore += maxContinuity;
        lineCount++;
      }
    }
  }

  return lineCount > 0 ? (lineScore / lineCount) * 100 : 50;
}

// Calculate horizon placement score
function calculateHorizonPlacement(
  data: Uint8ClampedArray,
  width: number,
  height: number
): number {
  const horizonCandidates: Array<{ y: number; strength: number }> = [];

  // Look for strong horizontal edges (potential horizon lines)
  for (let y = 1; y < height - 1; y++) {
    let edgeStrength = 0;

    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const current = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
      const above =
        (data[(y - 1) * width * 4 + x * 4] +
          data[(y - 1) * width * 4 + x * 4 + 1] +
          data[(y - 1) * width * 4 + x * 4 + 2]) /
        3;
      const below =
        (data[(y + 1) * width * 4 + x * 4] +
          data[(y + 1) * width * 4 + x * 4 + 1] +
          data[(y + 1) * width * 4 + x * 4 + 2]) /
        3;

      const verticalGradient =
        Math.abs(current - above) + Math.abs(current - below);
      edgeStrength += verticalGradient;
    }

    if (edgeStrength > width * 50) {
      // Threshold for strong horizontal edge
      horizonCandidates.push({
        y: y / height,
        strength: edgeStrength,
      });
    }
  }

  if (horizonCandidates.length === 0) return 50;

  // Score based on placement near thirds or golden ratio
  const bestHorizon = horizonCandidates.reduce((a, b) =>
    a.strength > b.strength ? a : b
  );
  const phi = 1.61803398875;
  const idealPositions = [1 / 3, 1 / 2, 2 / 3, 1 / phi, 1 - 1 / phi];

  let minDistance = Infinity;
  for (const ideal of idealPositions) {
    const distance = Math.abs(bestHorizon.y - ideal);
    minDistance = Math.min(minDistance, distance);
  }

  return Math.max(0, 100 - minDistance * 200);
}

// Enhanced reason generation
function generateReasons(metrics: CompositionMetrics): string[] {
  const reasons: string[] = [];

  if (metrics.score > 80) {
    reasons.push('Excellent overall image quality');
  } else if (metrics.score > 60) {
    reasons.push('Good image quality');
  } else {
    reasons.push('Image quality needs improvement');
  }

  // Basic metrics
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

  // Composition feedback (only if detailed object provided)
  const compObj =
    typeof metrics.composition === 'number' ? null : metrics.composition;

  if (compObj) {
    if (compObj.ruleOfThirds < 40) {
      reasons.push('Consider using Rule of Thirds for better composition');
    } else if (compObj.ruleOfThirds > 80) {
      reasons.push('Great use of Rule of Thirds');
    }

    if (compObj.goldenRatio < 40) {
      reasons.push('Golden Ratio placement could improve composition');
    } else if (compObj.goldenRatio > 80) {
      reasons.push('Excellent Golden Ratio composition');
    }

    if (compObj.symmetry > 80) {
      reasons.push('Strong symmetrical composition');
    }

    if (compObj.leadingLines > 70) {
      reasons.push('Good use of leading lines');
    }

    if (compObj.horizonPlacement < 40) {
      reasons.push('Horizon placement could be improved');
    } else if (compObj.horizonPlacement > 80) {
      reasons.push('Well-placed horizon line');
    }
  }

  return reasons;
}

// Advanced brightness (subject-weighted, clipping-aware)
function calculateBrightnessAdvanced(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  focalPoints: Array<{ x: number; y: number; weight: number }>
): { global: number; subject: number } {
  const N = data.length / 4;
  let sum = 0,
    shadows = 0,
    highlights = 0;

  for (let i = 0; i < data.length; i += 4) {
    const g = (data[i] + data[i + 1] + data[i + 2]) / 3; // 0..255
    sum += g;
    if (g <= 10) shadows++;
    if (g >= 245) highlights++;
  }

  const mean = sum / N; // 0..255
  const midtoneScore = 100 - (Math.abs(mean - 127.5) / 127.5) * 100; // best near mid tones
  const clipPenalty = (shadows / N + highlights / N) * 50; // penalize clipped pixels
  const global = Math.max(0, Math.min(100, midtoneScore - clipPenalty));

  if (!focalPoints.length) return { global, subject: global };

  const clamp = (v: number, lo: number, hi: number) =>
    Math.max(lo, Math.min(hi, v));
  const grayAt = (x: number, y: number) => {
    const ix = clamp(x, 0, width - 1);
    const iy = clamp(y, 0, height - 1);
    const idx = (iy * width + ix) * 4;
    return (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
  };

  // measure subject brightness around focal points
  const win = 21;
  const half = Math.floor(win / 2);
  let weighted = 0,
    wsum = 0;

  for (const p of focalPoints.slice(0, 5)) {
    const cx = Math.round(p.x * width);
    const cy = Math.round(p.y * height);
    let sumG = 0,
      cnt = 0,
      sh = 0,
      hi = 0;

    for (let j = -half; j <= half; j++) {
      for (let i = -half; i <= half; i++) {
        const g = grayAt(cx + i, cy + j);
        sumG += g;
        cnt++;
        if (g <= 10) sh++;
        if (g >= 245) hi++;
      }
    }

    const meanLocal = sumG / cnt;
    const midLocal = 100 - (Math.abs(meanLocal - 127.5) / 127.5) * 100;
    const clipLocal = (sh / cnt + hi / cnt) * 50;
    const localScore = Math.max(0, Math.min(100, midLocal - clipLocal));

    weighted += localScore * p.weight;
    wsum += p.weight;
  }

  const subject = wsum > 0 ? weighted / wsum : global;
  return { global, subject };
}

// Advanced contrast (subject-weighted, clipping-aware)
function calculateContrastAdvanced(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  focalPoints: Array<{ x: number; y: number; weight: number }>
): { global: number; subject: number } {
  const N = data.length / 4;
  const hist = new Array<number>(256).fill(0);
  let clipLow = 0,
    clipHigh = 0;

  for (let i = 0; i < data.length; i += 4) {
    const g = Math.round((data[i] + data[i + 1] + data[i + 2]) / 3);
    hist[g]++;
  }
  clipLow = hist[0] + hist[1] + hist[2];
  clipHigh = hist[255] + hist[254] + hist[253];

  const percentileFromHist = (p: number) => {
    const target = p * N;
    let acc = 0;
    for (let v = 0; v < 256; v++) {
      acc += hist[v];
      if (acc >= target) return v;
    }
    return 255;
  };

  const p5 = percentileFromHist(0.05);
  const p95 = percentileFromHist(0.95);
  const dr = Math.max(0, p95 - p5); // dynamic range robust
  const drScore = (dr / 255) * 100;
  const clipPenalty = ((clipLow + clipHigh) / N) * 50; // penalize clipping
  const global = Math.max(0, Math.min(100, drScore - clipPenalty));

  if (!focalPoints.length) return { global, subject: global };

  const clamp = (v: number, lo: number, hi: number) =>
    Math.max(lo, Math.min(hi, v));
  const grayAt = (x: number, y: number) => {
    const ix = clamp(x, 0, width - 1);
    const iy = clamp(y, 0, height - 1);
    const idx = (iy * width + ix) * 4;
    return (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
  };

  const win = 21;
  const half = Math.floor(win / 2);
  let weighted = 0,
    wsum = 0;

  for (const p of focalPoints.slice(0, 5)) {
    const cx = Math.round(p.x * width);
    const cy = Math.round(p.y * height);
    const vals: number[] = [];
    let cLow = 0,
      cHigh = 0;

    for (let j = -half; j <= half; j++) {
      for (let i = -half; i <= half; i++) {
        const g = grayAt(cx + i, cy + j);
        vals.push(g);
        if (g <= 2) cLow++;
        if (g >= 253) cHigh++;
      }
    }

    vals.sort((a, b) => a - b);
    const idx = (q: number) =>
      Math.min(vals.length - 1, Math.max(0, Math.floor(q * (vals.length - 1))));
    const p10 = vals[idx(0.1)];
    const p90 = vals[idx(0.9)];
    const localDR = Math.max(0, p90 - p10);
    const localDRScore = (localDR / 255) * 100;
    const localClipPenalty = ((cLow + cHigh) / vals.length) * 50;
    const localScore = Math.max(
      0,
      Math.min(100, localDRScore - localClipPenalty)
    );

    weighted += localScore * p.weight;
    wsum += p.weight;
  }

  const subject = wsum > 0 ? weighted / wsum : global;
  return { global, subject };
}

// Advanced color balance (subject-weighted, cast & saturation aware)
function calculateColorBalanceAdvanced(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  focalPoints: Array<{ x: number; y: number; weight: number }>
): { global: number; subject: number } {
  const N = data.length / 4;

  // Global neutral cast (gray-world) + saturation robustness
  let devSum = 0;
  let lowSat = 0,
    hiSat = 0;

  for (let i = 0; i < data.length; i += 4) {
    const R = data[i] / 255,
      G = data[i + 1] / 255,
      B = data[i + 2] / 255;
    const m = (R + G + B) / 3;
    devSum += (Math.abs(R - m) + Math.abs(G - m) + Math.abs(B - m)) / 3;

    const { s } = rgbToHsv(R, G, B);
    if (s < 0.08) lowSat++;
    if (s > 0.9) hiSat++;
  }

  const avgDev = devSum / N; // 0..~1
  const neutralScore = Math.max(0, 100 - avgDev * 100); // makin kecil dev → makin netral

  const satPenalty =
    (lowSat / N) * 40 + // terlalu desat (abu-abu)
    (hiSat / N) * 60; // oversaturated
  const satScore = Math.max(0, 100 - satPenalty);

  const global = Math.round(0.7 * neutralScore + 0.3 * satScore);

  if (!focalPoints.length) return { global, subject: global };

  // Subject-weighted (di sekitar focal points)
  const win = 21;
  const half = Math.floor(win / 2);
  const clamp = (v: number, lo: number, hi: number) =>
    Math.max(lo, Math.min(hi, v));
  const getRGB = (x: number, y: number) => {
    const ix = clamp(x, 0, width - 1);
    const iy = clamp(y, 0, height - 1);
    const idx = (iy * width + ix) * 4;
    return [data[idx] / 255, data[idx + 1] / 255, data[idx + 2] / 255] as [
      number,
      number,
      number,
    ];
  };

  let weighted = 0,
    wsum = 0;

  for (const p of focalPoints.slice(0, 5)) {
    const cx = Math.round(p.x * width);
    const cy = Math.round(p.y * height);
    let dev = 0,
      cnt = 0,
      lowS = 0,
      hiS = 0;

    for (let j = -half; j <= half; j++) {
      for (let i = -half; i <= half; i++) {
        const [R, G, B] = getRGB(cx + i, cy + j);
        const m = (R + G + B) / 3;
        dev += (Math.abs(R - m) + Math.abs(G - m) + Math.abs(B - m)) / 3;

        const { s } = rgbToHsv(R, G, B);
        if (s < 0.08) lowS++;
        if (s > 0.9) hiS++;
        cnt++;
      }
    }

    const avgDevLocal = dev / cnt;
    const neutralLocal = Math.max(0, 100 - avgDevLocal * 100);
    const satPenaltyLocal = (lowS / cnt) * 40 + (hiS / cnt) * 60;
    const satLocal = Math.max(0, 100 - satPenaltyLocal);
    const localScore = Math.round(0.7 * neutralLocal + 0.3 * satLocal);

    weighted += localScore * p.weight;
    wsum += p.weight;
  }

  const subject = wsum > 0 ? weighted / wsum : global;
  return { global, subject };
}

function rgbToHsv(
  r: number,
  g: number,
  b: number
): { h: number; s: number; v: number } {
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const d = max - min;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  let h = 0;
  if (d !== 0) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return { h, s, v };
}
