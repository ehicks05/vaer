import {
	type GeolocationState,
	useGeolocation,
	useLocalStorage,
} from '@uidotdev/usehooks';
import { round } from 'lodash-es';
import { useEffect } from 'react';

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

			const { latitude, longitude } = geolocation;
			const lat =
				latitude !== null && latitude !== undefined
					? round(latitude, PRECISION)
					: null;
			const long =
				longitude !== null && longitude !== undefined
					? round(longitude, PRECISION)
					: null;

			setCachedGeolocation({ ...geolocation, latitude: lat, longitude: long });
		}
	}, [setCachedGeolocation, geolocation]);

	return cachedGeolocation;
};
