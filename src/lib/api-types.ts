// API Request/Response Types
export interface UserRegistrationRequest {
  email: string;
  name?: string;
  firebaseUid?: string;
}

export interface UserRegistrationResponse {
  user: {
    id: number;
    email: string;
    name?: string | null;
    status?: string | null;
    firebaseUid?: string | null;
  };
}

export interface SubscriptionStatusRequest {
  firebaseUid?: string;
  email?: string;
}

export interface SubscriptionStatusResponse {
  status: 'active' | 'inactive' | 'none';
}

export interface SubscriptionRequest {
  firebaseUid?: string;
  email?: string;
  plan?: string;
}

export interface CustomerDetails {
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
}

export interface ItemDetail {
  id: string;
  price: number;
  quantity: number;
  name: string;
}

export interface PaymentRequest {
  customer_details: CustomerDetails;
  item_details: ItemDetail[];
  email: string;
}

export interface PaymentResponse {
  token: string;
  order_id: string;
}

export interface MidtransWebhookRequest {
  order_id: string;
  transaction_status: string;
  signature_key: string;
  status_code: string;
  gross_amount: string;
}

export interface OrderStatusRequest {
  id?: string;
  email?: string;
}

export interface OrderStatusResponse {
  status: string;
  id?: number;
  statusPayment?: string;
  price?: string;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  userId?: number;
}

export interface PromptUsageRequest {
  email: string;
}

export interface PromptUsageResponse {
  count: number;
}

export interface StoryGenerationRequest {
  prompt: string;
}

export interface StoryGenerationResponse {
  story: string;
}

// Error Response Type
export interface ApiErrorResponse {
  error: string;
  status?: number;
}

// Image Analysis Types
export interface ImageAnalysisRequest {
  image: string; // base64 encoded image
  method?: 'local' | 'vision'; // analysis method
}

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

export interface ImageAnalysisResponse {
  isGood: boolean;
  score: number;
  method: 'local' | 'vision';
  analysis: LocalImageAnalysis | VisionImageAnalysis;
  reasons: string[];
  imageData?: string; // Base64 image data for client-side local analysis
}
