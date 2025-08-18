module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        gotham800: ['var(--font-gotham-800)'],
        gotham600: ['var(--font-gotham-600)'],
        gotham400: ['var(--font-gotham-400)'],
      },
      colors: {
        'brand-dark-blue': '#1E1C36',   // Primario
        'brand-light-gray': '#F7F7F7', // Secundario
        'brand-dark-text': '#272626',   // Texto oscuro
        'brand-pink': '#FF267A',        // Acento 1
        'brand-green': '#40FF9A',       // Acento 2
      }
    },
  },
  plugins: [],
}
