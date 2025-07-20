'use client';

export default function LoadingSpinner() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#000',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: '128px',
            height: '128px',
            border: '2px solid #00ffff',
            borderTop: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px',
          }}
        ></div>
        <p style={{ fontSize: '20px', margin: '0' }}>
          Loading Prompt Generator...
        </p>
      </div>
    </div>
  );
}
