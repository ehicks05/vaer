import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { LatLong } from '@/hooks/useResolvedLocation';
import { ONE_DAY, ONE_MINUTE } from '../../constants/datetime';
import type { AlertsResponse } from './types';

const BASE = 'https://api.weather.gov/alerts/active';

const getAlerts = async ({ lat, long }: Partial<LatLong>) => {
	if (lat === undefined || long === undefined) {
		throw new Error('Missing coordinates');
	}

	const params = new URLSearchParams({ point: `${lat},${long}` });

	const url = `${BASE}?${params}`;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const result: AlertsResponse = await response.json();
	return result;
};

export const useGetAlerts = ({ lat, long }: Partial<LatLong>) => {
	return useQuery({
		queryKey: ['alerts', lat, long],
		queryFn: async () => getAlerts({ lat, long }),
		enabled: lat !== undefined && long !== undefined,
		staleTime: ONE_MINUTE,
		gcTime: ONE_DAY,
		placeholderData: keepPreviousData,
		refetchInterval: ONE_MINUTE * 5,
	});
};
