import { useActiveLocation } from './useActiveLocation';
import { useCachedGeolocation } from './useCachedGeolocation';
import { useWeatherGov } from './useWeatherGov';

interface Location {
	lat?: number;
	long?: number;
	city: string;
	state: string;
	tz: string;
}

export type PartialLatLong = Partial<{ lat: string; long: string }>;

/**
 *
 * @returns The `{ lat, long }` of the `activeLocation` if present, or the system geolocation if no `activeLocation` is present
 */
export const useResolvedLocation = (): Location => {
	const { latitude: geoLat, longitude: geoLong } =
		useCachedGeolocation().coords || {};
	const { pointQuery } = useWeatherGov();
	const [activeLocation] = useActiveLocation();

	const { lat, long, tz } = activeLocation
		? {
				lat: activeLocation.lat,
				long: activeLocation.lng,
				tz: activeLocation.timezone,
			}
		: {
				lat: geoLat ? String(geoLat) : undefined,
				long: geoLong ? String(geoLong) : undefined,
				tz: '',
			};

	return { lat, long };
};
