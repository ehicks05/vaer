import { useQuery } from '@tanstack/react-query';
import { APP_KEY, BASE } from './constants';
import { OneCallResponse } from './types/oneCall';

interface Params {
	lat?: string | null;
	long?: string | null;
}

const getOneCall = async ({ lat, long }: Params) => {
	if (lat === null || lat === undefined || long === null || long === undefined) {
		throw new Error('Missing coordinates');
	}

	const params = new URLSearchParams({
		appid: APP_KEY,
		units: 'imperial',
		lat,
		lon: long,
	});

	const url = `${BASE}/api/data/3.0/onecall?${params}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const result: OneCallResponse = await response.json();
	return result;
};

export const useOneCall = ({ lat, long }: Params) => {
	return useQuery({
		queryKey: ['oneCall', lat, long],
		queryFn: async () => getOneCall({ lat, long }),
		enabled:
			lat !== null && lat !== undefined && long !== null && long !== undefined,
		staleTime: 1000 * 60 * 30,
	});
};
