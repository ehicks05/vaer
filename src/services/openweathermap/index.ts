import { useResolvedLatLong } from '../../hooks/useResolvedLatLong';
import { useAirPollution } from './useAirPollution';
import { useFiveDay } from './useFiveDay';
import { useOneCall } from './useOneCall';

/**
 *
 * @returns Various OWM queries, with lat and long set to activeLocation if present,
 * otherwise current geolocation.
 */
export const useOpenWeatherMap = () => {
	const { lat, long } = useResolvedLatLong();

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
	const { lat, long } = useResolvedLatLong();

	const fiveDayQuery = useFiveDay({ lat, long });

	return { fiveDayQuery };
};
