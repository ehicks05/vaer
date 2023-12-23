import { useOneCall } from '@/services/openweathermap';
import { useCachedGeolocation } from './useCachedGeolocation';
import { round } from 'lodash';

export const useOpenWeatherMap = () => {
	const geolocation = useCachedGeolocation();
	const { latitude, longitude } = geolocation || {};

	const oneCallQuery = useOneCall({
		lat:
			latitude !== null && latitude !== undefined ? round(latitude, 4) : undefined,
		long:
			longitude !== null && longitude !== undefined
				? round(longitude, 4)
				: undefined,
	});

	return {
		geolocation,
		oneCallQuery,
	};
};
