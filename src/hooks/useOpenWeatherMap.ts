import { useAirPollution, useOneCall } from '@/services/openweathermap';
import { useCachedGeolocation } from './useCachedGeolocation';
import { round } from 'lodash';

export const useOpenWeatherMap = () => {
	const geolocation = useCachedGeolocation();
	const { latitude, longitude } = geolocation || {};

	const lat =
		latitude !== null && latitude !== undefined ? round(latitude, 4) : undefined;
	const long =
		longitude !== null && longitude !== undefined ? round(longitude, 4) : undefined;

	const oneCallQuery = useOneCall({ lat, long });
	const airPollutionQuery = useAirPollution({ lat, long });

	return {
		geolocation,
		oneCallQuery,
		airPollutionQuery,
	};
};
