'use client';

interface InstructionsProps {
  title?: string;
  steps?: string[];
}

export default function Instructions({ title, steps }: InstructionsProps) {
  const displaySteps = steps || [];
  return (
    <div className="instructions-section">
      <h3 className="instructions-section__title">
        <span style={{ fontSize: '22px' }}>📋</span>
        {title}
      </h3>
      <div className="instructions-section__steps">
        {displaySteps.map((step, idx) => (
          <div className="instructions-section__step" key={idx}>
            <span className="instructions-section__step-number">{idx + 1}</span>
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}
