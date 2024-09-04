import { useLocalStorage } from '@uidotdev/usehooks';
import { round } from 'lodash-es';
import { useEffect } from 'react';
import { type GeolocationState, useGeolocation } from './useGeolocation';

const PRECISION = 3;

/**
 *
 * @returns GeolocationState, with lat and long rounded to `PRECISION` places.
 */
export const useCachedGeolocation = () => {
	const geolocation = useGeolocation();
	const [cachedGeolocation, setCachedGeolocation] =
		useLocalStorage<GeolocationState>('vaer-cachedGeolocation', geolocation);

	useEffect(() => {
		if (!geolocation.loading) {
			if (geolocation.error) {
				console.error(geolocation.error);
			}

			if (geolocation.coords) {
				setCachedGeolocation({
					...geolocation,
					coords: {
						...geolocation.coords,
						latitude: round(geolocation.coords.latitude, PRECISION),
						longitude: round(geolocation.coords.longitude, PRECISION),
					},
				});
			}
		}
	}, [setCachedGeolocation, geolocation]);

	return cachedGeolocation;
};
