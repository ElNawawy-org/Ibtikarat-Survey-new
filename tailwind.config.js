module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      xs: [
        '12px',
        {
          lineHeight: '1.5',
        },
      ],
      sm: [
        '14px',

        {
          lineHeight: '1.57',
        },
      ],
      md: [
        '16px',
        {
          lineHeight: '1.5',
        },
      ],
      base: [
        '16px',
        {
          lineHeight: '1.5',
        },
      ],
      lg: [
        '20px',
        {
          lineHeight: '1.42',
        },
      ],
      xl: [
        '24px',
        {
          lineHeight: '1.43',
        },
      ],
      '2xl': [
        '28px',
        {
          lineHeight: '1.4',
        },
      ],
      '4xl': [
        '28px',
        {
          lineHeight: '1.4',
        },
      ],
      '5xl': [
        '28px',
        {
          lineHeight: '1',
        },
      ],
    },
    extend: {
      colors: {
        primary: {
          100: '#F1E7EA',
          // 200: '#99ded9',
          300: '#B6216C',
          // 400: '#33bdb3',
          500: '#A01F5A',
          600: '#801E41',
        },
        secondary: {
          100: '#ffffff',
          200: '#ccd9de',
          300: '#B79576',
          400: '#523F37',
          500: '#3F322D',
          600: '#2F2A26',
          700: '#1F1A16',
        },
        grey: {
          200: '#D9D9D9',
          300: '#F5F4F3', // grey 30%
          400: '#EDEBE9', // grey 50%
          500: '#ddd8d5b3', // grey 70%
          600: '#DDD8D5', // grey 100%
          700: '#707070',
          800: '#6D6D6D',
          900: '#827F7D',
        },
        light: {
          100: '#fafafa',
          150: '#f6f8fa',
          200: '#f2f2f2',
          300: '#e5e5e5',
          400: '#cccccc',
          500: '#b2b2b2',
          600: '#C2C2C2',
        },
        dark: {
          100: '#999999',
          200: '#666666',
          300: '#333333',
          400: '#000000',
        },
        danger: {
          100: '#fdebeb',
          200: '#fcdfe0',
          300: '#f8c0c1',
          400: '#f5a0a2',
          500: '#f38383',
          600: '#f16565',
        },
        success: {
          100: '#ebf9f4',
          200: '#d9f4ea',
          300: '#b2e8d4',
          400: '#8cddbf',
          500: '#66d1a9',
          600: '#40c694',
        },
        warning: {
          100: '#fde3bc',
          200: '#fbd59b',
          300: '#fac77a',
          400: '#f9b035',
          500: '#FDC100',
        },
        blue: {
          100: '#e8fcfb',
          200: '#d2f9f7',
          300: '#a5f3ef',
          400: '#78ede7',
          500: '#4be7df',
          600: '#324E5C',
        },
        'secondary-green': {
          200: '#CADBAE',
          300: '#C6DCAA',
          400: '#9AC98D',
          500: '#74BC7D',
          600: '#329361',
        },
        yellow: {
          100: '#fff4d6',
          200: '#ffeec1',
          300: '#FBE8B9',
          400: '#F8DD83',
          500: '#FFD232',
          600: '#F4C11F',
        },
        body: '#fff',
      },
      screens: {
        // NOTE  max effect on the same screen to lower screens
        sm: { max: '639px' },
      },
    },
    borderRadius: {
      sm: '0.5rem',
      md: '0.8rem',
      lg: '1rem',
      xl: '1.3rem',
      '2xl': '1.7rem',
      '3xl': '2rem',
      full: '9999px',
    },
  },

  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@tailwindcss/forms'),

    // To create a custom class in tailwind
    function ({ addComponents }) {
      addComponents({
        '.grid-rows-auto_1fr': {
          'grid-template-rows': 'auto 1fr',
        },
        '.grid-cols-auto_1fr_auto': {
          'grid-template-columns': 'auto 1fr auto',
        },
        '.grid-cols-1fr_1fr_auto': {
          'grid-template-columns': '1fr 1fr auto',
        },
        '.grid-rows-200_auto_auto': {
          'grid-template-rows': '200px auto auto',
        },
        '.grid-cols-auto_1fr': {
          'grid-template-columns': 'auto 1fr',
        },
        '.grid-cols-1fr_auto': {
          'grid-template-columns': '1fr auto',
        },
        '.border-spacing-0-2': {
          'border-spacing': '0 8px',
        },
      });
    },
  ],
};
