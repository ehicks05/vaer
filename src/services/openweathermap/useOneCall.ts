import { useQuery } from '@tanstack/react-query';
import { APP_KEY, BASE } from './constants';
import { round } from 'lodash';
import { OneCallResponse } from './types';

interface Params {
	lat?: number | null;
	long?: number | null;
}

const getOneCall = async ({ lat, long }: Params) => {
	if (lat === null || lat === undefined || long === null || long === undefined) {
		throw new Error('Missing coordinates');
	}

	const params = new URLSearchParams({
		appid: APP_KEY,
		units: 'imperial',
		lat: String(round(lat, 4)),
		lon: String(round(long, 4)),
	});

	const url = `${BASE}/3.0/onecall?${params}`;

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
