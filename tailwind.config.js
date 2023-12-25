import { fontFamily } from 'tailwindcss/defaultTheme';

export const content = ['./src/**/*.{js,jsx,ts,tsx}', './index.html'];
export const theme = {
	fontFamily: {
		sans: ['Fredoka', ...fontFamily.sans],
		mono: fontFamily.mono,
	},
  extend: {
		colors: {
			'caribbean-green': {
				50: '#f3fefa',
				100: '#e8fdf6',
				200: '#c5fbe8',
				300: '#a1f8d9',
				400: '#5bf2bd',
				500: '#15eda1',
				600: '#13d591',
				700: '#10b279',
				800: '#0d8e61',
				900: '#0a744f',
			},
		},
	},
};
export const variants = {
	extend: {},
};
export const plugins = [require('tailwind-scrollbar')({ nocompatible: true })];
