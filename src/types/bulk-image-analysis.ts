export interface ImageFile {
  id: string;
  file: File;
  previewUrl: string;
  status: 'pending' | 'analyzing' | 'completed' | 'error';
  originalName?: string; // Original filename for HEIC files
  result?: {
    quality: 'Good' | 'Standard' | 'Bad';
    score: number;
    isNight: boolean;
    reasons: string[];
    metrics?: {
      brightness: number;
      contrast: number;
      sharpness: number;
      colorBalance: number;
      noiseLevel: number;
      composition: {
        overall: number;
        ruleOfThirds: number;
        goldenRatio: number;
        symmetry: number;
        leadingLines: number;
        horizonPlacement: number;
        subjectCentering: number;
        horizonTilt: number;
      };
    };
    context?: {
      isBlackAndWhite: boolean;
      isLowKey: boolean;
      isHighKey: boolean;
      isPortrait: boolean;
      hasBackgroundBlur: boolean;
      subjectDetected: boolean;
    };
  };
  error?: string;
}

export interface AnalysisSummary {
  total: number;
  good: number;
  standard: number;
  bad: number;
  averageScore: number;
  completed: number;
}

export interface AnalysisResult {
  quality: 'Good' | 'Standard' | 'Bad';
  score: number;
  isNight: boolean;
  reasons: string[];
  metrics?: {
    brightness: number;
    contrast: number;
    sharpness: number;
    colorBalance: number;
    noiseLevel: number;
    composition: {
      overall: number;
      ruleOfThirds: number;
      goldenRatio: number;
      symmetry: number;
      leadingLines: number;
      horizonPlacement: number;
      subjectCentering: number;
      horizonTilt: number;
    };
  };
  context?: {
    isBlackAndWhite: boolean;
    isLowKey: boolean;
    isHighKey: boolean;
    isPortrait: boolean;
    hasBackgroundBlur: boolean;
    subjectDetected: boolean;
  };
}
