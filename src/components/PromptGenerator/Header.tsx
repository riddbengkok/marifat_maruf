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
        marginBottom: '40px',
        padding: '20px 0',
      }}
    >
      <h1
        style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          margin: '0 0 16px 0',
          background: 'linear-gradient(135deg, #00ffff 0%, #0066ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
        }}
      >
        {icon && <span style={{ fontSize: '2rem' }}>{icon}</span>}
        {title}
      </h1>
      {(subtitle || description) && (
        <p
          style={{
            fontSize: '1.1rem',
            color: '#ccc',
            margin: '0',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6',
          }}
        >
          {subtitle || description}
        </p>
      )}
    </div>
  );
}
