import { useActiveLocation } from './useActiveLocation';
import { useCachedGeolocation } from './useCachedGeolocation';

// todo: rethink the naming of this
export const useComputedActiveLocation = () => {
	const geolocation = useCachedGeolocation();
	const [activeLocation] = useActiveLocation();

	const { lat, long } = activeLocation
		? { lat: activeLocation.lat, long: activeLocation.lng }
		: { lat: String(geolocation.latitude), long: String(geolocation.longitude) };

	return { lat, long };
};
