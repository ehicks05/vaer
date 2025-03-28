import { useLocalStorage } from '@uidotdev/usehooks';
import { round } from 'lodash-es';
import { useEffect } from 'react';
import { type GeolocationState, useGeolocation } from './useGeolocation';

const PRECISION = 2;

const roundCoords = (geolocation: GeolocationState) =>
	geolocation.coords
		? {
				...geolocation,
				coords: {
					...geolocation.coords,
					latitude: round(geolocation.coords.latitude, PRECISION),
					longitude: round(geolocation.coords.longitude, PRECISION),
				},
			}
		: geolocation;

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
				setCachedGeolocation(roundCoords(geolocation));
			}
		}
	}, [setCachedGeolocation, geolocation]);

	return cachedGeolocation;
};
