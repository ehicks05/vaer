import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { PartialLatLong } from '@/hooks/useResolvedLatLong';
import { ONE_DAY } from '../../constants/datetime';
import { APP_KEY, BASE } from './constants';
import type { ReverseGeoResponse } from './types/reverseGeo';

const getReverseGeo = async ({ lat, long }: PartialLatLong) => {
	if (lat === undefined || long === undefined) {
		throw new Error('Missing coordinates');
	}

	const params = new URLSearchParams({
		appid: APP_KEY,
		lat,
		lon: long,
	});

	const url = `${BASE}/api/geo/1.0/reverse?${params}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const result: ReverseGeoResponse = await response.json();
	return result;
};

export const useReverseGeo = ({ lat, long }: PartialLatLong) => {
	return useQuery({
		queryKey: ['reverseGeo', lat, long],
		queryFn: async () => getReverseGeo({ lat, long }),
		enabled: lat !== undefined && long !== undefined,
		staleTime: ONE_DAY,
		gcTime: ONE_DAY,
		placeholderData: keepPreviousData,
	});
};
