import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from '@tanstack/react-router';
import type { ReactNode } from 'react';
import appCss from '@/index.css?url';

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ title: 'Vær' },
			{ name: 'mobile-web-app-capable', content: 'yes' },
			{ name: 'apple-mobile-web-app-capable', content: 'yes' },
			{ name: 'application-name', content: 'Vær' },
			{ name: 'apple-mobile-web-app-title', content: 'Vær' },
			{ name: 'theme-color', content: '#5b21b6' },
			{ name: 'msapplication-navbutton-color', content: '#5b21b6' },
			{
				name: 'apple-mobile-web-app-status-bar-style',
				content: 'black-translucent',
			},
			{ name: 'msapplication-starturl', content: '/' },
		],
		links: [
			{ rel: 'stylesheet', href: appCss },
			{ rel: 'icon', href: 'favicon.ico', type: 'image/ico' },
			{ rel: 'apple-touch-icon', href: 'apple-touch-icon.png', type: 'image/ico' },
			{ rel: 'manifest', href: '/manifest.json' },
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="dark">
				{children}
				<Scripts />
			</body>
		</html>
	);
}
