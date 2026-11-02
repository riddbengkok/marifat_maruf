'use client';

import './PromptGenerator.css';

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
    <div className="progress-indicator hidden lg:block">
      <div style={{ marginBottom: '20px' }}>
        <h3 className="progress-indicator__header">
          Step {currentStep} of {totalSteps}
        </h3>

        {/* Progress bar */}
        <div className="progress-indicator__bar">
          <div
            className="progress-indicator__bar-inner"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="progress-indicator__bar-labels">
          <span>0%</span>
          <span>{Math.round(progress)}%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Step indicators */}
      <div className="progress-indicator__steps">
        {steps.map((step, index) => (
          <div
            key={index}
            className={
              'progress-indicator__step' +
              (index < currentStep ? ' progress-indicator__step--active' : '')
            }
          >
            <div
              className={
                'progress-indicator__step-circle' +
                (index < currentStep
                  ? ' progress-indicator__step-circle--active'
                  : '')
              }
            >
              {index < currentStep ? '✓' : index + 1}
            </div>
            <span
              className={
                'progress-indicator__step-label' +
                (index < currentStep
                  ? ' progress-indicator__step-label--active'
                  : '')
              }
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
