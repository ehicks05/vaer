/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string;
	readonly VITE_GEONAMES_USERNAME: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
