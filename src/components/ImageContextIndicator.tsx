import React from 'react';

interface ImageContext {
  isBlackAndWhite: boolean;
  isLowKey: boolean;
  isHighKey: boolean;
  isPortrait: boolean;
  hasBackgroundBlur: boolean;
  subjectDetected: boolean;
}

interface ImageContextIndicatorProps {
  context: ImageContext;
}

export const ImageContextIndicator: React.FC<ImageContextIndicatorProps> = ({
  context,
}) => {
  const contextTags = [];

  if (context.isBlackAndWhite) {
    contextTags.push(
      <span
        key="bw"
        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-gray-500/20 text-gray-400 border border-gray-400/30"
      >
        <span role="img" aria-label="black and white">
          ⚫
        </span>
        B&W
      </span>
    );
  }

  if (context.isLowKey) {
    contextTags.push(
      <span
        key="lowkey"
        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 border border-purple-400/30"
      >
        <span role="img" aria-label="low key">
          🌙
        </span>
        Low Key
      </span>
    );
  }

  if (context.isHighKey) {
    contextTags.push(
      <span
        key="highkey"
        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400 border border-yellow-400/30"
      >
        <span role="img" aria-label="high key">
          ☀️
        </span>
        High Key
      </span>
    );
  }

  if (context.isPortrait) {
    contextTags.push(
      <span
        key="portrait"
        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-pink-500/20 text-pink-400 border border-pink-400/30"
      >
        <span role="img" aria-label="portrait">
          👤
        </span>
        Portrait
      </span>
    );
  }

  if (context.hasBackgroundBlur) {
    contextTags.push(
      <span
        key="blur"
        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-400/30"
      >
        <span role="img" aria-label="background blur">
          🎯
        </span>
        Bokeh
      </span>
    );
  }

  if (context.subjectDetected) {
    contextTags.push(
      <span
        key="subject"
        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-400/30"
      >
        <span role="img" aria-label="subject detected">
          🎯
        </span>
        Subject Focus
      </span>
    );
  }

  if (contextTags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-3">
      <span className="text-xs text-gray-400 font-medium">Image Type:</span>
      {contextTags}
    </div>
  );
};
