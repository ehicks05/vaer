import { useResolvedLocation } from '@/hooks';
import { useGetAlerts } from './useGetAlerts';

export const useWeatherGov = () => {
	const { lat, long } = useResolvedLocation();

	const alertsQuery = useGetAlerts({ lat, long });

	return { alertsQuery };
};
