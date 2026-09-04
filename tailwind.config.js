export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        canvas: '#f6f7f9',
        surface: '#ffffff',
        line: {
          DEFAULT: '#e7e9ef',
          strong: '#d5d9e2',
        },
        ink: {
          900: '#0d1526',
          700: '#3b475c',
          500: '#6b788e',
          400: '#93a0b4',
        },
        brand: {
          50: '#eef1ff',
          100: '#e0e5ff',
          200: '#c5cdff',
          300: '#a1adfb',
          400: '#7f8cf5',
          500: '#5b66e8',
          600: '#4549cf',
          700: '#383aa6',
        },
        spam: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        ham: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        warn: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(13, 21, 38, 0.04), 0 1px 3px rgba(13, 21, 38, 0.03)',
        lift: '0 8px 24px -12px rgba(13, 21, 38, 0.18)',
        panel: '0 24px 60px -24px rgba(13, 21, 38, 0.35)',
      },
    },
  },
}
