'use client';

import { useBulkImageAnalysis } from '@/hooks/useBulkImageAnalysis';
import React from 'react';
import { ImageContextIndicator } from './ImageContextIndicator';

export const BulkImageAnalysis: React.FC = () => {
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
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Bulk Image Analysis
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Upload multiple images to analyze their quality for stock photo
          assessment
        </p>
      </div>

      {/* Upload Area */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
        <div
          className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center hover:border-cyan-500/50 transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="space-y-4">
            <div className="text-6xl text-gray-400">📁</div>
            <h3 className="text-xl font-semibold text-white">
              Drop images here or click to select
            </h3>
            <p className="text-gray-400">
              Supports JPG, PNG, WebP, GIF (max 10MB each)
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="bulk-file-input"
            />
            <label
              htmlFor="bulk-file-input"
              className="inline-block bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 px-6 rounded-md hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 font-semibold cursor-pointer"
            >
              Select Images
            </label>
          </div>
        </div>

        {/* Selected Files */}
        {images.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-medium text-white mb-4">
              Selected Files ({images.length})
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {images.map(img => (
                <div key={img.id} className="relative group">
                  <img
                    src={img.previewUrl}
                    alt={img.file.name}
                    className="w-full h-24 object-cover rounded-lg border border-gray-600"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <button
                      onClick={() => removeImage(img.id)}
                      className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="mt-1 text-xs text-gray-400 truncate">
                    {img.file.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Analysis Controls */}
      {images.length > 0 && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Analysis Method
                </label>
                <select
                  value={analysisMethod}
                  onChange={e =>
                    setAnalysisMethod(e.target.value as 'local' | 'vision')
                  }
                  className="px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                >
                  <option value="local">Local Analysis (Free)</option>
                  <option value="vision">Vision API (Advanced)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Batch Size
                </label>
                <select
                  value={batchSize}
                  onChange={e => setBatchSize(Number(e.target.value))}
                  className="px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                >
                  <option value={3}>3 images</option>
                  <option value={5}>5 images</option>
                  <option value={10}>10 images</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              {!user && (
                <div className="text-xs text-gray-400 text-center">
                  Free analyses left: {Math.max(0, FREE_LIMIT - anonUsed)}/
                  {FREE_LIMIT}
                </div>
              )}

              {isAnalyzing ? (
                <button
                  onClick={stopAnalysis}
                  className="bg-red-500 text-white py-3 px-6 rounded-md hover:bg-red-600 transition-all duration-300 font-semibold"
                >
                  Stop Analysis
                </button>
              ) : (
                <button
                  onClick={startAnalysis}
                  disabled={
                    images.filter(img => img.status === 'pending').length === 0
                  }
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 px-6 rounded-md hover:from-cyan-600 hover:to-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 font-semibold"
                >
                  Start Analysis
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Results Summary */}
      {summary.completed > 0 && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Analysis Summary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {summary.total}
                  </div>
                  <div className="text-sm text-gray-400">Total Images</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {summary.good}
                  </div>
                  <div className="text-sm text-gray-400">Good Quality</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    {summary.standard}
                  </div>
                  <div className="text-sm text-gray-400">Standard Quality</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {summary.bad}
                  </div>
                  <div className="text-sm text-gray-400">Needs Improvement</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">
                    {summary.averageScore}
                  </div>
                  <div className="text-sm text-gray-400">Avg Score</div>
                </div>
              </div>
            </div>

            <button
              onClick={exportResults}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-all duration-300 font-semibold"
            >
              Export Results
            </button>
          </div>
        </div>
      )}

      {/* Results Grid */}
      {filteredAndSortedImages.length > 0 && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="text-xl font-semibold text-white">
              Analysis Results
            </h3>

            <div className="flex gap-4">
              <select
                value={filter}
                onChange={e =>
                  setFilter(
                    e.target.value as 'all' | 'good' | 'standard' | 'bad'
                  )
                }
                className="px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              >
                <option value="all">All Results</option>
                <option value="good">Good Only</option>
                <option value="standard">Standard Only</option>
                <option value="bad">Bad Only</option>
              </select>

              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as 'score' | 'name')}
                className="px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
              >
                <option value="score">Sort by Score</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedImages.map(img => (
              <div
                key={img.id}
                className={`bg-gray-700/50 rounded-lg p-4 border transition-all duration-300 ${
                  img.status === 'completed'
                    ? img.result?.quality === 'Good'
                      ? 'border-green-500/50'
                      : img.result?.quality === 'Standard'
                        ? 'border-yellow-500/50'
                        : 'border-red-500/50'
                    : 'border-gray-600'
                } ${img.result?.isNight ? 'ring-2 ring-blue-400 border-blue-400/70' : ''}`}
              >
                {/* Night badge */}
                {img.result?.isNight && (
                  <div className="absolute top-2 right-2 z-10">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-400/30">
                      <span role="img" aria-label="night">
                        {/* 🌙 */}
                      </span>
                      Night Photo
                    </span>
                  </div>
                )}
                <div className="relative mb-3">
                  <img
                    src={img.previewUrl}
                    alt={img.file.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  {img.status === 'analyzing' && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
                    </div>
                  )}
                  {img.status === 'error' && (
                    <div className="absolute inset-0 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-red-400 text-sm">Error</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-white truncate">
                    {img.file.name}
                  </div>

                  {/* Context Indicator */}
                  {img.status === 'completed' && img.result?.context && (
                    <ImageContextIndicator context={img.result.context} />
                  )}

                  {img.status === 'completed' && img.result && (
                    <>
                      {/* Error handling for metrics */}
                      {(!img.result.metrics ||
                        (img.result.metrics.brightness === 0 &&
                          img.result.metrics.contrast === 0 &&
                          img.result.metrics.sharpness === 0 &&
                          img.result.metrics.colorBalance === 0)) && (
                        <div className="mb-2 p-2 bg-red-900/60 text-red-300 text-xs rounded">
                          ⚠️ Analysis failed or image data could not be read.
                          <br />
                          Please check your image file, try a different image,
                          or see browser console for details.
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Score:</span>
                        <span
                          className={`font-semibold ${
                            img.result.score >= 80
                              ? 'text-green-400'
                              : img.result.score >= 60
                                ? 'text-yellow-400'
                                : 'text-red-400'
                          }`}
                        >
                          {img.result.score}/100
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Quality:</span>
                        <div className="flex items-center gap-2">
                          {img.result.isNight && (
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400">
                              Night
                            </span>
                          )}
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              img.result.quality === 'Good'
                                ? 'bg-green-500/20 text-green-400'
                                : img.result.quality === 'Standard'
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : 'bg-red-500/20 text-red-400'
                            }`}
                          >
                            {img.result.quality}
                          </span>
                        </div>
                      </div>

                      {/* Detailed Metrics */}
                      <div className="mt-3 pt-3 border-t border-gray-600">
                        <div className="text-xs text-gray-400 mb-2">
                          Technical Metrics:
                        </div>

                        {/* Basic Metrics */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Brightness:</span>
                            <span
                              className={
                                img.result.isNight
                                  ? (img.result.metrics?.brightness || 0) >=
                                      20 &&
                                    (img.result.metrics?.brightness || 0) <= 90
                                    ? 'text-green-400'
                                    : 'text-red-400'
                                  : (img.result.metrics?.brightness || 0) >=
                                        30 &&
                                      (img.result.metrics?.brightness || 0) <=
                                        80
                                    ? 'text-green-400'
                                    : 'text-red-400'
                              }
                            >
                              {img.result.metrics?.brightness || 0}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Contrast:</span>
                            <span
                              className={
                                img.result.isNight
                                  ? (img.result.metrics?.contrast || 0) >= 15
                                    ? 'text-green-400'
                                    : 'text-red-400'
                                  : (img.result.metrics?.contrast || 0) >= 20
                                    ? 'text-green-400'
                                    : 'text-red-400'
                              }
                            >
                              {img.result.metrics?.contrast || 0}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Sharpness:</span>
                            <span
                              className={
                                img.result.isNight
                                  ? (img.result.metrics?.sharpness ?? 0) >= 25
                                    ? 'text-green-400'
                                    : 'text-red-400'
                                  : (img.result.metrics?.sharpness ?? 0) >= 40
                                    ? 'text-green-400'
                                    : 'text-red-400'
                              }
                            >
                              {img.result.metrics?.sharpness.toFixed(1) || 0}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">
                              Color Balance:
                            </span>
                            <span
                              className={
                                img.result.isNight
                                  ? (img.result.metrics?.colorBalance || 0) >=
                                    40
                                    ? 'text-green-400'
                                    : 'text-red-400'
                                  : (img.result.metrics?.colorBalance || 0) >=
                                      50
                                    ? 'text-green-400'
                                    : 'text-red-400'
                              }
                            >
                              {img.result.metrics?.colorBalance || 0}
                            </span>
                          </div>
                        </div>

                        {/* New Metrics */}
                        <div className="mt-2 pt-2 border-t border-gray-700">
                          <div className="text-xs text-gray-400 mb-2">
                            Advanced Metrics:
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-gray-400">
                                Noise Level:
                              </span>
                              <span
                                className={
                                  (img.result.metrics?.noiseLevel || 0) >= 70
                                    ? 'text-green-400'
                                    : 'text-red-400'
                                }
                              >
                                {img.result.metrics?.noiseLevel !== undefined
                                  ? img.result.metrics.noiseLevel.toFixed(1)
                                  : 0}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">
                                Subject Center:
                              </span>
                              <span
                                className={
                                  (img.result.metrics?.composition
                                    ?.subjectCentering || 0) >= 60
                                    ? 'text-green-400'
                                    : 'text-red-400'
                                }
                              >
                                {img.result.metrics?.composition
                                  ?.subjectCentering !== undefined
                                  ? img.result.metrics?.composition?.subjectCentering.toFixed(
                                      1
                                    )
                                  : 0}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">
                                Horizon Tilt:
                              </span>
                              <span
                                className={
                                  (img.result.metrics?.composition
                                    ?.horizonTilt || 0) >= 70
                                    ? 'text-green-400'
                                    : 'text-red-400'
                                }
                              >
                                {img.result.metrics?.composition?.horizonTilt ||
                                  0}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">
                                Composition:
                              </span>
                              <span
                                className={
                                  (img.result.metrics?.composition?.overall ||
                                    0) >= 60
                                    ? 'text-green-400'
                                    : 'text-red-400'
                                }
                              >
                                {img.result.metrics?.composition?.overall || 0}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {img.status === 'error' && img.error && (
                    <div className="text-sm text-red-400">{img.error}</div>
                  )}

                  {img.status === 'pending' && (
                    <div className="text-sm text-gray-400">
                      Pending analysis
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Clear Results Button */}
      {images.length > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={clearResults}
            className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-all duration-300 font-semibold"
          >
            Clear All Results
          </button>
        </div>
      )}
    </div>
  );
};
