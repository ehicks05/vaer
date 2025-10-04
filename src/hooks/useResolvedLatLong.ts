import { useActiveLocation } from './useActiveLocation';
import { useGeolocation } from './useGeolocation';

export type PartialLatLong = Partial<{ lat: string; long: string }>;

/**
 *
 * @returns The `{ lat, long }` of the `activeLocation` if present, or the
 * system geolocation if no `activeLocation` is present
 */
export const useResolvedLatLong = (): PartialLatLong => {
	const { latitude: geoLat, longitude: geoLong } = useGeolocation().coords || {};
	const [activeLocation] = useActiveLocation();

	const { lat, long } = activeLocation
		? { lat: activeLocation.lat, long: activeLocation.lng }
		: {
				lat: geoLat ? String(geoLat) : undefined,
				long: geoLong ? String(geoLong) : undefined,
			};

	return { lat, long };
};
