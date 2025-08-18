# Context-Aware Image Analysis

## Overview

The bulk image analysis feature has been enhanced with context-aware analysis that adapts metric calculations based on the type and characteristics of the image. This makes the analysis fairer for different photography styles and techniques.

## Quality Assessment System

The analysis now uses a **3-tier quality system**:

- **Good** (75-100 points): Excellent image quality with high technical standards
- **Standard** (50-74 points): Good image quality with room for improvement  
- **Bad** (0-49 points): Image quality needs significant improvement

## New Features

### 1. Subject Detection
- **Saliency Mapping**: Detects the main subject in the image using center-surround contrast analysis
- **Subject-Focused Metrics**: Calculates brightness, sharpness, and color balance only within the detected subject area
- **Background Blur Detection**: Identifies intentional background blur (bokeh) and rewards it instead of penalizing

### 2. Image Context Detection
- **Black & White Detection**: Automatically detects monochrome images and skips color balance scoring
- **Low-Key/High-Key Detection**: Identifies dark or bright images and adjusts brightness expectations
- **Portrait Detection**: Recognizes portrait orientation and applies appropriate scoring rules
- **Background Blur Detection**: Identifies intentional depth of field effects

### 3. Context-Aware Metric Calculation

#### Brightness
- **Normal Images**: Expects 30-80 range
- **Low-Key Images**: Rewards visible subjects (≥30) even with dark backgrounds
- **High-Key Images**: Checks for overexposed subjects (≤200)
- **Subject-Focused**: Calculates brightness only in the main subject area

#### Sharpness
- **Subject-Focused**: Measures sharpness only in the detected subject region
- **Bokeh Bonus**: Rewards sharp subjects with blurred backgrounds (+20 points)
- **Portrait Protection**: Minimum 50 points for portraits with intentional background blur

#### Color Balance
- **Black & White**: Automatically scores 100 (perfect) for intentional B&W
- **Subject-Focused**: Calculates color balance only in the subject area
- **Context-Aware**: Adapts expectations based on image style

#### Contrast
- **Subject-Focused**: Measures contrast in the main subject area
- **Context-Aware**: Adjusts expectations for different lighting conditions

## Technical Implementation

### Files Added/Modified

1. **`src/lib/subject-detection.ts`** - New subject detection and context analysis
2. **`src/lib/context-aware-metrics.ts`** - Context-aware metric calculations
3. **`src/lib/image-analysis-browser.ts`** - Updated main analysis function
4. **`src/components/ImageContextIndicator.tsx`** - UI component for displaying context
5. **`src/components/BulkImageAnalysis.tsx`** - Updated to show context information
6. **`src/types/bulk-image-analysis.ts`** - Updated types to include context
7. **`src/hooks/useBulkImageAnalysis.ts`** - Updated to handle 3-tier quality system

### Key Functions

#### Subject Detection
```typescript
analyzeImageContext(data, width, height): ImageContext
detectSalientRegion(data, width, height): SubjectRegion
detectBlackAndWhite(data): boolean
detectLowKey(data): boolean
detectHighKey(data): boolean
detectPortrait(width, height): boolean
detectBackgroundBlur(data, width, height): boolean
```

#### Context-Aware Metrics
```typescript
calculateContextAwareMetrics(data, width, height, context): ContextAwareMetrics
calculateContextAwareBrightness(data, width, height, context): number
calculateContextAwareSharpness(data, width, height, context): number
calculateContextAwareColorBalance(data, context): number
```

## Usage Examples

### Testing the New Features
Visit `/test-context-analysis` to test the context-aware analysis with individual images.

### In Bulk Analysis
The context-aware analysis is automatically applied in the bulk image analysis feature. Context information is displayed as tags for each analyzed image.

## Benefits

1. **Fairer Scoring**: Portrait photos with intentional background blur are no longer penalized
2. **Creative Recognition**: Black & white and low-key images are properly evaluated
3. **Subject Focus**: Metrics focus on the main subject rather than the entire image
4. **Style Awareness**: Different photography styles are evaluated appropriately
5. **Detailed Quality Assessment**: 3-tier system provides more nuanced quality evaluation

## Perfect Values by Context

### Normal Images
- **Brightness**: 30-80 (50-70 ideal)
- **Contrast**: 70-100
- **Sharpness**: 80-100
- **Color Balance**: 70-100

### Low-Key Images
- **Brightness**: Subject ≥30 (global can be lower)
- **Contrast**: 70-100
- **Sharpness**: 80-100 (subject-focused)
- **Color Balance**: 70-100 (subject-focused)

### Black & White Images
- **Brightness**: 30-80 (50-70 ideal)
- **Contrast**: 70-100
- **Sharpness**: 80-100
- **Color Balance**: 100 (automatic perfect score)

### Portraits with Bokeh
- **Brightness**: 30-80 (50-70 ideal)
- **Contrast**: 70-100
- **Sharpness**: Subject 80-100, Background can be lower
- **Color Balance**: 70-100 (subject-focused)

## Quality Thresholds

### Good Quality (75-100 points)
- Score ≥ 75 AND meets technical requirements
- High technical standards across all metrics
- Excellent composition and subject focus

### Standard Quality (50-74 points)
- Score ≥ 50 AND meets technical requirements
- Good technical standards with room for improvement
- Acceptable composition and subject focus

### Bad Quality (0-49 points)
- Score < 50 OR doesn't meet technical requirements
- Significant technical issues
- Poor composition or subject focus

## Future Enhancements

1. **Advanced Object Detection**: Integration with ML models for better subject detection
2. **Style Classification**: Automatic detection of photography styles (street, macro, landscape, etc.)
3. **User Preferences**: Allow users to specify image type for more accurate analysis
4. **Learning System**: Adapt thresholds based on user feedback and corrections
