'use client';

interface HeaderProps {
  title: string;
  description?: string;
  subtitle?: string;
}

export default function Header({ title, description, subtitle }: HeaderProps) {
  return (
    <header className="generator-page-header">
      <p className="generator-page-header__eyebrow">PROMPT WORKSPACE</p>
      <h1 className="generator-page-header__title">{title}</h1>
      {(subtitle || description) && (
        <p className="generator-page-header__description">
          {subtitle || description}
        </p>
      )}
    </header>
  );
}
