import { useGetPoint } from '@/services/weathergov';
import { useResolvedLatLong } from './useResolvedLatLong';

export const useWeatherGov = () => {
	const { lat, long } = useResolvedLatLong();

	const pointQuery = useGetPoint({ lat, long });

	return { pointQuery };
};
