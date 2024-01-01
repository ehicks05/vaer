import { useAirPollution, useFiveDay, useOneCall } from '@/services/openweathermap';
import { useCachedGeolocation } from './useCachedGeolocation';
import { useActiveLocation } from './useActiveLocation';

/**
 *
 * @returns Various OWM queries, with lat and long set to activeLocation if present,
 * otherwise current geolocation.
 */
export const useOpenWeatherMap = () => {
	// TODO: consider a new hook that wraps these two:
	const geolocation = useCachedGeolocation();
	const [activeLocation] = useActiveLocation();

	const { lat, long } = activeLocation
		? { lat: activeLocation.lat, long: activeLocation.lng }
		: { lat: String(geolocation.latitude), long: String(geolocation.longitude) };

	const oneCallQuery = useOneCall({ lat, long });
	const airPollutionQuery = useAirPollution({ lat, long });

	return { oneCallQuery, airPollutionQuery };
};

/**
 *
 * @returns Separate hook for a forecast query that won't
 * run on page-load
 */
export const useOpenWeatherMapFiveDay = () => {
	const geolocation = useCachedGeolocation();
	const [activeLocation] = useActiveLocation();

	const { lat, long } = activeLocation
		? { lat: activeLocation.lat, long: activeLocation.lng }
		: { lat: String(geolocation.latitude), long: String(geolocation.longitude) };

	const fiveDayQuery = useFiveDay({ lat, long });

	return { fiveDayQuery };
};
