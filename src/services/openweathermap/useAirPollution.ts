import { useQuery } from '@tanstack/react-query';
import { APP_KEY, BASE } from './constants';
import { AirPollutionResponse } from './types/airPollution';

interface Params {
	lat?: string | null;
	long?: string | null;
}

const getAirPollution = async ({ lat, long }: Params) => {
	if (lat === null || lat === undefined || long === null || long === undefined) {
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

export const useAirPollution = ({ lat, long }: Params) => {
	return useQuery({
		queryKey: ['airPollution', lat, long],
		queryFn: async () => getAirPollution({ lat, long }),
		enabled:
			lat !== null && lat !== undefined && long !== null && long !== undefined,
		staleTime: 1000 * 60 * 30,
		gcTime: 1000 * 60 * 60 * 24,
	});
};
