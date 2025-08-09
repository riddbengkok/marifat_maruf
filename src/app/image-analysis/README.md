# Image Analysis Page

## Overview

The Image Analysis page provides a comprehensive interface for analyzing image quality using both local algorithms and Google Vision API.

## Features

### Main Components

1. **ImageAnalysisDemo Component**
   - File upload interface
   - Method selection (Local vs Vision API)
   - Real-time analysis results
   - Detailed metrics display
   - Error handling and loading states

2. **Information Panel**
   - How it works explanation
   - Quality metrics guide
   - Tips for better images
   - API information

### Page Structure

```
/image-analysis/
├── page.tsx              # Main page component
├── layout.tsx            # Page layout with metadata
└── README.md            # This documentation
```

## Usage

### Accessing the Page

1. **Direct URL**: Navigate to `/image-analysis`
2. **Navigation**: Use the sidebar navigation link
3. **Test Page**: Visit `/test-image-analysis` for API testing

### Page Features

#### Main Analysis Area

- **File Upload**: Drag and drop or click to select images
- **Method Selection**: Choose between Local and Vision API analysis
- **Analysis Button**: Process the uploaded image
- **Results Display**: Shows quality score, metrics, and reasons

#### Information Sidebar

- **How It Works**: Explanation of both analysis methods
- **Quality Metrics**: Guide to understanding the metrics
- **Tips**: Best practices for better images
- **API Info**: Technical specifications and limits

## Technical Details

### Dependencies

```json
{
  "@google-cloud/vision": "^4.0.2",
  "canvas": "^2.11.2"
}
```

### Environment Variables

```bash
# Required for Google Vision API
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account-key.json
```

### API Endpoints

- `POST /api/analyze-image` - Main analysis endpoint
- `GET /api/analyze-image` - API information

### File Requirements

- **Maximum Size**: 10MB
- **Supported Formats**: JPEG, PNG, GIF, WebP
- **Rate Limit**: 5 requests per minute per IP

## Styling

### Layout

- **Background**: Gradient from blue-50 to indigo-100
- **Grid**: 2/3 main content, 1/3 sidebar on large screens
- **Responsive**: Single column on mobile devices

### Components

- **Cards**: White background with shadow
- **Buttons**: Blue primary, green secondary
- **Metrics**: Color-coded badges for different metrics
- **Results**: Green for good, red for bad quality

## Navigation Integration

The page is integrated into the main navigation:

1. **Sidebar Link**: Added to the AI tools section
2. **Page Title**: "Image Analysis" in the sidebar
3. **Icon**: Custom SVG icon for image analysis

## Testing

### Test Page

Visit `/test-image-analysis` to:

- Test API functionality
- Verify response format
- Check error handling
- Validate rate limiting

### Manual Testing

1. Upload different image types
2. Test both analysis methods
3. Verify error messages
4. Check rate limiting behavior

## Performance

### Optimizations

- **Lazy Loading**: Components load on demand
- **Image Compression**: Automatic size validation
- **Caching**: Results cached for repeated analysis
- **Error Boundaries**: Graceful error handling

### Monitoring

- **Console Logs**: Detailed error logging
- **Network Requests**: API call monitoring
- **User Interactions**: Usage analytics

## Accessibility

### Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Proper ARIA labels
- **Color Contrast**: WCAG compliant colors
- **Focus Management**: Proper focus indicators

### Best Practices

- **Alt Text**: Descriptive image alt text
- **Semantic HTML**: Proper heading structure
- **Form Labels**: Clear input labels
- **Error Messages**: Descriptive error text

## Future Enhancements

### Planned Features

1. **Batch Processing**: Analyze multiple images
2. **Export Results**: Download analysis reports
3. **Custom Thresholds**: Adjustable quality criteria
4. **Image Editing**: Basic image enhancement tools
5. **Comparison Mode**: Compare multiple images

### Technical Improvements

1. **Web Workers**: Background processing
2. **Service Worker**: Offline functionality
3. **Progressive Web App**: PWA capabilities
4. **Real-time Analysis**: Live preview during upload

## Troubleshooting

### Common Issues

1. **Canvas Error**
   - Ensure `canvas` package is installed
   - Check browser compatibility

2. **Vision API Error**
   - Verify Google Cloud credentials
   - Check API enablement

3. **File Upload Issues**
   - Validate file format and size
   - Check browser file API support

4. **Rate Limiting**
   - Wait for rate limit reset
   - Implement proper caching

### Debug Mode

Enable detailed logging:

```bash
NODE_ENV=development
```

This will show:

- API request/response details
- Image processing metrics
- Error stack traces
- Performance timings

## Support

For issues or questions:

1. Check the test page first
2. Review console logs
3. Verify environment setup
4. Test with different image types
