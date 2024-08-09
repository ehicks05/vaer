/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(() => ({
	plugins: [react(), svgr({ svgrOptions: { icon: true } })],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		host: '0.0.0.0',
	},
}));
