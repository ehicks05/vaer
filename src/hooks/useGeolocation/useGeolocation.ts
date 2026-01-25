import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import type { GeolocationState } from './types';
import { useBrowserGeolocation } from './useBrowserGeolocation';

/**
 * @returns Wraps useBrowserGeolocation and caches state in localStorage.
 */
export const useGeolocation = () => {
	const geolocation = useBrowserGeolocation();
	const [cachedGeolocation, setCachedGeolocation] =
		useLocalStorage<GeolocationState>('vaer-cachedGeolocation', geolocation);

	useEffect(() => {
		if (!geolocation.loading) {
			setCachedGeolocation(geolocation);
		}
	}, [setCachedGeolocation, geolocation]);

	return cachedGeolocation;
};
