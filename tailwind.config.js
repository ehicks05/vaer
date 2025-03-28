/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';

export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
	fontFamily: {
		sans: ['Fredoka', ...fontFamily.sans],
		mono: fontFamily.mono,
		logo: '"Proza Libre"',
	},
};
export const variants = {
	extend: {},
};
export const plugins = [
	require('tailwind-scrollbar'),
	require('tailwindcss-animate'),
];
