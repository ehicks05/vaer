import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ONE_DAY } from '../../constants/datetime';
import { BASE } from './constants';
import { NOAACordinate } from './types';

interface Params {
	lat?: string | null;
	long?: string | null;
}

const getPoint = async ({ lat, long }: Params) => {
	if (lat === null || lat === undefined || long === null || long === undefined) {
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

export const useGetPoint = ({ lat, long }: Params) => {
	return useQuery({
		queryKey: ['point', lat, long],
		queryFn: async () => getPoint({ lat, long }),
		enabled:
			lat !== null && lat !== undefined && long !== null && long !== undefined,
		staleTime: ONE_DAY,
		gcTime: ONE_DAY,
		placeholderData: keepPreviousData,
	});
};
