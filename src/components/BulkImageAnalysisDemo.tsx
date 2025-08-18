'use client';

import { useBulkImageAnalysis } from '@/hooks/useBulkImageAnalysis';
import React from 'react';

// Demo component showing how to use the bulk image analysis hook
export const BulkImageAnalysisDemo: React.FC = () => {
  const {
    images,
    isAnalyzing,
    summary,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    startAnalysis,
    clearResults,
  } = useBulkImageAnalysis();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Bulk Image Analysis Demo</h2>

      {/* Simple upload area */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="demo-file-input"
        />
        <label
          htmlFor="demo-file-input"
          className="cursor-pointer text-blue-500 hover:text-blue-700"
        >
          Click to select images or drag and drop
        </label>
      </div>

      {/* Selected images count */}
      {images.length > 0 && (
        <div className="mb-4">
          <p>Selected images: {images.length}</p>
          <p>Completed analyses: {summary.completed}</p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={startAnalysis}
          disabled={images.length === 0 || isAnalyzing}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
        </button>

        <button
          onClick={clearResults}
          disabled={images.length === 0}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Clear All
        </button>
      </div>

      {/* Results summary */}
      {summary.completed > 0 && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-bold mb-2">Analysis Summary:</h3>
          <p>Total: {summary.total}</p>
          <p>Good: {summary.good}</p>
          <p>Bad: {summary.bad}</p>
          <p>Average Score: {summary.averageScore}</p>
        </div>
      )}
    </div>
  );
};
