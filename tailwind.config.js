const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['itc-avant-garde-gothic-pro', ...defaultTheme.fontFamily.sans],
        itcGothic: [
          'itc-avant-garde-gothic-pro',
          ...defaultTheme.fontFamily.sans,
        ],
        tacticSansExt: ['Tactic-Ext', ...defaultTheme.fontFamily.sans],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
      },
      transitionDuration: {
        600: '600ms',
      },
      colors: {
        orange: '#F99300',
        'orange-red': '#FB5600',
        blue: '#00AEEA',
        'dark-blue': '#040F2B',
        yellow: '#F99300',
        'light-gray': '#D9D9D9',
        gray: {
          700: '#737373',
          800: '#545454',
          900: '#333333',
        },
      },
      dropShadow: {
        '4xl': ['0px 4px 24px #000000', '0px 4px 4px rgb(0 0 0 / 25%)'],
      },
      boxShadow: {
        'locale-hover': '0px 0px 16px rgba(251, 86, 0, 0.75)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@headlessui/tailwindcss'),
  ],
}
