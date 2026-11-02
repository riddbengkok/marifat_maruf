'use client';

import { useBulkImageAnalysis } from '@/hooks/useBulkImageAnalysis';
import { getSupportedFileTypes } from '@/lib/heic-converter';
import React from 'react';
import { ImageContextIndicator } from './ImageContextIndicator';

export const BulkImageAnalysis: React.FC = () => {
  const {
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
    convertingFiles,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    removeImage,
    startAnalysis,
    stopAnalysis,
    clearResults,
    exportResults,
    setAnalysisMethod,
    setBatchSize,
    setFilter,
    setSortBy,
  } = useBulkImageAnalysis();

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="ui-eyebrow">BATCH WORKSPACE</p>
          <p className="mt-2 max-w-3xl text-sm text-slate-400">
            Add images, choose an analysis method, then review and export
            results.
          </p>
        </div>
        {images.length > 0 && (
          <span className="text-sm text-slate-400">
            {images.length} {images.length === 1 ? 'image' : 'images'} selected
          </span>
        )}
      </div>

      <section className="ui-card mb-6 p-5 sm:p-8" aria-label="Upload images">
        <div
          className="ui-card-muted rounded-lg border-dashed p-6 text-center transition-colors sm:p-10"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-slate-100">
              Drop images here or choose files
            </h2>
            <p className="text-sm text-slate-400">
              JPG, PNG, WebP, GIF, and HEIC files (converted for analysis)
            </p>
            {convertingFiles && (
              <p
                className="text-sm text-emerald-300"
                role="status"
                aria-live="polite"
              >
                Converting HEIC files...
              </p>
            )}
            <input
              type="file"
              multiple
              accept={getSupportedFileTypes()}
              onChange={handleFileSelect}
              className="sr-only"
              id="bulk-file-input"
            />
            <label
              htmlFor="bulk-file-input"
              className="btn btn-primary inline-flex min-h-11 cursor-pointer items-center justify-center px-5"
            >
              Choose images
            </label>
          </div>
        </div>

        {images.length > 0 && (
          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="text-sm font-medium text-slate-200">
                Selected files
              </h3>
              <button
                type="button"
                onClick={clearResults}
                disabled={isAnalyzing}
                className="btn btn-ghost btn-sm"
              >
                Clear all
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {images.map(img => (
                <div key={img.id} className="group relative min-w-0">
                  <img
                    src={img.previewUrl}
                    alt={img.originalName || img.file.name}
                    className="h-24 w-full rounded-lg border border-white/10 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/60 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      aria-label={`Remove ${img.originalName || img.file.name}`}
                      className="btn btn-secondary btn-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="mt-2 truncate text-xs text-slate-400">
                    {img.originalName || img.file.name}
                  </div>
                  <div className="mt-1 text-xs capitalize text-slate-500">
                    {img.status === 'analyzing' ? 'Analyzing' : img.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {images.length > 0 && (
        <section
          className="ui-card mb-6 p-5 sm:p-6"
          aria-label="Analysis controls"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-xl">
              <div>
                <label className="ui-label" htmlFor="bulk-analysis-method">
                  Analysis method
                </label>
                <select
                  id="bulk-analysis-method"
                  value={analysisMethod}
                  onChange={e =>
                    setAnalysisMethod(e.target.value as 'local' | 'vision')
                  }
                  className="ui-field"
                >
                  <option value="local">Local analysis (Free)</option>
                  <option value="vision">Vision API (Advanced)</option>
                </select>
              </div>
              <div>
                <label className="ui-label" htmlFor="bulk-batch-size">
                  Batch size
                </label>
                <select
                  id="bulk-batch-size"
                  value={batchSize}
                  onChange={e => setBatchSize(Number(e.target.value))}
                  className="ui-field"
                >
                  <option value={3}>3 images</option>
                  <option value={5}>5 images</option>
                  <option value={10}>10 images</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {!user && (
                <span className="text-xs text-slate-400">
                  Free analyses: {Math.max(0, FREE_LIMIT - anonUsed)} /{' '}
                  {FREE_LIMIT}
                </span>
              )}
              {isAnalyzing ? (
                <button
                  type="button"
                  onClick={stopAnalysis}
                  className="btn btn-danger"
                >
                  Stop analysis
                </button>
              ) : (
                <button
                  type="button"
                  onClick={startAnalysis}
                  disabled={
                    images.filter(img => img.status === 'pending').length === 0
                  }
                  className="btn btn-primary"
                >
                  Start analysis
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {summary.completed > 0 && (
        <section className="ui-card mb-6 p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="ui-eyebrow">COMPLETED BATCH</p>
              <h2 className="mt-2 text-lg font-semibold text-slate-100">
                Analysis summary
              </h2>
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                <SummaryMetric label="Total images" value={summary.total} />
                <SummaryMetric
                  label="Good quality"
                  value={summary.good}
                  tone="good"
                />
                <SummaryMetric
                  label="Standard quality"
                  value={summary.standard}
                  tone="standard"
                />
                <SummaryMetric
                  label="Needs improvement"
                  value={summary.bad}
                  tone="bad"
                />
                <SummaryMetric
                  label="Average score"
                  value={summary.averageScore}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={exportResults}
              className="btn btn-secondary"
            >
              Export results
            </button>
          </div>
        </section>
      )}

      {filteredAndSortedImages.length > 0 && (
        <section className="ui-card p-5 sm:p-6" aria-label="Analysis results">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="ui-eyebrow">REVIEW</p>
              <h2 className="mt-2 text-lg font-semibold text-slate-100">
                Image results
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <select
                aria-label="Filter results"
                value={filter}
                onChange={e =>
                  setFilter(
                    e.target.value as 'all' | 'good' | 'standard' | 'bad'
                  )
                }
                className="ui-field"
              >
                <option value="all">All results</option>
                <option value="good">Good only</option>
                <option value="standard">Standard only</option>
                <option value="bad">Needs improvement</option>
              </select>
              <select
                aria-label="Sort results"
                value={sortBy}
                onChange={e => setSortBy(e.target.value as 'score' | 'name')}
                className="ui-field"
              >
                <option value="score">Sort by score</option>
                <option value="name">Sort by name</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAndSortedImages.map(img => (
              <article
                key={img.id}
                className={`ui-card-muted min-w-0 p-4 ${
                  img.status === 'completed'
                    ? img.result?.quality === 'Good'
                      ? 'border-emerald-500/30'
                      : img.result?.quality === 'Standard'
                        ? 'border-amber-500/30'
                        : 'border-red-500/30'
                    : ''
                }`}
              >
                <div className="relative mb-3">
                  <img
                    src={img.previewUrl}
                    alt={img.originalName || img.file.name}
                    className="h-36 w-full rounded-md object-cover"
                  />
                  {img.status === 'analyzing' && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/60">
                      <span className="text-sm text-slate-200" role="status">
                        Analyzing...
                      </span>
                    </div>
                  )}
                  {img.status === 'error' && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-md bg-red-950/75">
                      <span className="text-sm text-red-200">
                        {img.error || 'Analysis failed'}
                      </span>
                    </div>
                  )}
                  {img.result?.isNight && (
                    <span className="absolute right-2 top-2 rounded-md border border-white/10 bg-slate-950/80 px-2 py-1 text-xs text-slate-200">
                      Night
                    </span>
                  )}
                </div>

                <h3 className="truncate text-sm font-medium text-slate-100">
                  {img.originalName || img.file.name}
                </h3>

                {img.status === 'completed' && img.result && (
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`rounded-md px-2 py-1 text-xs font-medium ${
                          img.result.quality === 'Good'
                            ? 'bg-emerald-500/10 text-emerald-300'
                            : img.result.quality === 'Standard'
                              ? 'bg-amber-500/10 text-amber-300'
                              : 'bg-red-500/10 text-red-300'
                        }`}
                      >
                        {img.result.quality}
                      </span>
                      <span className="text-sm font-semibold text-slate-100">
                        {img.result.score}/100
                      </span>
                    </div>

                    {img.result.context && (
                      <ImageContextIndicator context={img.result.context} />
                    )}

                    {img.result.metrics && (
                      <dl className="grid grid-cols-2 gap-x-3 gap-y-2 border-t border-white/[0.08] pt-3 text-xs">
                        <Metric
                          label="Brightness"
                          value={img.result.metrics.brightness}
                        />
                        <Metric
                          label="Contrast"
                          value={img.result.metrics.contrast}
                        />
                        <Metric
                          label="Sharpness"
                          value={img.result.metrics.sharpness}
                        />
                        <Metric
                          label="Color balance"
                          value={img.result.metrics.colorBalance}
                        />
                        <Metric
                          label="Noise level"
                          value={img.result.metrics.noiseLevel}
                        />
                        <Metric
                          label="Composition"
                          value={img.result.metrics.composition.overall}
                        />
                        <Metric
                          label="Rule of thirds"
                          value={img.result.metrics.composition.ruleOfThirds}
                        />
                        <Metric
                          label="Golden ratio"
                          value={img.result.metrics.composition.goldenRatio}
                        />
                        <Metric
                          label="Symmetry"
                          value={img.result.metrics.composition.symmetry}
                        />
                        <Metric
                          label="Leading lines"
                          value={img.result.metrics.composition.leadingLines}
                        />
                        <Metric
                          label="Horizon placement"
                          value={
                            img.result.metrics.composition.horizonPlacement
                          }
                        />
                        <Metric
                          label="Subject center"
                          value={
                            img.result.metrics.composition.subjectCentering
                          }
                        />
                        <Metric
                          label="Horizon tilt"
                          value={img.result.metrics.composition.horizonTilt}
                        />
                      </dl>
                    )}

                    {(!img.result.metrics ||
                      (img.result.metrics.brightness === 0 &&
                        img.result.metrics.contrast === 0 &&
                        img.result.metrics.sharpness === 0 &&
                        img.result.metrics.colorBalance === 0)) && (
                      <p className="border-t border-white/[0.08] pt-3 text-xs text-amber-300">
                        Detailed image metrics are unavailable for this result.
                      </p>
                    )}

                    {img.result.reasons.length > 0 && (
                      <ul className="space-y-2 border-t border-white/[0.08] pt-3 text-xs leading-relaxed text-slate-400">
                        {img.result.reasons.slice(0, 3).map((reason, index) => (
                          <li key={`${img.id}-reason-${index}`}>{reason}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

function SummaryMetric({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone?: 'good' | 'standard' | 'bad';
}) {
  const valueColor = tone
    ? {
        good: 'text-emerald-300',
        standard: 'text-amber-300',
        bad: 'text-red-300',
      }[tone]
    : 'text-slate-100';

  return (
    <div>
      <div className={`text-2xl font-semibold ${valueColor}`}>{value}</div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-medium tabular-nums text-slate-300">
        {Number.isFinite(value) ? value.toFixed(1) : '—'}
      </dd>
    </div>
  );
}
