import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from "@tailwindcss/vite";
import { nitro } from 'nitro/vite'

export default defineConfig({
	server: {
		port: 3000,
		host: '0.0.0.0',
  },
  resolve: {
    tsconfigPaths: true,
  },
	plugins: [
		tanstackStart({ }),
    tailwindcss(),
		nitro(),
		viteReact(),
  ],
  ssr: { noExternal: ['maplibre-gl'] }
});
