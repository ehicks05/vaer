import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { PartialLatLong } from '@/hooks/useResolvedLatLong';
import { ONE_DAY, ONE_MINUTE } from '../../constants/datetime';
import { BASE } from './constants';
import type { AlertsResponse } from './types/alerts';

const getAlerts = async ({ lat, long }: PartialLatLong) => {
	if (lat === undefined || long === undefined) {
		throw new Error('Missing coordinates');
	}

	const coordinates = `${lat},${long}`;

	const url = `${BASE}/alerts/active?point=${coordinates}`;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const result: AlertsResponse = await response.json();
	return result;
};

export const useGetAlerts = ({ lat, long }: PartialLatLong) => {
	return useQuery({
		queryKey: ['alerts', lat, long],
		queryFn: async () => getAlerts({ lat, long }),
		enabled: lat !== undefined && long !== undefined,
		staleTime: ONE_MINUTE,
		gcTime: ONE_DAY,
		placeholderData: keepPreviousData,
	});
};
