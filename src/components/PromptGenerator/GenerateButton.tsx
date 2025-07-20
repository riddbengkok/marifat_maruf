'use client'


interface GenerateButtonProps {
  onClick: () => void
}

export default function GenerateButton({ onClick }: GenerateButtonProps) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
      <button
        onClick={onClick}
        style={{
          padding: '16px 32px',
          fontSize: '18px',
          fontWeight: '600',
          backgroundColor: '#00ffff',
          color: '#000',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#00cccc'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#00ffff'
        }}
      >
        🚀 Generate Detailed Prompt
      </button>
    </div>
  )
} 