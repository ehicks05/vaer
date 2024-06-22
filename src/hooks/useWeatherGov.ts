import { useGetPoint } from '@/services/weathergov';
import { useResolvedLocation } from './useResolvedLocation';

export const useWeatherGov = () => {
	const { lat, long } = useResolvedLocation();

	const pointQuery = useGetPoint({ lat, long });

	return { pointQuery };
};
