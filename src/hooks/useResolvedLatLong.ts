import { useGeolocation } from './useGeolocation';
import { useSpecifiedLocation } from './useSpecifiedLocation';

export type PartialLatLong = Partial<{ lat: string; long: string }>;

/**
 *
 * @returns The `{ lat, long }` of the `specifiedLocation` if present, or the
 * system geolocation if no `specifiedLocation` is present
 */
export const useResolvedLatLong = (): PartialLatLong => {
	const { latitude: geoLat, longitude: geoLong } = useGeolocation().coords || {};
	const [specifiedLocation] = useSpecifiedLocation();

	const { lat, long } = specifiedLocation
		? { lat: specifiedLocation.lat, long: specifiedLocation.lng }
		: {
				lat: geoLat ? String(geoLat) : undefined,
				long: geoLong ? String(geoLong) : undefined,
			};

	return { lat, long };
};
