import type { PartialLatLong } from '@/hooks/useResolvedLatLong';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ONE_DAY, ONE_MINUTE } from '../../constants/datetime';
import { APP_KEY, BASE } from './constants';
import type { AirPollutionResponse } from './types/airPollution';

const getAirPollution = async ({ lat, long }: PartialLatLong) => {
	if (lat === undefined || long === undefined) {
		throw new Error('Missing coordinates');
	}

	const params = new URLSearchParams({
		appid: APP_KEY,
		lat,
		lon: long,
	});

	const path = '/api/data/2.5/air_pollution';
	const currentUrl = `${BASE}${path}?${params}`;
	const forecastUrl = `${BASE}${path}/forecast?${params}`;

	const [currentResponse, forecastResponse] = await Promise.all([
		fetch(currentUrl),
		fetch(forecastUrl),
	]);
	if (!currentResponse.ok || !forecastResponse.ok) {
		throw new Error('Network response was not ok');
	}

	const [current, forecast]: AirPollutionResponse[] = await Promise.all([
		currentResponse.json(),
		forecastResponse.json(),
	]);
	return {
		current: {
			...current,
			list: current.list.map((o) => ({ ...o, dt: o.dt * 1000 })),
		},
		forecast: {
			...forecast,
			list: forecast.list.map((o) => ({ ...o, dt: o.dt * 1000 })),
		},
	};
};

export const useAirPollution = ({ lat, long }: PartialLatLong) => {
	return useQuery({
		queryKey: ['airPollution', lat, long],
		queryFn: async () => getAirPollution({ lat, long }),
		enabled: lat !== undefined && long !== undefined,
		staleTime: ONE_MINUTE,
		gcTime: ONE_DAY,
		placeholderData: keepPreviousData,
	});
};
