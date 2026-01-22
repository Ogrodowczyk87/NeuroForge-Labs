import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#05080f',
        graphite: '#10172a',
        orbit: '#38bdf8',
        core: '#2563eb',
        plasma: '#60a5fa',
      },
      fontFamily: {
        display: ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
        body: ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
        mono: ['"Share Tech Mono"', ...defaultTheme.fontFamily.mono],
      },
      boxShadow: {
        aurora: '0 0 36px rgba(56, 189, 248, 0.25)',
        core: '0 14px 42px rgba(37, 99, 235, 0.25)',
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at 15% 20%, rgba(56,189,248,.18), transparent 45%), radial-gradient(circle at 80% 10%, rgba(96,165,250,.2), transparent 40%), radial-gradient(circle at 40% 70%, rgba(59,130,246,.12), transparent 35%)',
      },
      borderRadius: {
        xl: '1.75rem',
      },
    },
  },
  plugins: [],
}
