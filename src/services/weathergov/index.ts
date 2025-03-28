import { useResolvedLatLong } from '@/hooks';
import { useGetAlerts } from './useGetAlerts';
import { useGetPoint } from './useGetPoint';

export const useWeatherGov = () => {
	const { lat, long } = useResolvedLatLong();

	const alertsQuery = useGetAlerts({ lat, long });
	const pointQuery = useGetPoint({ lat, long });

	return { alertsQuery, pointQuery };
};
