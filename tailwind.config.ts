import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mainBlack: ['var(--font-gotham-black)', 'Arial', 'sans-serif'],
        mainBold: ['var(--font-gotham-bold)', 'Arial', 'sans-serif'],
        mainMedium: ['var(--font-gotham-medium)', 'Arial', 'sans-serif'],
        point: ['var(--font-termina-heavy)', 'Arial', 'sans-serif'],
        nhItalic: ['var(--font-nh-black-italic)', 'Arial', 'sans-serif'],
      },
      colors: {
        bgColor: '#F5F5F7',
        scpurple: '#644DFF',
        scblack: '#231F20',
        scgrey: '#6C6C6C',
        footerBlack: '#2D2B28',
      },
      fontSize: {
        p10: '0.833rem',
        p11: '0.917rem',
        p12: '1rem',
        p13: '1.083rem',
        p15: '1.25rem',
        p16: '1.333rem',
        p17: '1.417rem',
        p18: '1.5rem',
        p20: '1.667rem',
        p26: '2.167rem',
        p28: '2.333rem',
        p32: '2.844rem',
        p50: '4.167rem',
      },
    },
  },
  plugins: [typography],
}

export default config
