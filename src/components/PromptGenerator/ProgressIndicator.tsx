'use client';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export default function ProgressIndicator({
  currentStep,
  totalSteps,
  steps,
}: ProgressIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div
      style={{
        marginBottom: '32px',
        padding: '24px',
        background:
          'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.02))',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative top border */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, #7dd8e0, #6b9ac4, #7fb069)',
          opacity: '0.6',
        }}
      />

      <div style={{ marginBottom: '20px' }}>
        <h3
          style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#ffffff',
            margin: '0 0 16px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span style={{ fontSize: '20px' }}>📊</span>
          Progress: Step {currentStep} of {totalSteps}
        </h3>

        {/* Progress bar */}
        <div
          style={{
            width: '100%',
            height: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '4px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #7dd8e0, #6b9ac4, #7fb069)',
              borderRadius: '4px',
              transition: 'width 0.5s ease',
              position: 'relative',
            }}
          >
            {/* Animated shine effect */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background:
                  'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                animation: 'shine 2s infinite',
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '8px',
            fontSize: '12px',
            color: '#b0b0b0',
          }}
        >
          <span>0%</span>
          <span>{Math.round(progress)}%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Step indicators */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
        }}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 12px',
              borderRadius: '8px',
              background:
                index < currentStep
                  ? 'rgba(125, 216, 224, 0.1)'
                  : 'rgba(255, 255, 255, 0.02)',
              border:
                index < currentStep
                  ? '1px solid rgba(125, 216, 224, 0.3)'
                  : '1px solid rgba(255, 255, 255, 0.04)',
              transition: 'all 0.3s ease',
            }}
          >
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                background:
                  index < currentStep
                    ? 'linear-gradient(135deg, #7dd8e0, #6b9ac4)'
                    : 'rgba(255, 255, 255, 0.1)',
                color: index < currentStep ? '#000' : '#b0b0b0',
                border:
                  index < currentStep
                    ? 'none'
                    : '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              {index < currentStep ? '✓' : index + 1}
            </div>
            <span
              style={{
                fontSize: '13px',
                color: index < currentStep ? '#7dd8e0' : '#b0b0b0',
                fontWeight: index < currentStep ? '500' : '400',
              }}
            >
              {step}
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes shine {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
}
