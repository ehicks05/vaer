import { useLocalStorage } from '@uidotdev/usehooks';
import { useEffect } from 'react';
import { type GeolocationState, useGeolocation } from './useGeolocation';

/**
 * @returns Cached GeolocationState.
 */
export const useCachedGeolocation = () => {
	const geolocation = useGeolocation();
	const [cachedGeolocation, setCachedGeolocation] =
		useLocalStorage<GeolocationState>('vaer-cachedGeolocation', geolocation);

	useEffect(() => {
		if (!geolocation.loading) {
			setCachedGeolocation(geolocation);
		}
	}, [setCachedGeolocation, geolocation]);

	return cachedGeolocation;
};
