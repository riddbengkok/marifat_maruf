'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TestImageAnalysisPage() {
  const [testResult, setTestResult] = useState<string>('');

  const testAPI = async () => {
    try {
      // Create a simple test image (1x1 pixel)
      const canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Create a simple gradient
        const gradient = ctx.createLinearGradient(0, 0, 100, 100);
        gradient.addColorStop(0, '#ff0000');
        gradient.addColorStop(1, '#0000ff');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 100, 100);
      }

      const dataUrl = canvas.toDataURL('image/jpeg');

      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: dataUrl,
          method: 'local',
        }),
      });

      if (response.ok) {
        const result = await response.json();

        if (result.imageData) {
          // Test client-side local analysis
          try {
            const { analyzeImageLocalBrowser } = await import(
              '@/lib/image-analysis-browser'
            );
            const localAnalysis = await analyzeImageLocalBrowser(
              result.imageData
            );
            setTestResult(`✅ API Test Successful!

Score: ${localAnalysis.score}
Quality: ${localAnalysis.isGood ? 'Good' : 'Bad'}
Method: ${result.method}

Composition Analysis:
- Overall: ${localAnalysis.metrics.composition.overall}
- Rule of Thirds: ${localAnalysis.metrics.composition.ruleOfThirds}
- Golden Ratio: ${localAnalysis.metrics.composition.goldenRatio}
- Symmetry: ${localAnalysis.metrics.composition.symmetry}
- Leading Lines: ${localAnalysis.metrics.composition.leadingLines}
- Horizon Placement: ${localAnalysis.metrics.composition.horizonPlacement}

Reasons: ${localAnalysis.reasons.join(', ')}`);
          } catch (localError) {
            setTestResult(
              `⚠️ API Test Partially Successful (Server OK, Client Analysis Failed)\n\nError: ${localError instanceof Error ? localError.message : 'Unknown error'}`
            );
          }
        } else {
          setTestResult(
            `✅ API Test Successful!\n\nScore: ${result.score}\nQuality: ${result.isGood ? 'Good' : 'Bad'}\nMethod: ${result.method}\nReasons: ${result.reasons.join(', ')}`
          );
        }
      } else {
        const error = await response.json();
        setTestResult(`❌ API Test Failed: ${error.error}`);
      }
    } catch (error) {
      setTestResult(
        `❌ API Test Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Image Analysis API Test
          </h1>
          <p className="text-gray-600 mb-6">
            This page tests the image analysis API functionality
          </p>

          <div className="space-x-4">
            <button
              onClick={testAPI}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Test API
            </button>

            <Link
              href="/image-analysis"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-block"
            >
              Go to Full Page
            </Link>
          </div>
        </div>

        {testResult && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Test Results
            </h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {testResult}
            </pre>
          </div>
        )}

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            What This Tests
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li>• API endpoint availability</li>
            <li>• Image processing functionality</li>
            <li>• Response format validation</li>
            <li>• Error handling</li>
            <li>• Rate limiting (if applicable)</li>
            <li>• Client-side local analysis</li>
            <li>• Browser canvas compatibility</li>
          </ul>
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            New Architecture
          </h2>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• Server-side: Handles Vision API and image validation</p>
            <p>• Client-side: Handles local analysis using browser canvas</p>
            <p>• No server-side canvas dependency required</p>
            <p>• Better compatibility with different platforms</p>
            <p>• Privacy-focused local analysis</p>
          </div>
        </div>
      </div>
    </div>
  );
}
