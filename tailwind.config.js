import colors from 'tailwindcss/colors';

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  darkMode: 'class', // or 'media' if you prefer
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
        customBlue: '#1DA1F2', // Example of custom color
      },
      width: {
        pic: 'aspect-[1/1.41]',
      },
      boxShadow: {
        'inner-sm': 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
        'inner-md': 'inset 2px -2px 6px rgba(0, 0, 0, 0.3)',
        'inner-lg': 'inset 4px -3px 8px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover', 'focus'], // Example of extending variants
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Include the forms plugin
  ],
};
