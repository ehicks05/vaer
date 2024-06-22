import { useActiveLocation } from './useActiveLocation';
import { useCachedGeolocation } from './useCachedGeolocation';

export type PartialLatLong = Partial<{ lat: string; long: string }>;

/**
 *
 * @returns The `{ lat, long }` of the `activeLocation` if present, or the system geolocation if no `activeLocation` is present
 */
export const useResolvedLocation = (): PartialLatLong => {
	const geolocation = useCachedGeolocation();
	const [activeLocation] = useActiveLocation();

	const { lat, long } = activeLocation
		? { lat: activeLocation.lat, long: activeLocation.lng }
		: {
				lat: geolocation.latitude ? String(geolocation.latitude) : undefined,
				long: geolocation.longitude ? String(geolocation.longitude) : undefined,
		  };

	return { lat, long };
};
