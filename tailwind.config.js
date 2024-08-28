/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';

export const content = ['./src/**/*.{js,jsx,ts,tsx}', './index.html'];
export const theme = {
	fontFamily: {
		sans: ['Fredoka', ...fontFamily.sans],
		mono: fontFamily.mono,
		logo: '"Proza Libre"',
	},
	container: {
		center: true,
		padding: '2rem',
		screens: {
			'2xl': '1400px',
		},
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
			// border: 'hsl(var(--border))',
			// input: 'hsl(var(--input))',
			// ring: 'hsl(var(--ring))',
			// background: 'hsl(var(--background))',
			// foreground: 'hsl(var(--foreground))',
			// primary: {
			// 	DEFAULT: 'hsl(var(--primary))',
			// 	foreground: 'hsl(var(--primary-foreground))',
			// },
			// secondary: {
			// 	DEFAULT: 'hsl(var(--secondary))',
			// 	foreground: 'hsl(var(--secondary-foreground))',
			// },
			// destructive: {
			// 	DEFAULT: 'hsl(var(--destructive))',
			// 	foreground: 'hsl(var(--destructive-foreground))',
			// },
			// muted: {
			// 	DEFAULT: 'hsl(var(--muted))',
			// 	foreground: 'hsl(var(--muted-foreground))',
			// },
			// accent: {
			// 	DEFAULT: 'hsl(var(--accent))',
			// 	foreground: 'hsl(var(--accent-foreground))',
			// },
			// popover: {
			// 	DEFAULT: 'hsl(var(--popover))',
			// 	foreground: 'hsl(var(--popover-foreground))',
			// },
			// card: {
			// 	DEFAULT: 'hsl(var(--card))',
			// 	foreground: 'hsl(var(--card-foreground))',
			// },
		},
		keyframes: {
			'accordion-down': {
				from: { height: '0' },
				to: { height: 'var(--radix-accordion-content-height)' },
			},
			'accordion-up': {
				from: { height: 'var(--radix-accordion-content-height)' },
				to: { height: '0' },
			},
		},
		animation: {
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out',
		},
	},
};
export const variants = {
	extend: {},
};
export const plugins = [
	require('tailwind-scrollbar', require('tailwindcss-animate'))({
		nocompatible: true,
	}),
];
