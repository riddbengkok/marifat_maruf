/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Gradient directions
    'bg-gradient-to-br',
    'bg-gradient-to-r',
    // Purple variants
    'from-purple-500', 'to-purple-500',
    'hover:from-purple-600', 'hover:to-purple-600',
    // Pink variants
    'from-pink-500', 'to-pink-500',
    'hover:from-pink-600', 'hover:to-pink-600',
    // Green variants
    'from-green-500', 'to-green-500',
    'hover:from-green-600', 'hover:to-green-600',
    // Teal variants
    'from-teal-500', 'to-teal-500',
    'hover:from-teal-600', 'hover:to-teal-600',
    // Orange variants
    'from-orange-500', 'to-orange-500',
    'hover:from-orange-600', 'hover:to-orange-600',
    // Red variants
    'from-red-500', 'to-red-500',
    'hover:from-red-600', 'hover:to-red-600',
    // Indigo variants
    'from-indigo-500', 'to-indigo-500',
    'hover:from-indigo-600', 'hover:to-indigo-600',
    // Yellow variants
    'from-yellow-500', 'to-yellow-500',
    'hover:from-yellow-600', 'hover:to-yellow-600',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
        'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#9bf1ff',
        secondary: '#ff6b6b',
        accent: '#4ecdc4',
        background: '#0c0c0c',
        // Purple
        purple: {
          50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe',
          400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce',
          800: '#6b21a8', 900: '#581c87',
        },
        // Pink
        pink: {
          50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4',
          400: '#f472b6', 500: '#ec4899', 600: '#db2777', 700: '#be185d',
          800: '#9d174d', 900: '#831843',
        },
        // Green
        green: {
          50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac',
          400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d',
          800: '#166534', 900: '#14532d',
        },
        // Teal
        teal: {
          50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4',
          400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e',
          800: '#115e59', 900: '#134e4a',
        },
        // Orange
        orange: {
          50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74',
          400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c',
          800: '#9a3412', 900: '#7c2d12',
        },
        // Red
        red: {
          50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5',
          400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c',
          800: '#991b1b', 900: '#7f1d1d',
        },
        // Indigo
        indigo: {
          50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc',
          400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca',
          800: '#3730a3', 900: '#312e81',
        },
        // Yellow
        yellow: {
          50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047',
          400: '#facc15', 500: '#eab308', 600: '#ca8a04', 700: '#a16207',
          800: '#854d0e', 900: '#713f12',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-source-sans)',
          'Source Sans Pro',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'var(--font-source-code)',
          'Source Code Pro',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.75rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['2.75em', { lineHeight: '1.5' }], // h1 size from Hyperspace
        '7xl': ['1.75em', { lineHeight: '1.5' }], // h2 size from Hyperspace
        '8xl': ['1.1em', { lineHeight: '1.5' }], // h3 size from Hyperspace
        '9xl': ['1em', { lineHeight: '1.5' }], // h4 size from Hyperspace
        // Hyperspace-specific font sizes
        'hyperspace-h1': ['2.75em', { lineHeight: '1.5' }],
        'hyperspace-h2': ['1.75em', { lineHeight: '1.5' }],
        'hyperspace-h3': ['1.1em', { lineHeight: '1.5' }],
        'hyperspace-h4': ['1em', { lineHeight: '1.5' }],
        'hyperspace-h5': ['0.8em', { lineHeight: '1.5' }],
        'hyperspace-h6': ['0.6em', { lineHeight: '1.5' }],
        'hyperspace-p': ['1em', { lineHeight: '1.75' }],
        'hyperspace-intro': ['1.25em', { lineHeight: '1.75' }],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      lineHeight: {
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
        3: '.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounce: 'bounce 1s infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
