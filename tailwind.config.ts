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
        p10: '0.833rem',
        p11: '0.917rem',
        p13: '1.083rem',
        p15: '1.25rem',
        p16: '1.333rem',
        p18: '1.5rem',
        p26: '2.167rem',
        p28: '2.333rem',
      },
    },
  },
  plugins: [],
}

export default config
