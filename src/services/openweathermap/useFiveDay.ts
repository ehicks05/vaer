import { useQuery } from '@tanstack/react-query';
import { APP_KEY, BASE } from './constants';
import { FiveDayResponse } from './types/fiveDay';
import { mmToInch } from '@/app/utils';

interface Params {
	lat?: string | null;
	long?: string | null;
}

const getFiveDay = async ({ lat, long }: Params) => {
	if (lat === null || lat === undefined || long === null || long === undefined) {
		throw new Error('Missing coordinates');
	}

	const params = new URLSearchParams({
		appid: APP_KEY,
		units: 'imperial',
		lat,
		lon: long,
	});

	const url = `${BASE}/api/data/2.5/forecast?${params}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const result: FiveDayResponse = await response.json();
	return {
		...result,
		list: (result.list || []).map((o) => ({
			...o,
			dt: o.dt * 1000,
			rain: { '3h': mmToInch(o.rain?.['3h']) },
			snow: { '3h': mmToInch(o.snow?.['3h']) },
		})),
		city: {
			...result.city,
			sunrise: result.city.sunrise * 1000,
			sunset: result.city.sunset * 1000,
		},
	};
};

export const useFiveDay = ({ lat, long }: Params) => {
	return useQuery({
		queryKey: ['fiveDay', lat, long],
		queryFn: async () => getFiveDay({ lat, long }),
		enabled:
			lat !== null && lat !== undefined && long !== null && long !== undefined,
		staleTime: 1000 * 60 * 30,
		gcTime: 1000 * 60 * 60 * 24,
	});
};
