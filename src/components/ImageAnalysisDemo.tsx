'use client';

import { useAuth } from '@/hooks/useAuth';
import type {
  FaceAnnotation,
  ImagePropertiesAnnotation,
  LabelAnnotation,
  SafeSearchAnnotation,
  TextAnnotation,
} from '@/lib/api-types';
import React, { useEffect, useState } from 'react';

// Human-readable labels for SafeSearch keys
const SAFE_SEARCH_LABELS: Record<string, string> = {
  adult: 'Adult Content',
  violence: 'Violence',
  racy: 'Racy Content',
  medical: 'Medical Content',
  spoof: 'Spoof (Fake/Manipulated)',
};

interface AnalysisResult {
  isGood: boolean;
  score: number;
  method: 'local' | 'vision';
  analysis: {
    isGood: boolean;
    score: number;
    metrics?: {
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
    features?: {
      safeSearch: unknown;
      labelDetection: unknown[];
      faceDetection: unknown[];
      textDetection: unknown[];
      imageProperties: unknown;
    };
    reasons: string[];
  };
  reasons: string[];
}

export const ImageAnalysisDemo: React.FC = () => {
  const { user } = useAuth();
  const [anonUsed, setAnonUsed] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisMethod, setAnalysisMethod] = useState<'local' | 'vision'>(
    'local'
  );
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const FREE_LIMIT = 10;

  useEffect(() => {
    const used = parseInt(
      localStorage.getItem('anonImageAnalysisCount') || '0',
      10
    );
    setAnonUsed(Number.isFinite(used) ? used : 0);
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setError(null);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setError('Please select a valid image file');
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    // Enforce non-login quota
    if (!user) {
      const used =
        parseInt(localStorage.getItem('anonImageAnalysisCount') || '0', 10) ||
        0;
      if (used >= FREE_LIMIT) {
        setError('Free limit reached (10). Sign in to continue.');
        return;
      }
      localStorage.setItem('anonImageAnalysisCount', String(used + 1));
      setAnonUsed(used + 1);
    }

    setLoading(true);
    setError(null);

    try {
      // Import browser utilities
      const { fileToBase64 } = await import('@/lib/browser-utils');

      // Convert file to base64
      const base64 = await fileToBase64(selectedFile);

      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64,
          method: analysisMethod,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const data = await response.json();

      // If it's local analysis and we have imageData, process it client-side
      if (data.method === 'local' && data.imageData) {
        try {
          console.log(
            'Starting local analysis with imageData length:',
            data.imageData.length
          );

          // Import the browser-based analysis function
          const { analyzeImageLocalBrowser } = await import(
            '@/lib/image-analysis-browser'
          );

          // Pass the base64 image data directly
          const localAnalysis = await analyzeImageLocalBrowser(data.imageData);

          console.log('Local analysis completed:', localAnalysis);

          // Update the result with the actual analysis, preserving the shape expected by the UI
          setResult({
            isGood: localAnalysis.isGood,
            score: localAnalysis.score,
            method: 'local',
            analysis: {
              isGood: localAnalysis.isGood,
              score: localAnalysis.score,
              metrics: localAnalysis.metrics,
              reasons: localAnalysis.reasons,
            },
            reasons: localAnalysis.reasons,
          });
        } catch (localError) {
          console.error('Local analysis error:', localError);
          console.error('Error details:', {
            message:
              localError instanceof Error
                ? localError.message
                : 'Unknown error',
            stack: localError instanceof Error ? localError.stack : 'No stack',
            imageDataLength: data.imageData?.length,
          });
          setError(
            `Local analysis failed: ${localError instanceof Error ? localError.message : 'Unknown error'}. Please try Vision API instead.`
          );
        }
      } else {
        setResult(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Image Analysis Tool
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Upload an image to analyze its quality using local analysis or Google
          Vision API
        </p>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Select Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30"
            />
          </div>

          {previewUrl && (
            <div className="flex justify-center">
              <img
                src={previewUrl}
                alt="Selected preview"
                className="w-1/2 h-64 rounded-lg border border-gray-700/50 shadow-md object-contain bg-black/20"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Analysis Method
            </label>
            <select
              value={analysisMethod}
              onChange={e => {
                const value = e.target.value as 'local' | 'vision';
                console.log('Analysis method changed to:', value);
                setAnalysisMethod(value);
              }}
              className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 bg-gray-700 text-gray-200"
            >
              <option value="local">Local Analysis (Canvas) - Free</option>
              <option value="vision">Google Vision API - Advanced</option>
            </select>
          </div>

          {!user && (
            <div className="text-xs text-gray-400 text-center">
              Free analyses left: {Math.max(0, FREE_LIMIT - anonUsed)}/
              {FREE_LIMIT}. Sign in for more.
            </div>
          )}

          <button
            onClick={analyzeImage}
            disabled={!selectedFile || loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 px-6 rounded-md hover:from-cyan-600 hover:to-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 font-semibold"
          >
            {loading ? 'Analyzing...' : 'Analyze Image'}
          </button>

          {error && (
            <div className="bg-red-900/50 border border-red-500/50 rounded-md p-4">
              <p className="text-red-300">{error}</p>
            </div>
          )}
        </div>
      </div>

      {result && (
        <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8">
          {/* Only show these for local analysis */}
          {result.method === 'local' && (
            <>
              <h2 className="text-2xl font-semibold text-white mb-6">
                Analysis Results
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">
                    Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                      <span className="text-gray-300">
                        Stock Photo Quality:
                      </span>
                      <span
                        className={`font-semibold px-3 py-1 rounded-full text-sm ${
                          result.isGood
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {result.isGood
                          ? 'Acceptable for Stock'
                          : 'Needs Improvement'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                      <span className="text-gray-300">Professional Score:</span>
                      <span className="font-semibold text-white">
                        {result.score}/100
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                      <span className="text-gray-300">Analysis Method:</span>
                      <span className="font-semibold text-cyan-400 capitalize">
                        {result.method}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-4 mt-4">
                      Reasons
                    </h3>
                    <ul className="space-y-2">
                      {result.reasons.map((reason, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-300 flex items-start p-2 bg-gray-700/30 rounded-lg"
                        >
                          <span className="text-cyan-400 mr-2">•</span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-4">
                    Stock Photo Assessment
                  </h3>
                  <div className="space-y-4">
                    {result.method === 'local' && result.analysis.metrics && (
                      <>
                        {/* Stock Photo Quality Assessment */}
                        <div className="p-4 bg-gray-700/30 rounded-lg border-l-4 border-cyan-500">
                          <h4 className="text-cyan-400 font-semibold mb-2">
                            Stock Photo Standards
                          </h4>
                          <div className="space-y-2 text-sm text-gray-300">
                            {result.score >= 80 && (
                              <div className="flex items-center">
                                <span className="text-green-400 mr-2">✓</span>
                                <span>
                                  Excellent quality - Ready for premium stock
                                  sites
                                </span>
                              </div>
                            )}
                            {result.score >= 70 && result.score < 80 && (
                              <div className="flex items-center">
                                <span className="text-yellow-400 mr-2">⚠</span>
                                <span>
                                  Good quality - Acceptable for standard stock
                                  sites
                                </span>
                              </div>
                            )}
                            {result.score >= 60 && result.score < 70 && (
                              <div className="flex items-center">
                                <span className="text-orange-400 mr-2">⚠</span>
                                <span>
                                  Acceptable quality - May need minor
                                  improvements
                                </span>
                              </div>
                            )}
                            {result.score < 60 && (
                              <div className="flex items-center">
                                <span className="text-red-400 mr-2">✗</span>
                                <span>
                                  Below stock standards - Significant
                                  improvements needed
                                </span>
                              </div>
                            )}

                            {/* Basic Quality Assessment */}

                            <div className="mt-3 bg-gray-800/50 rounded text-xs text-gray-400">
                              <span className="text-yellow-400 mr-2">ⓘ</span>
                              <strong>Stock Requirements:</strong> Sharpness
                              ≥50, Color Balance ≥60, Brightness 30-80, Contrast
                              ≥20
                            </div>

                            {/* Composition Assessment */}
                            {result.analysis.metrics.composition && (
                              <div className=" bg-gray-800/50 rounded text-xs text-gray-400">
                                <span className="text-yellow-400 mr-2">ⓘ</span>
                                <strong>Stock Standards:</strong> Overall ≥60,
                                Rule of Thirds ≥50, Golden Ratio ≥40, Symmetry
                                ≥30
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Stock Photo Recommendations */}
                        <div className="p-4 bg-gray-700/30 rounded-lg border-l-4 border-green-500">
                          <h4 className="text-green-400 font-semibold mb-2">
                            Stock Photo Recommendations
                          </h4>
                          <div className="space-y-2 text-sm text-gray-300">
                            {result.score >= 80 && (
                              <>
                                <div className="flex items-start">
                                  <span className="text-green-400 mr-2 mt-1">
                                    ✓
                                  </span>
                                  <span>
                                    Premium stock sites: Shutterstock, iStock,
                                    Adobe Stock
                                  </span>
                                </div>
                                <div className="flex items-start">
                                  <span className="text-green-400 mr-2 mt-1">
                                    ✓
                                  </span>
                                  <span>High commercial value potential</span>
                                </div>
                              </>
                            )}
                            {result.score >= 70 && result.score < 80 && (
                              <>
                                <div className="flex items-start">
                                  <span className="text-yellow-400 mr-2 mt-1">
                                    ⚠
                                  </span>
                                  <span>
                                    Standard stock sites: Shutterstock,
                                    Dreamstime
                                  </span>
                                </div>
                                <div className="flex items-start">
                                  <span className="text-yellow-400 mr-2 mt-1">
                                    ⚠
                                  </span>
                                  <span>
                                    Consider minor adjustments for better
                                    acceptance
                                  </span>
                                </div>
                              </>
                            )}
                            {result.score >= 60 && result.score < 70 && (
                              <>
                                <div className="flex items-start">
                                  <span className="text-orange-400 mr-2 mt-1">
                                    ⚠
                                  </span>
                                  <span>
                                    Microstock sites: Pixabay, Unsplash
                                  </span>
                                </div>
                                <div className="flex items-start">
                                  <span className="text-orange-400 mr-2 mt-1">
                                    ⚠
                                  </span>
                                  <span>
                                    Improve quality before submitting to premium
                                    sites
                                  </span>
                                </div>
                              </>
                            )}
                            {result.score < 60 && (
                              <>
                                <div className="flex items-start">
                                  <span className="text-red-400 mr-2 mt-1">
                                    ✗
                                  </span>
                                  <span>
                                    Not suitable for commercial stock sites
                                  </span>
                                </div>
                                <div className="flex items-start">
                                  <span className="text-red-400 mr-2 mt-1">
                                    ✗
                                  </span>
                                  <span>
                                    Significant improvements needed for stock
                                    acceptance
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {/* <div></div> */}
              </div>

              {result.method === 'local' && result.analysis.metrics && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-white mb-6">
                    Detailed Metrics
                  </h3>

                  {/* Basic Metrics */}
                  <div className="mb-8">
                    <h4 className="text-lg font-medium text-gray-200 mb-4">
                      Basic Quality
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(result.analysis.metrics).map(
                        ([key, value]) => {
                          if (key === 'composition') return null; // Skip composition, handled separately
                          const label = key.replace(/([A-Z])/g, ' $1').trim();
                          const numeric =
                            typeof value === 'number' ? value : Number(value);
                          const formatted = Number.isFinite(numeric)
                            ? Math.round(numeric * 10) / 10
                            : 0;
                          return (
                            <div
                              key={key}
                              className="rounded-lg border border-gray-600 bg-gray-700/50 p-4 shadow-sm flex flex-col items-center justify-center hover:border-cyan-500/50 transition-all duration-300"
                            >
                              <div className="text-xs uppercase tracking-wide text-gray-400 mb-2 text-center truncate w-full">
                                {label}
                              </div>
                              <div className="text-3xl font-extrabold text-cyan-400 leading-none">
                                {formatted}
                              </div>
                              <div className="mt-2 text-[11px] leading-snug text-gray-400 text-center">
                                {getMetricExplanation(key, numeric)}
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* Composition Metrics */}
                  {result.analysis.metrics.composition && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-200 mb-4">
                        Composition Analysis
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {(
                          [
                            [
                              'Overall',
                              result.analysis.metrics.composition.overall,
                              'text-purple-400',
                              'overall',
                            ],
                            [
                              'Rule of Thirds',
                              result.analysis.metrics.composition.ruleOfThirds,
                              'text-green-400',
                              'thirds',
                            ],
                            [
                              'Golden Ratio',
                              result.analysis.metrics.composition.goldenRatio,
                              'text-yellow-400',
                              'golden',
                            ],
                            [
                              'Symmetry',
                              result.analysis.metrics.composition.symmetry,
                              'text-indigo-400',
                              'symmetry',
                            ],
                            [
                              'Leading Lines',
                              result.analysis.metrics.composition.leadingLines,
                              'text-orange-400',
                              'lines',
                            ],
                            [
                              'Horizon',
                              result.analysis.metrics.composition
                                .horizonPlacement,
                              'text-red-400',
                              'horizon',
                            ],
                          ] as Array<
                            [
                              string,
                              number,
                              string,
                              (
                                | 'overall'
                                | 'thirds'
                                | 'golden'
                                | 'symmetry'
                                | 'lines'
                                | 'horizon'
                              ),
                            ]
                          >
                        ).map(([title, value, color, illo], idx) => (
                          <div
                            key={idx}
                            className="rounded-lg border border-gray-600 bg-gray-700/50 p-4 shadow-sm flex flex-col items-center justify-center hover:border-purple-500/50 transition-all duration-300"
                          >
                            <div className="text-xs uppercase tracking-wide text-gray-400 mb-2 text-center truncate w-full">
                              {title}
                            </div>
                            <div
                              className={`text-3xl font-extrabold leading-none ${color}`}
                            >
                              {Math.round(value * 10) / 10}
                            </div>
                            {illo && <CompositionIllustration type={illo} />}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Vision API Features section remains always visible */}
          {result.method === 'vision' && result.analysis.features && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-6">
                Vision API Features
              </h3>
              <div className="space-y-6">
                <>
                  {/* SafeSearch Section */}
                  {result.analysis.features.safeSearch ? (
                    <div className="bg-gray-700/50 rounded-lg p-4 mb-3">
                      <h4 className="font-medium text-white mb-3">
                        SafeSearch
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {Object.entries(
                          result.analysis.features
                            .safeSearch as SafeSearchAnnotation
                        ).map(([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center space-x-2"
                          >
                            <span className="text-gray-300 capitalize w-32">
                              {SAFE_SEARCH_LABELS[key] || key}
                            </span>
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold ${
                                value === 'VERY_UNLIKELY'
                                  ? 'bg-green-500/20 text-green-400'
                                  : value === 'UNLIKELY'
                                    ? 'bg-yellow-500/20 text-yellow-400'
                                    : value === 'POSSIBLE'
                                      ? 'bg-orange-500/20 text-orange-400'
                                      : value === 'LIKELY' ||
                                          value === 'VERY_LIKELY'
                                        ? 'bg-red-500/20 text-red-400'
                                        : 'bg-gray-600/30 text-gray-300'
                              }`}
                            >
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <h4 className="font-medium text-white mb-3">
                        SafeSearch
                      </h4>
                      <p className="text-gray-300">
                        No SafeSearch results available.
                      </p>
                    </div>
                  )}

                  {/* Label Detection Section */}
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    {(
                      result.analysis.features
                        .labelDetection as LabelAnnotation[]
                    )
                      .slice(0, 5)
                      .map((label, index) => (
                        <strong
                          key={index}
                          className="bg-cyan-500/20 text-cyan-300 text-md px-3 py-1 rounded-full border border-cyan-500/30 m-2"
                        >
                          {label.description}
                          {label.score !== undefined && (
                            <strong className="ml-1 text-white">
                              ({(label.score * 100).toFixed(0)}%)
                            </strong>
                          )}
                        </strong>
                      ))}
                  </div>
                  {/* Face Detection Section */}
                  {result.analysis.features.faceDetection &&
                    (result.analysis.features.faceDetection as FaceAnnotation[])
                      .length > 0 && (
                      <div className="bg-gray-700/50 rounded-lg p-4">
                        <h4 className="font-medium text-white mb-2">
                          Faces Detected:
                        </h4>
                        <span className="text-sm text-gray-300">
                          {
                            (
                              result.analysis.features
                                .faceDetection as FaceAnnotation[]
                            ).length
                          }{' '}
                          face(s)
                        </span>
                      </div>
                    )}

                  {/* Text Detection Section */}
                  {result.analysis.features.textDetection &&
                    (result.analysis.features.textDetection as TextAnnotation[])
                      .length > 0 && (
                      <div className="bg-gray-700/50 rounded-lg p-4">
                        <h4 className="font-medium text-white mb-2">
                          Detected Text:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(
                            result.analysis.features
                              .textDetection as TextAnnotation[]
                          )
                            .map(text => text.description)
                            .filter(
                              (desc): desc is string =>
                                !!desc && desc.trim().length > 0
                            )
                            .slice(0, 5)
                            .map((desc, idx) => (
                              <span
                                key={idx}
                                className="bg-purple-500/20 text-purple-300 text-xs px-3 py-1 rounded-full border border-purple-500/30"
                              >
                                {desc}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}

                  {/* Image Properties Section (Dominant Colors) */}
                  {result.analysis.features.imageProperties &&
                    (
                      result.analysis.features
                        .imageProperties as ImagePropertiesAnnotation
                    ).dominantColors && (
                      <div className="bg-gray-700/50 rounded-lg p-4">
                        <h4 className="font-medium text-white mb-2">
                          Dominant Colors:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(
                            (
                              result.analysis.features
                                .imageProperties as ImagePropertiesAnnotation
                            ).dominantColors?.colors || []
                          )
                            .slice(0, 8)
                            .map((colorObj, idx) => {
                              const c = colorObj.color || {};
                              const rgb = `rgb(${c.red || 0},${c.green || 0},${c.blue || 0})`;
                              return (
                                <span
                                  key={idx}
                                  className="inline-block w-8 h-8 rounded border border-gray-600 shadow"
                                  style={{ backgroundColor: rgb }}
                                  title={`R:${c.red} G:${c.green} B:${c.blue}`}
                                ></span>
                              );
                            })}
                        </div>
                      </div>
                    )}
                </>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CompositionIllustration: React.FC<{
  type: 'overall' | 'thirds' | 'golden' | 'symmetry' | 'lines' | 'horizon';
}> = ({ type }) => (
  <svg viewBox="0 0 100 60" className="mt-2 w-full h-12 text-gray-500/70">
    <rect
      x="1"
      y="1"
      width="98"
      height="58"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.5"
    />
    {type === 'thirds' && (
      <>
        <line
          x1="33.33"
          y1="0"
          x2="33.33"
          y2="60"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line
          x1="66.66"
          y1="0"
          x2="66.66"
          y2="60"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="20"
          x2="100"
          y2="20"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="40"
          x2="100"
          y2="40"
          stroke="currentColor"
          strokeWidth="1"
        />
      </>
    )}
    {type === 'golden' && (
      <>
        <line
          x1="61.8"
          y1="0"
          x2="61.8"
          y2="60"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line
          x1="61.8"
          y1="37.1"
          x2="100"
          y2="37.1"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M61.8,37.1 q0,-37.1 38.2,-37.1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.6"
        />
      </>
    )}
    {type === 'symmetry' && (
      <line
        x1="50"
        y1="0"
        x2="50"
        y2="60"
        stroke="currentColor"
        strokeWidth="2"
      />
    )}
    {type === 'lines' && (
      <>
        <line
          x1="0"
          y1="60"
          x2="45"
          y2="30"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="100"
          y1="60"
          x2="55"
          y2="30"
          stroke="currentColor"
          strokeWidth="2"
        />
      </>
    )}
    {type === 'horizon' && (
      <line
        x1="0"
        y1="20"
        x2="100"
        y2="20"
        stroke="currentColor"
        strokeWidth="2"
      />
    )}
  </svg>
);

const getMetricExplanation = (key: string, value: number): string => {
  switch (key) {
    case 'brightness':
      if (value < 30) return 'Underexposed: increase exposure or lift shadows.';
      if (value < 45) return 'Slightly dark: raise exposure by ~0.3–0.7 EV.';
      if (value <= 65) return 'Midtones balanced: exposure looks good.';
      if (value <= 80) return 'Slightly bright: lower highlights/whites.';
      return 'Overexposed/clipped highlights: reduce exposure/highlights.';
    case 'contrast':
      if (value < 20)
        return 'Flat contrast: add contrast/clarity or deepen blacks.';
      if (value < 40) return 'Moderate contrast: you can add a little more.';
      if (value <= 70) return 'Good contrast: punchy without being harsh.';
      return 'High contrast: watch for crushed shadows/clipped highlights.';
    case 'sharpness':
      if (value < 40)
        return 'Soft/blurry: use faster shutter/tripod; add capture sharpening.';
      if (value < 60)
        return 'Adequate sharpness: add a bit of detail sharpening.';
      if (value <= 80) return 'Sharp: good micro‑contrast.';
      return 'Very sharp: avoid halos/over‑sharpening.';
    case 'colorBalance':
      if (value < 50)
        return 'Color cast or low saturation: fix white balance/tint, add vibrance.';
      if (value < 70) return 'Colors okay: minor WB/tint tweaks.';
      if (value <= 85) return 'Natural and balanced color.';
      return 'Very saturated: ensure it is not oversaturated or clipping.';
    default:
      return '';
  }
};
