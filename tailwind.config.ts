import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#09672E',
        background: '#F6F1EB',
        borderColor: '#E0D6CA',
      },
    },
  },
  plugins: [],
} satisfies Config;
