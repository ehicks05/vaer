import { useQuery } from '@tanstack/react-query';
import { APP_KEY, BASE } from './constants';
import { ReverseGeoResponse } from './types/reverseGeo';

interface Params {
	lat?: string | null;
	long?: string | null;
}

const getReverseGeo = async ({ lat, long }: Params) => {
	if (lat === null || lat === undefined || long === null || long === undefined) {
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

export const useReverseGeo = ({ lat, long }: Params) => {
	return useQuery({
		queryKey: ['reverseGeo', lat, long],
		queryFn: async () => getReverseGeo({ lat, long }),
		enabled:
			lat !== null && lat !== undefined && long !== null && long !== undefined,
		staleTime: 1000 * 60 * 60 * 24,
		gcTime: 1000 * 60 * 60 * 24,
	});
};
