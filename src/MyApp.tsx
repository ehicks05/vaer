import React from 'react';
import { Header, Footer } from './components/layout';
import { Home } from '@/app';
import { useIsRestoring } from '@tanstack/react-query';

function MyApp() {
	const isRestoring = useIsRestoring();

	if (isRestoring) return null;

	return (
		<div className="flex flex-col min-h-screen bg-gradient-to-r from-stone-900 to-neutral-950">
			<div className="sm:px-4">
				<Header />
			</div>
			<div className="flex-grow flex flex-col h-full sm:px-4">
				<Home />
			</div>
			<Footer />
		</div>
	);
}

export default MyApp;
