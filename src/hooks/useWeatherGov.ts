import { useGetAlerts, useGetPoint } from '@/services/weathergov';
import { useResolvedLatLong } from './useResolvedLatLong';

export const useWeatherGov = () => {
	const { lat, long } = useResolvedLatLong();

	const alertsQuery = useGetAlerts({ lat, long });
	const pointQuery = useGetPoint({ lat, long });

	return { alertsQuery, pointQuery };
};
