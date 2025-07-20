'use client';

interface HeaderProps {
  title: string;
  description?: string;
  subtitle?: string;
  icon?: string;
}

export default function Header({
  title,
  description,
  subtitle,
  icon,
}: HeaderProps) {
  return (
    <div
      style={{
        textAlign: 'center',
        marginBottom: '48px',
        padding: '32px 0',
        position: 'relative',
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200px',
          height: '200px',
          background:
            'radial-gradient(circle, rgba(125, 216, 224, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: -1,
        }}
      />

      <h1
        style={{
          fontSize: '3rem',
          fontWeight: '800',
          margin: '0 0 20px 0',
          background:
            'linear-gradient(135deg, #7dd8e0 0%, #6b9ac4 25%, #7fb069 50%, #e8a5c4 75%, #f4a261 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          textShadow: '0 4px 20px rgba(125, 216, 224, 0.3)',
          letterSpacing: '-0.02em',
        }}
      >
        {icon && (
          <span
            style={{
              fontSize: '2.5rem',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
              animation: 'float 3s ease-in-out infinite',
            }}
          >
            {icon}
          </span>
        )}
        {title}
      </h1>

      {(subtitle || description) && (
        <p
          style={{
            fontSize: '1.25rem',
            color: '#b0b0b0',
            margin: '0',
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.7',
            fontWeight: '400',
            opacity: '0.9',
          }}
        >
          {subtitle || description}
        </p>
      )}

      {/* Decorative line */}
      <div
        style={{
          width: '80px',
          height: '3px',
          background: 'linear-gradient(90deg, #7dd8e0, #6b9ac4, #7fb069)',
          margin: '24px auto 0',
          borderRadius: '2px',
          opacity: '0.8',
        }}
      />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
}
