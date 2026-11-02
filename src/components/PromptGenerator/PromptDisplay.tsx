'use client';

interface PromptDisplayProps {
  prompt: string;
  copied: boolean;
  onCopy: () => void;
}

export default function PromptDisplay({
  prompt,
  copied,
  onCopy,
}: PromptDisplayProps) {
  if (!prompt) return null;

  return (
    <section className="prompt-display" aria-live="polite">
      <div className="prompt-display-header">
        <h3 className="prompt-display-title">Generated prompt</h3>
        <button
          onClick={onCopy}
          className={`btn-copy${copied ? ' copied' : ''}`}
          type="button"
          aria-label={copied ? 'Prompt copied' : 'Copy generated prompt'}
        >
          {copied ? 'Copied' : 'Copy prompt'}
        </button>
      </div>
      <div className="prompt-display-content">{prompt}</div>
    </section>
  );
}
