import { useAuth } from '@/hooks/useAuth';
import { fileToBase64 } from '@/lib/browser-utils';
import { analyzeImageLocalBrowser } from '@/lib/image-analysis-browser';
import {
  AnalysisResult,
  AnalysisSummary,
  ImageFile,
} from '@/types/bulk-image-analysis';
import { useCallback, useEffect, useState } from 'react';

export const useBulkImageAnalysis = () => {
  const { user } = useAuth();
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisMethod, setAnalysisMethod] = useState<'local' | 'vision'>(
    'local'
  );
  const [batchSize, setBatchSize] = useState(5);
  const [filter, setFilter] = useState<'all' | 'good' | 'standard' | 'bad'>(
    'all'
  );
  const [sortBy, setSortBy] = useState<'score' | 'name'>('score');
  const [anonUsed, setAnonUsed] = useState(0);

  const FREE_LIMIT = 50; // Higher limit for bulk analysis

  useEffect(() => {
    const used = parseInt(
      localStorage.getItem('anonImageAnalysisCount') || '0',
      10
    );
    setAnonUsed(Number.isFinite(used) ? used : 0);
  }, []);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach(img => {
        if (img.previewUrl) URL.revokeObjectURL(img.previewUrl);
      });
    };
  }, [images]);

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      const imageFiles = files.filter(file => file.type.startsWith('image/'));

      if (imageFiles.length === 0) {
        alert('Please select valid image files');
        return;
      }

      const newImages: ImageFile[] = imageFiles.map(file => ({
        id: `${Date.now()}-${Math.random()}`,
        file,
        previewUrl: URL.createObjectURL(file),
        status: 'pending',
      }));

      setImages(prev => [...prev, ...newImages]);
    },
    []
  );

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));

    if (imageFiles.length === 0) {
      alert('Please drop valid image files');
      return;
    }

    const newImages: ImageFile[] = imageFiles.map(file => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      previewUrl: URL.createObjectURL(file),
      status: 'pending',
    }));

    setImages(prev => [...prev, ...newImages]);
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages(prev => {
      const img = prev.find(i => i.id === id);
      if (img?.previewUrl) {
        URL.revokeObjectURL(img.previewUrl);
      }
      return prev.filter(i => i.id !== id);
    });
  }, []);

  const analyzeImage = async (
    imageFile: ImageFile
  ): Promise<AnalysisResult> => {
    try {
      // Check quota for non-logged users
      if (!user) {
        const used =
          parseInt(localStorage.getItem('anonImageAnalysisCount') || '0', 10) ||
          0;
        if (used >= FREE_LIMIT) {
          throw new Error('Free limit reached. Sign in to continue.');
        }
        localStorage.setItem('anonImageAnalysisCount', String(used + 1));
        setAnonUsed(used + 1);
      }

      const base64 = await fileToBase64(imageFile.file);

      if (analysisMethod === 'local') {
        const result = await analyzeImageLocalBrowser(base64);
        return {
          quality: result.quality,
          score: result.score,
          isNight: result.isNight,
          reasons: result.reasons,
          metrics: result.metrics,
        };
      } else {
        // Vision API analysis
        const response = await fetch('/api/analyze-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64, method: 'vision' }),
        });

        if (!response.ok) {
          throw new Error('Vision API analysis failed');
        }

        const data = await response.json();
        return {
          quality: data.quality,
          score: data.score,
          isNight: data.isNight || false, // Default to false for Vision API
          reasons: data.reasons,
        };
      }
    } catch (error) {
      throw error;
    }
  };

  const startAnalysis = async () => {
    if (images.length === 0) {
      alert('Please select images to analyze');
      return;
    }

    setIsAnalyzing(true);
    const pendingImages = images.filter(img => img.status === 'pending');

    // Process images in batches
    for (let i = 0; i < pendingImages.length; i += batchSize) {
      const batch = pendingImages.slice(i, i + batchSize);

      // Update status to analyzing
      setImages(prev =>
        prev.map(img =>
          batch.some(batchImg => batchImg.id === img.id)
            ? { ...img, status: 'analyzing' }
            : img
        )
      );

      // Analyze batch concurrently
      const analysisPromises = batch.map(async imageFile => {
        try {
          const result = await analyzeImage(imageFile);
          return { id: imageFile.id, result, error: undefined };
        } catch (error) {
          return {
            id: imageFile.id,
            result: undefined,
            error: error instanceof Error ? error.message : 'Analysis failed',
          };
        }
      });

      const results = await Promise.all(analysisPromises);

      // Update images with results
      setImages(prev =>
        prev.map(img => {
          const result = results.find(r => r.id === img.id);
          if (result) {
            return {
              ...img,
              status: result.error ? 'error' : 'completed',
              result: result.result,
              error: result.error,
            };
          }
          return img;
        })
      );

      // Small delay between batches to prevent overwhelming
      if (i + batchSize < pendingImages.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    setIsAnalyzing(false);
  };

  const stopAnalysis = () => {
    setIsAnalyzing(false);
    setImages(prev =>
      prev.map(img =>
        img.status === 'analyzing' ? { ...img, status: 'pending' } : img
      )
    );
  };

  const clearResults = () => {
    setImages([]);
  };

  const exportResults = () => {
    const completedImages = images.filter(img => img.status === 'completed');
    if (completedImages.length === 0) {
      alert('No completed analyses to export');
      return;
    }

    const csvData = [
      ['Filename', 'Score', 'Quality', 'Reasons'].join(','),
      ...completedImages.map(img =>
        [
          img.file.name,
          img.result?.score || 0,
          img.result?.quality || 'N/A',
          `"${img.result?.reasons.join('; ') || ''}"`,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk-image-analysis-results.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredAndSortedImages = images
    .filter(img => {
      if (filter === 'all') return true;
      if (filter === 'good') return img.result?.quality === 'Good';
      if (filter === 'standard') return img.result?.quality === 'Standard';
      if (filter === 'bad') return img.result?.quality === 'Bad';
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'score') {
        const scoreA = a.result?.score || 0;
        const scoreB = b.result?.score || 0;
        return scoreB - scoreA;
      }
      return a.file.name.localeCompare(b.file.name);
    });

  const summary: AnalysisSummary = {
    total: images.length,
    good: images.filter(img => img.result?.quality === 'Good').length,
    standard: images.filter(img => img.result?.quality === 'Standard').length,
    bad: images.filter(img => img.result?.quality === 'Bad').length,
    averageScore:
      images.filter(img => img.result).length > 0
        ? Math.round(
            (images
              .filter(img => img.result)
              .reduce((sum, img) => sum + (img.result?.score || 0), 0) /
              images.filter(img => img.result).length) *
              10
          ) / 10
        : 0,
    completed: images.filter(img => img.status === 'completed').length,
  };

  return {
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
  };
};
