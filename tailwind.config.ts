import type { Config } from 'tailwindcss'

const config: Config = {
  // darkMode: 'class',
  content: [
    './posts/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      mono: ['Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', 'monospace']
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
export default config
