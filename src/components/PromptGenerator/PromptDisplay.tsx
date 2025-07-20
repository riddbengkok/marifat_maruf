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
    <div
      style={{
        backgroundColor: '#1a1a1a',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #333',
        marginBottom: '24px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <h3 style={{ margin: '0', color: '#00ffff' }}>
          📋 Generated Detailed Prompt:
        </h3>
        <button
          onClick={onCopy}
          style={{
            padding: '8px 16px',
            backgroundColor: copied ? '#00ff00' : '#333',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          {copied ? '✅ Copied!' : '📋 Copy'}
        </button>
      </div>
      <div
        style={{
          backgroundColor: '#000',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid #444',
          fontFamily: 'monospace',
          fontSize: '14px',
          lineHeight: '1.5',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {prompt}
      </div>
    </div>
  );
}
