import { useGeolocation } from './useGeolocation';
import { useSpecifiedLocation } from './useSpecifiedLocation';

export type LatLong = { lat: string; long: string };
export type PartialLatLong = Partial<LatLong>;

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
