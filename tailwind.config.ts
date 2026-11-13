import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        muted: 'hsl(var(--muted) / <alpha-value>)',
        'muted-foreground': 'hsl(var(--muted-foreground) / <alpha-value>)',
        subtle: 'hsl(var(--subtle-foreground) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
        'accent-foreground': 'hsl(var(--accent-foreground) / <alpha-value>)',
        'accent-muted': 'hsl(var(--accent-muted) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        'border-highlight': 'hsl(var(--border-highlight) / <alpha-value>)',
        card: 'hsl(var(--card) / <alpha-value>)',
        'card-foreground': 'hsl(var(--card-foreground) / <alpha-value>)',
        cyan: 'hsl(var(--cyan) / <alpha-value>)',
        amber: 'hsl(var(--amber) / <alpha-value>)',
        red: 'hsl(var(--red) / <alpha-value>)',
        violet: 'hsl(var(--violet) / <alpha-value>)',
      },
      fontFamily: {
        sans: [
          'Geist',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'sans-serif',
        ],
        mono: [
          'Geist Mono',
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Consolas',
          'monospace',
        ],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        enter: {
          from: { opacity: '0', transform: 'translateY(10px)', filter: 'blur(6px)' },
          to: { opacity: '1', transform: 'none', filter: 'none' },
        },
        'dialog-in': {
          from: { opacity: '0', transform: 'translateY(-8px) scale(0.98)' },
          to: { opacity: '1', transform: 'none' },
        },
        'overlay-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        enter: 'enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'dialog-in': 'dialog-in 0.22s cubic-bezier(0.16, 1, 0.3, 1) both',
        'overlay-in': 'overlay-in 0.2s ease-out both',
      },
    },
  },
  plugins: [],
} satisfies Config
