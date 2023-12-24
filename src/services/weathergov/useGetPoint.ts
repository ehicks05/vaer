import { useQuery } from '@tanstack/react-query';
import { BASE } from './constants';
import { round } from 'lodash';
import { NOAACordinate } from './types';

interface Params {
	lat?: number | null;
	long?: number | null;
}

const getPoint = async ({ lat, long }: Params) => {
	if (lat === null || lat === undefined || long === null || long === undefined) {
		throw new Error('Missing coordinates');
	}

	const coordinates = `${round(lat, 4)},${round(long, 4)}`;

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
		staleTime: 1000 * 60 * 60 * 24,
	});
};
