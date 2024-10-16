import { mmToInch } from './utils';
import type { PartialLatLong } from '@/hooks/useResolvedLatLong';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ONE_DAY, ONE_MINUTE } from '../../constants/datetime';
import { APP_KEY, BASE } from './constants';
import type { FiveDayResponse } from './types/fiveDay';

const getFiveDay = async ({ lat, long }: PartialLatLong) => {
	if (lat === undefined || long === undefined) {
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

export const useFiveDay = ({ lat, long }: PartialLatLong) => {
	return useQuery({
		queryKey: ['fiveDay', lat, long],
		queryFn: async () => getFiveDay({ lat, long }),
		enabled: lat !== undefined && long !== undefined,
		staleTime: ONE_MINUTE,
		gcTime: ONE_DAY,
		placeholderData: keepPreviousData,
	});
};
