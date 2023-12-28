import { useAirPollution, useOneCall } from '@/services/openweathermap';
import { useCachedGeolocation } from './useCachedGeolocation';
import { useActiveLocation } from './useActiveLocation';

/**
 *
 * @returns Various OWM queries, with lat and long set to activeLocation if present,
 * otherwise current geolocation.
 */
export const useOpenWeatherMap = () => {
	const geolocation = useCachedGeolocation();
	const [activeLocation] = useActiveLocation();

	const { lat, long } = activeLocation
		? { lat: activeLocation.lat, long: activeLocation.lng }
		: { lat: String(geolocation.latitude), long: String(geolocation.longitude) };

	const oneCallQuery = useOneCall({ lat, long });
	const airPollutionQuery = useAirPollution({ lat, long });

	return {
		geolocation,
		oneCallQuery,
		airPollutionQuery,
	};
};
