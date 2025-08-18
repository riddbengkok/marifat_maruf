# Custom Hooks Documentation

## useBulkImageAnalysis

Hook untuk mengelola bulk image analysis dengan fitur upload, analisis batch, dan export hasil.

### Penggunaan

```tsx
import { useBulkImageAnalysis } from '@/hooks/useBulkImageAnalysis';

const MyComponent = () => {
  const {
    // State
    images,
    isAnalyzing,
    analysisMethod,
    batchSize,
    filter,
    sortBy,
    anonUsed,
    FREE_LIMIT,
    filteredAndSortedImages,
    summary,
    user,

    // Actions
    handleFileSelect,
    handleDrop,
    handleDragOver,
    removeImage,
    startAnalysis,
    stopAnalysis,
    clearResults,
    exportResults,

    // Setters
    setAnalysisMethod,
    setBatchSize,
    setFilter,
    setSortBy,
  } = useBulkImageAnalysis();

  return (
    // Your component JSX
  );
};
```

### State Properties

- `images`: Array of ImageFile objects
- `isAnalyzing`: Boolean indicating if analysis is in progress
- `analysisMethod`: 'local' | 'vision' - Method for image analysis
- `batchSize`: Number - Number of images to process in each batch
- `filter`: 'all' | 'good' | 'bad' - Filter for results
- `sortBy`: 'score' | 'name' - Sort method for results
- `anonUsed`: Number - Number of analyses used by anonymous users
- `FREE_LIMIT`: Number - Free analysis limit for anonymous users
- `filteredAndSortedImages`: Array - Images filtered and sorted according to current settings
- `summary`: AnalysisSummary object with statistics
- `user`: User object from authentication

### Actions

- `handleFileSelect`: Handle file input change
- `handleDrop`: Handle drag and drop events
- `handleDragOver`: Handle drag over events
- `removeImage`: Remove specific image by ID
- `startAnalysis`: Start bulk analysis process
- `stopAnalysis`: Stop ongoing analysis
- `clearResults`: Clear all images and results
- `exportResults`: Export results as CSV file

### Setters

- `setAnalysisMethod`: Change analysis method
- `setBatchSize`: Change batch size
- `setFilter`: Change filter setting
- `setSortBy`: Change sort method

### Types

```tsx
interface ImageFile {
  id: string;
  file: File;
  previewUrl: string;
  status: 'pending' | 'analyzing' | 'completed' | 'error';
  result?: {
    isGood: boolean;
    score: number;
    reasons: string[];
  };
  error?: string;
}

interface AnalysisSummary {
  total: number;
  good: number;
  bad: number;
  averageScore: number;
  completed: number;
}
```

### Fitur

1. **Upload Multiple Images**: Drag & drop atau file picker
2. **Batch Processing**: Analisis gambar dalam batch untuk performa optimal
3. **Multiple Analysis Methods**: Local browser analysis atau Vision API
4. **Real-time Progress**: Status tracking untuk setiap gambar
5. **Filtering & Sorting**: Filter berdasarkan kualitas dan sort berdasarkan score/nama
6. **Export Results**: Export hasil ke CSV
7. **Quota Management**: Batasan untuk user anonymous
8. **Error Handling**: Penanganan error untuk setiap gambar

### Contoh Penggunaan Sederhana

```tsx
const SimpleBulkAnalysis = () => {
  const { images, isAnalyzing, startAnalysis, handleFileSelect } =
    useBulkImageAnalysis();

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
      />
      <button onClick={startAnalysis} disabled={isAnalyzing}>
        {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
      </button>
      <p>Selected: {images.length} images</p>
    </div>
  );
};
```
