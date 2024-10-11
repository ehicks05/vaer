import { mmToInch } from '@/app/utils';
import type { PartialLatLong } from '@/hooks/useResolvedLocation';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ONE_DAY, ONE_MINUTE } from '../../constants/datetime';
import { BASE, DEFAULT_PARAMS, WMO_CODE_TO_DESCRIPTION } from './constants';
import type { Daily, Hourly, Minutely15, OpenMeteoForecast } from './types';

const getForecast = async ({ lat, long }: PartialLatLong) => {
	if (lat === undefined || long === undefined) {
		throw new Error('Missing coordinates');
	}

	const params = new URLSearchParams({
		...DEFAULT_PARAMS,
		latitude: lat,
		longitude: long,
		// timezone: '',
	});

	const url = `${BASE}/v1/forecast?${params}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const result: OpenMeteoForecast = await response.json();

	const minutely_15 = result.minutely_15.time.reduce(
		(agg, curr, i) => [
			...agg,
			{
				time: curr,
				precipitation: result.minutely_15.precipitation[i],
			},
		],
		[] as Minutely15[],
	);

	const hourly = result.hourly.time.reduce(
		(agg, curr, i) => [
			...agg,
			{
				time: curr,
				temperature_2m: result.hourly.temperature_2m[i],
				relative_humidity_2m: result.hourly.relative_humidity_2m[i],
				apparent_temperature: result.hourly.apparent_temperature[i],
				precipitation: result.hourly.precipitation[i],
				precipitation_probability: result.hourly.precipitation_probability[i],
				weather_code: result.hourly.weather_code[i],
				wind_speed_10m: result.hourly.wind_speed_10m[i],
				wind_direction_10m: result.hourly.wind_direction_10m[i],
				is_day: result.hourly.is_day[i],
			},
		],
		[] as Hourly[],
	);

	const daily = result.daily.time.reduce(
		(agg, curr, i) => [
			...agg,
			{
				time: curr,
				temperature_2m_max: result.daily.temperature_2m_max[i],
				temperature_2m_min: result.daily.temperature_2m_min[i],
				apparent_temperature_max: result.daily.apparent_temperature_max[i],
				apparent_temperature_min: result.daily.apparent_temperature_min[i],
				weather_code: result.daily.weather_code[i],
				precipitation_sum: result.daily.precipitation_sum[i],
				sunrise: result.daily.sunrise[i],
				sunset: result.daily.sunset[i],
			},
		],
		[] as Daily[],
	);

	return {
		...result,
		current: {
			dt: result.current.time,
			temp: result.current.temperature_2m,
			feelsLike: result.current.apparent_temperature,
			isDay: !!result.current.is_day,
			weather: {
				id: result.current.weather_code,
				description: WMO_CODE_TO_DESCRIPTION[result.current.weather_code],
				icon: `${result.current.weather_code}-${result.current.is_day ? 'day' : 'night'}`,
			},
		},
		daily: daily.map((o) => ({
			...o,
			dt: o.time,
		})),
		hourly: hourly.map((o) => ({
			...o,
			dt: o.time,
		})),
		minutely: minutely_15.map((o) => ({
			...o,
			dt: o.time,
			precipitation: mmToInch(o.precipitation),
		})),
	};
};

export const useOpenMeteoForecast = ({ lat, long }: PartialLatLong) => {
	return useQuery({
		queryKey: ['openMeteoForecast', lat, long],
		queryFn: async () => getForecast({ lat, long }),
		enabled: lat !== undefined && long !== undefined,
		staleTime: ONE_DAY,
		gcTime: ONE_DAY,
		placeholderData: keepPreviousData,
	});
};
