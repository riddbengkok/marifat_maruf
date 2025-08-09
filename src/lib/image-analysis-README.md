# Image Analysis API

## Overview

The Image Analysis API provides two methods to analyze images and determine if they are good or bad quality:

1. **Local Analysis**: Uses canvas and basic image metrics
2. **Google Vision API**: Uses Google's advanced image analysis features

## Features

### Local Analysis

- **Brightness**: Analyzes overall image brightness
- **Contrast**: Measures image contrast levels
- **Sharpness**: Detects image blurriness
- **Color Balance**: Evaluates color distribution
- **Composition**: Checks aspect ratio and resolution

### Google Vision API Analysis

- **Safe Search**: Detects inappropriate content
- **Label Detection**: Identifies objects and scenes
- **Face Detection**: Counts and analyzes faces
- **Text Detection**: Extracts readable text
- **Image Properties**: Analyzes colors and properties

## Installation

### Dependencies

Add the required dependencies to your `package.json`:

```bash
npm install @google-cloud/vision
```

**Note**: Local analysis uses browser-based canvas processing, so no server-side canvas dependency is required. The application includes browser-compatible utilities for image processing.

### Google Vision API Setup (Optional)

1. Create a Google Cloud project
2. Enable the Vision API
3. Create a service account and download the JSON key file
4. Set the environment variable:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="path/to/your/service-account-key.json"
```

## Usage

### API Endpoint

```
POST /api/analyze-image
```

### Request Body

```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
  "method": "local"
}
```

### Response

```json
{
  "isGood": true,
  "score": 85,
  "method": "local",
  "analysis": {
    "isGood": true,
    "score": 85,
    "metrics": {
      "brightness": 65,
      "contrast": 75,
      "sharpness": 90,
      "colorBalance": 80,
      "composition": 85
    },
    "reasons": ["Excellent overall image quality", "Good image quality"]
  },
  "reasons": ["Excellent overall image quality", "Good image quality"]
}
```

## Scoring System

### Local Analysis Scoring

- **Brightness** (20%): Optimal range 30-80
- **Contrast** (20%): Higher values indicate better contrast
- **Sharpness** (30%): Higher values indicate sharper images
- **Color Balance** (20%): Balanced color distribution
- **Composition** (10%): Aspect ratio and resolution quality

### Vision API Scoring

- **Safe Search** (50%): Content appropriateness
- **Label Detection** (20%): Object/scene recognition
- **Face Detection** (10%): Face presence and quality
- **Text Detection** (10%): Readable text presence
- **Image Properties** (10%): Color and property analysis

## Quality Thresholds

- **Good Image**: Score > 60 (local) or > 70 (vision)
- **Bad Image**: Score ≤ 60 (local) or ≤ 70 (vision)

## Rate Limiting

- **Local Analysis**: 5 requests per minute per IP
- **Vision API**: 5 requests per minute per IP (plus Google's limits)

## File Size Limits

- **Maximum Size**: 10MB
- **Supported Formats**: JPEG, PNG, GIF, WebP

## Error Handling

The API includes comprehensive error handling:

- **Invalid Image Format**: Returns 400 error
- **File Too Large**: Returns 400 error
- **Rate Limit Exceeded**: Returns 429 error
- **Vision API Unavailable**: Falls back to local analysis
- **Analysis Failure**: Returns 500 error

## Demo Component

Use the `ImageAnalysisDemo` component to test the API:

```tsx
import { ImageAnalysisDemo } from '@/components/ImageAnalysisDemo';

export default function DemoPage() {
  return <ImageAnalysisDemo />;
}
```

## Environment Variables

```bash
# Required for Google Vision API
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account-key.json
```

## Performance Considerations

### Local Analysis

- **Pros**: Fast, no external dependencies, free, browser-based processing
- **Cons**: Basic metrics, limited content analysis, requires client-side processing
- **Best For**: Basic quality assessment, offline use, privacy-focused analysis

### Google Vision API

- **Pros**: Advanced features, content analysis, accurate
- **Cons**: Requires API key, costs money, network dependency
- **Best For**: Production use, content moderation, detailed analysis

## Security Features

1. **Input Validation**: Validates image format and size
2. **Rate Limiting**: Prevents abuse
3. **Error Handling**: Graceful fallbacks
4. **Content Safety**: Safe search detection (Vision API)

## Troubleshooting

### Common Issues

1. **Canvas Error**: Local analysis uses browser canvas, no server-side canvas required
2. **Vision API Error**: Check credentials and API enablement
3. **Memory Issues**: Large images may cause memory problems
4. **Rate Limiting**: Implement proper caching for high traffic
5. **Browser Compatibility**: Ensure browser supports HTML5 Canvas API
6. **Module Resolution**: All browser utilities are included in the codebase

### Debug Mode

Enable debug logging by setting:

```bash
NODE_ENV=development
```

This will show detailed analysis metrics in the console.
