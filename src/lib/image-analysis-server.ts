import { ImageAnnotatorClient } from '@google-cloud/vision';

// Google Vision API analysis (server-side only)
export interface VisionImageAnalysis {
  isGood: boolean;
  score: number;
  features: {
    safeSearch?: SafeSearchAnnotation;
    labelDetection: LabelAnnotation[];
    faceDetection: FaceAnnotation[];
    textDetection: TextAnnotation[];
    imageProperties?: ImagePropertiesAnnotation;
  };
  reasons: string[];
}

export async function analyzeImageVision(
  imageBuffer: Buffer
): Promise<VisionImageAnalysis> {
  try {
    const client = new ImageAnnotatorClient(
      process.env.GOOGLE_APPLICATION_CREDENTIALS
        ? { keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS }
        : {
            credentials: {
              client_email: process.env.GOOGLE_CLIENT_EMAIL,
              private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(
                /\\n/g,
                '\n'
              ),
            },
            projectId: process.env.GOOGLE_PROJECT_ID,
          }
    );

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
    const safeSearchN = normalizeSafeSearch(result.safeSearchAnnotation);
    const labelsN = normalizeLabels(result.labelAnnotations);
    const facesN = normalizeFaces(result.faceAnnotations);
    const textsN = normalizeTexts(result.textAnnotations);
    const propertiesN = normalizeImageProps(result.imagePropertiesAnnotation);

    // Calculate score based on various factors
    const score = calculateVisionScore({
      safeSearch: safeSearchN,
      labels: labelsN,
      faces: facesN,
      texts: textsN,
      properties: propertiesN,
    });

    // Determine if image is good
    const isGood =
      score > 70 &&
      safeSearchN?.adult === 'VERY_UNLIKELY' &&
      safeSearchN?.violence === 'VERY_UNLIKELY';

    // Generate reasons
    const reasons = generateVisionReasons({
      safeSearch: safeSearchN,
      labels: labelsN,
      faces: facesN,
      texts: textsN,
      properties: propertiesN,
      score,
    });

    return {
      isGood,
      score,
      features: {
        safeSearch: safeSearchN,
        labelDetection: labelsN,
        faceDetection: facesN,
        textDetection: textsN,
        imageProperties: propertiesN,
      },
      reasons,
    };
  } catch (error) {
    throw new Error(`Vision API analysis failed: ${error}`);
  }
}

export type LikelihoodString =
  | 'UNKNOWN'
  | 'VERY_UNLIKELY'
  | 'UNLIKELY'
  | 'POSSIBLE'
  | 'LIKELY'
  | 'VERY_LIKELY';

export interface SafeSearchAnnotation {
  adult?: LikelihoodString | number;
  violence?: LikelihoodString | number;
  racy?: LikelihoodString | number;
  medical?: LikelihoodString | number;
  spoof?: LikelihoodString | number;
}

export interface LabelAnnotation {
  description?: string;
  score?: number;
  topicality?: number;
}

export interface FaceAnnotation {
  detectionConfidence?: number;
}

export interface TextAnnotation {
  description?: string;
}

export interface ImagePropertiesAnnotation {
  dominantColors?: {
    colors?: Array<{
      color?: { red?: number; green?: number; blue?: number };
      score?: number;
      pixelFraction?: number;
    }>;
  };
}

interface VisionFeaturesData {
  safeSearch?: SafeSearchAnnotation;
  labels: LabelAnnotation[];
  faces: FaceAnnotation[];
  texts: TextAnnotation[];
  properties?: ImagePropertiesAnnotation;
  score?: number; // used in reasons
}

function toLikelihoodString(
  v?: LikelihoodString | number
): LikelihoodString | undefined {
  if (v === undefined) return undefined;
  if (typeof v === 'string') return v;
  const map: LikelihoodString[] = [
    'UNKNOWN',
    'VERY_UNLIKELY',
    'UNLIKELY',
    'POSSIBLE',
    'LIKELY',
    'VERY_LIKELY',
  ];
  return map[v] ?? 'UNKNOWN';
}

function calculateVisionScore(features: VisionFeaturesData): number {
  let score = 50;

  if (features.safeSearch) {
    const adult = toLikelihoodString(features.safeSearch.adult);
    const violence = toLikelihoodString(features.safeSearch.violence);
    const racy = toLikelihoodString(features.safeSearch.racy);
    if (adult === 'VERY_UNLIKELY') score += 20;
    if (violence === 'VERY_UNLIKELY') score += 20;
    if (racy === 'VERY_UNLIKELY') score += 10;
  }

  if (features.labels && features.labels.length > 0) {
    score += Math.min(20, features.labels.length * 2);
  }
  if (features.faces && features.faces.length > 0) {
    score += Math.min(10, features.faces.length * 2);
  }
  if (features.texts && features.texts.length > 1) {
    score += 10;
  }

  return Math.min(100, score);
}

function generateVisionReasons(
  features: VisionFeaturesData & { score: number }
): string[] {
  const reasons: string[] = [];

  if (features.score > 80) {
    reasons.push('High-quality image with good content');
  } else if (features.score > 60) {
    reasons.push('Acceptable image quality');
  } else {
    reasons.push('Image quality needs improvement');
  }

  if (features.safeSearch) {
    const adult = toLikelihoodString(features.safeSearch.adult);
    const violence = toLikelihoodString(features.safeSearch.violence);
    if (adult !== 'VERY_UNLIKELY') {
      reasons.push('Contains potentially inappropriate content');
    }
    if (violence !== 'VERY_UNLIKELY') {
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

function normalizeSafeSearch(s: unknown): SafeSearchAnnotation | undefined {
  if (!s) return undefined;
  const v = s as {
    adult?: LikelihoodString | number | null;
    violence?: LikelihoodString | number | null;
    racy?: LikelihoodString | number | null;
    medical?: LikelihoodString | number | null;
    spoof?: LikelihoodString | number | null;
  };
  return {
    adult: v.adult ?? undefined,
    violence: v.violence ?? undefined,
    racy: v.racy ?? undefined,
    medical: v.medical ?? undefined,
    spoof: v.spoof ?? undefined,
  };
}

function normalizeLabels(arr: unknown): LabelAnnotation[] {
  if (!Array.isArray(arr)) return [];
  return arr.map(l => {
    const v = l as {
      description?: string | null;
      score?: number | null;
      topicality?: number | null;
    };
    return {
      description: v.description ?? undefined,
      score: v.score ?? undefined,
      topicality: v.topicality ?? undefined,
    };
  });
}

function normalizeFaces(arr: unknown): FaceAnnotation[] {
  if (!Array.isArray(arr)) return [];
  return arr.map(f => {
    const v = f as { detectionConfidence?: number | null };
    return { detectionConfidence: v.detectionConfidence ?? undefined };
  });
}

function normalizeTexts(arr: unknown): TextAnnotation[] {
  if (!Array.isArray(arr)) return [];
  return arr.map(t => {
    const v = t as { description?: string | null };
    return { description: v.description ?? undefined };
  });
}

function normalizeImageProps(
  obj: unknown
): ImagePropertiesAnnotation | undefined {
  if (!obj) return undefined;
  const p = obj as {
    dominantColors?: {
      colors?: Array<{
        color?: { red?: number; green?: number; blue?: number } | null;
        score?: number | null;
        pixelFraction?: number | null;
      } | null> | null;
    } | null;
  };
  return {
    dominantColors: p.dominantColors
      ? {
          colors: (p.dominantColors.colors ?? []).filter(Boolean).map(c => {
            const v = c as NonNullable<typeof c>;
            return {
              color: v?.color ?? undefined,
              score: v?.score ?? undefined,
              pixelFraction: v?.pixelFraction ?? undefined,
            };
          }),
        }
      : undefined,
  };
}
