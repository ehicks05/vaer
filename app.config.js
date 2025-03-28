import { defineConfig } from '@tanstack/react-start/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	vite: {
		plugins: [
			tsConfigPaths({
				projects: ['./tsconfig.json'],
			}),
			react(),
			svgr({ svgrOptions: { icon: true } }),
		],
	},
});
