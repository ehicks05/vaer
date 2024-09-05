import { mmToInch } from '@/app/utils';
import type { PartialLatLong } from '@/hooks/useResolvedLocation';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { HALF_HOUR, ONE_DAY } from '../../constants/datetime';
import { APP_KEY, BASE } from './constants';
import type { OneCallResponse } from './types/oneCall';

const getOneCall = async ({ lat, long }: PartialLatLong) => {
	if (lat === undefined || long === undefined) {
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
	return {
		...result,
		alerts: (result.alerts || []).map((o) => ({
			...o,
			start: o.start * 1000,
			end: o.end * 1000,
		})),
		current: {
			...result.current,
			dt: result.current.dt * 1000,
			sunrise: result.current.sunrise * 1000,
			sunset: result.current.sunset * 1000,
			rain: { '1h': mmToInch(result.current.rain?.['1h']) },
			snow: { '1h': mmToInch(result.current.snow?.['1h']) },
		},
		daily: result.daily.map((o) => ({
			...o,
			dt: o.dt * 1000,
			moonrise: o.moonrise * 1000,
			moonset: o.moonset * 1000,
			sunrise: o.sunrise * 1000,
			sunset: o.sunset * 1000,
			rain: mmToInch(o.rain),
			snow: mmToInch(o.snow),
		})),
		hourly: result.hourly.map((o) => ({
			...o,
			dt: o.dt * 1000,
			rain: { '1h': mmToInch(o.rain?.['1h']) },
			snow: { '1h': mmToInch(o.snow?.['1h']) },
		})),
		minutely: result.minutely.map((o) => ({
			...o,
			dt: o.dt * 1000,
			precipitation: mmToInch(o.precipitation),
		})),
	};
};

export const useOneCall = ({ lat, long }: PartialLatLong) => {
	return useQuery({
		queryKey: ['oneCall', lat, long],
		queryFn: async () => getOneCall({ lat, long }),
		enabled: lat !== undefined && long !== undefined,
		staleTime: HALF_HOUR,
		gcTime: ONE_DAY,
		placeholderData: keepPreviousData,
	});
};
