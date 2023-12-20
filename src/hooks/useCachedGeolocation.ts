import {
	GeolocationState,
	useGeolocation,
	useLocalStorage,
} from '@uidotdev/usehooks';
import { useEffect } from 'react';

export const useCachedGeolocation = () => {
	const geolocation = useGeolocation();
	const [cachedGeolocation, setCachedGeolocation] = useLocalStorage<
		GeolocationState | undefined
	>('vaer-cachedGeolocation', undefined);

	useEffect(() => {
		if (!geolocation.loading) {
			setCachedGeolocation(geolocation);
		}
	}, [setCachedGeolocation, geolocation]);

	return cachedGeolocation;
};
