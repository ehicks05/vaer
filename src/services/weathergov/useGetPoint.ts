import type { PartialLatLong } from '@/hooks/useResolvedLocation';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ONE_DAY } from '../../constants/datetime';
import { BASE } from './constants';
import type { NOAACordinate } from './types';

const getPoint = async ({ lat, long }: PartialLatLong) => {
	if (lat === undefined || long === undefined) {
		throw new Error('Missing coordinates');
	}

	const coordinates = `${lat},${long}`;

	const url = `${BASE}/points/${coordinates}`;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const result: NOAACordinate = await response.json();
	return result;
};

export const useGetPoint = ({ lat, long }: PartialLatLong) => {
	return useQuery({
		queryKey: ['point', lat, long],
		queryFn: async () => getPoint({ lat, long }),
		enabled: lat !== undefined && long !== undefined,
		staleTime: ONE_DAY,
		gcTime: ONE_DAY,
		placeholderData: keepPreviousData,
	});
};
