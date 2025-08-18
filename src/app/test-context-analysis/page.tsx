'use client';

import { calculateContextAwareMetrics } from '@/lib/context-aware-metrics';
import { analyzeImageContext } from '@/lib/subject-detection';
import React, { useState } from 'react';

interface AnalysisResult {
  context: {
    isBlackAndWhite: boolean;
    isLowKey: boolean;
    isHighKey: boolean;
    isPortrait: boolean;
    hasBackgroundBlur: boolean;
    subjectRegion: {
      x: number;
      y: number;
      width: number;
      height: number;
      confidence: number;
      type: 'salient' | 'edge' | 'contrast';
    } | null;
  };
  metrics: {
    brightness: number;
    contrast: number;
    sharpness: number;
    colorBalance: number;
    noiseLevel: number;
  };
  originalImage: string;
}

export default function TestContextAnalysis() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setAnalysisResult(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    try {
      // Convert file to base64
      const base64 = await new Promise<string>(resolve => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result);
        };
        reader.readAsDataURL(selectedFile);
      });

      // Create image to get dimensions
      const img = new Image();
      const imageData = await new Promise<{
        width: number;
        height: number;
        data: Uint8ClampedArray;
      }>((resolve, reject) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          resolve({
            width: img.width,
            height: img.height,
            data: imageData.data,
          });
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = base64;
      });

      // Analyze context
      const context = analyzeImageContext(
        imageData.data,
        imageData.width,
        imageData.height
      );

      // Calculate context-aware metrics
      const metrics = calculateContextAwareMetrics(
        imageData.data,
        imageData.width,
        imageData.height,
        context
      );

      setAnalysisResult({
        context,
        metrics,
        originalImage: base64,
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Analysis failed: ' + error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Context-Aware Image Analysis Test
        </h1>

        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600"
          />
          <button
            onClick={analyzeImage}
            disabled={!selectedFile || isAnalyzing}
            className="mt-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-2 px-4 rounded-md hover:from-cyan-600 hover:to-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
          </button>
        </div>

        {analysisResult && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Original Image */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Original Image</h3>
              <img
                src={analysisResult.originalImage}
                alt="Original"
                className="w-full rounded-lg"
              />
            </div>

            {/* Analysis Results */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>

              {/* Context */}
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Image Context:</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    Black & White:{' '}
                    {analysisResult.context.isBlackAndWhite ? 'Yes' : 'No'}
                  </div>
                  <div>
                    Low Key: {analysisResult.context.isLowKey ? 'Yes' : 'No'}
                  </div>
                  <div>
                    High Key: {analysisResult.context.isHighKey ? 'Yes' : 'No'}
                  </div>
                  <div>
                    Portrait: {analysisResult.context.isPortrait ? 'Yes' : 'No'}
                  </div>
                  <div>
                    Background Blur:{' '}
                    {analysisResult.context.hasBackgroundBlur ? 'Yes' : 'No'}
                  </div>
                  <div>
                    Subject Detected:{' '}
                    {analysisResult.context.subjectRegion ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div>
                <h4 className="font-semibold mb-2">Context-Aware Metrics:</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    Brightness: {analysisResult.metrics.brightness.toFixed(1)}
                  </div>
                  <div>
                    Contrast: {analysisResult.metrics.contrast.toFixed(1)}
                  </div>
                  <div>
                    Sharpness: {analysisResult.metrics.sharpness.toFixed(1)}
                  </div>
                  <div>
                    Color Balance:{' '}
                    {analysisResult.metrics.colorBalance.toFixed(1)}
                  </div>
                  <div>
                    Noise Level: {analysisResult.metrics.noiseLevel.toFixed(1)}
                  </div>
                </div>
              </div>

              {/* Quality Assessment */}
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h4 className="font-semibold mb-2">Quality Assessment:</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-400">Quality Level:</span>
                    <span className="ml-2 font-semibold text-green-400">
                      {analysisResult.metrics.brightness >= 70 &&
                      analysisResult.metrics.contrast >= 70 &&
                      analysisResult.metrics.sharpness >= 70
                        ? 'Good'
                        : analysisResult.metrics.brightness >= 50 &&
                            analysisResult.metrics.contrast >= 50 &&
                            analysisResult.metrics.sharpness >= 50
                          ? 'Standard'
                          : 'Bad'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Score Range:</span>
                    <span className="ml-2">
                      {analysisResult.metrics.brightness >= 70 &&
                      analysisResult.metrics.contrast >= 70 &&
                      analysisResult.metrics.sharpness >= 70
                        ? '75-100 (Excellent)'
                        : analysisResult.metrics.brightness >= 50 &&
                            analysisResult.metrics.contrast >= 50 &&
                            analysisResult.metrics.sharpness >= 50
                          ? '50-74 (Good)'
                          : '0-49 (Needs Improvement)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
