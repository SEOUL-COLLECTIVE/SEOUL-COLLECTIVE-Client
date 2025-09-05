import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bgColor: '#F5F5F7',
        purple: '#7D89FF',
        yellow: '#F4FF9D',
        black: '#000000',
        footerBlack: '#2D2B28',
      },
      fontSize: {
        p10: '0.625rem',
        p11: '0.6875rem',
        p13: '0.8125rem',
        p15: '0.9375rem',
        p16: '1rem',
        p18: '1.125rem',
        p26: '1.625rem',
        p28: '1.75rem',
      },
    },
  },
  plugins: [],
}

export default config
