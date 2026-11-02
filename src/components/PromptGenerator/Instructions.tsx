'use client';

interface InstructionsProps {
  title?: string;
  steps?: string[];
}

export default function Instructions({ title, steps }: InstructionsProps) {
  const displaySteps = steps || [];

  if (displaySteps.length === 0) return null;

  return (
    <section
      className="instructions-section"
      aria-label={title || 'Instructions'}
    >
      <h3 className="instructions-section__title">{title || 'How to use'}</h3>
      <ol className="instructions-section__steps">
        {displaySteps.map((step, idx) => (
          <li className="instructions-section__step" key={idx}>
            <span
              className="instructions-section__step-number"
              aria-hidden="true"
            >
              {String(idx + 1).padStart(2, '0')}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </section>
  );
}
