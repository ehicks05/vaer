import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header, Footer } from './layout';
import { Home } from '@/app';
import { useIsRestoring } from '@tanstack/react-query';

function MyApp() {
	const isRestoring = useIsRestoring();

	if (isRestoring) return null;

	return (
		<div className="flex flex-col min-h-screen bg-gradient-to-r from-stone-900 to-neutral-950">
			<Header />
			<div className="flex-grow flex flex-col h-full sm:px-4">
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default MyApp;
