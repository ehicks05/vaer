import { useGetPoint } from '@/services/weathergov';
import { useCachedGeolocation } from './useCachedGeolocation';
import { useActiveLocation } from './useActiveLocation';

export const useWeatherGov = () => {
	const geolocation = useCachedGeolocation();
	const [activeLocation] = useActiveLocation();

	const { lat, long } = activeLocation
		? { lat: activeLocation.lat, long: activeLocation.lng }
		: { lat: String(geolocation.latitude), long: String(geolocation.longitude) };

	const pointQuery = useGetPoint({ lat, long });

	return {
		geolocation,
		pointQuery,
	};
};
