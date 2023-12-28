import {
	GeolocationState,
	useGeolocation,
	useLocalStorage,
} from '@uidotdev/usehooks';
import { round } from 'lodash';
import { useEffect } from 'react';

/**
 *
 * @returns GeolocationState, with lat and long rounded to 4 places.
 */
export const useCachedGeolocation = () => {
	const geolocation = useGeolocation();
	const [cachedGeolocation, setCachedGeolocation] =
		useLocalStorage<GeolocationState>('vaer-cachedGeolocation', geolocation);

	useEffect(() => {
		if (!geolocation.loading) {
			const { latitude, longitude } = geolocation;
			const lat =
				latitude !== null && latitude !== undefined ? round(latitude, 4) : null;
			const long =
				longitude !== null && longitude !== undefined ? round(longitude, 4) : null;

			setCachedGeolocation({ ...geolocation, latitude: lat, longitude: long });
		}
	}, [setCachedGeolocation, geolocation]);

	return cachedGeolocation;
};
