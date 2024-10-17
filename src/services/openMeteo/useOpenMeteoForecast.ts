import type { PartialLatLong } from '@/hooks/useResolvedLatLong';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ONE_DAY, ONE_MINUTE } from '../../constants/datetime';
import { WMO_CODE_TO_DESCRIPTION } from './constants';
import { fetchAirQuality, fetchForecast } from './fetchers';
import type { Daily, Hourly, Minutely15 } from './types/forecast';

const getForecast = async ({ lat, long }: PartialLatLong) => {
	if (lat === undefined || long === undefined) {
		throw new Error('Missing coordinates');
	}

	const [forecast, airQuality] = await Promise.all([
		fetchForecast({ lat, long }),
		fetchAirQuality({ lat, long }),
	]);

	const minutely_15 = forecast.minutely_15.time.reduce(
		(agg, curr, i) => [
			...agg,
			{
				time: curr * 1000,
				precipitation: forecast.minutely_15.precipitation[i],
			},
		],
		[] as Minutely15[],
	);

	const hourly = forecast.hourly.time.reduce(
		(agg, curr, i) => [
			...agg,
			{
				time: curr * 1000,
				temperature_2m: forecast.hourly.temperature_2m[i],
				relative_humidity_2m: forecast.hourly.relative_humidity_2m[i],
				apparent_temperature: forecast.hourly.apparent_temperature[i],
				precipitation: forecast.hourly.precipitation[i],
				precipitation_probability: forecast.hourly.precipitation_probability[i],
				weather_code: forecast.hourly.weather_code[i],
				wind_speed_10m: forecast.hourly.wind_speed_10m[i],
				wind_direction_10m: forecast.hourly.wind_direction_10m[i],
				is_day: forecast.hourly.is_day[i],
				us_aqi: airQuality.hourly.us_aqi[i],
			},
		],
		[] as Hourly[],
	);

	const daily = forecast.daily.time.reduce(
		(agg, curr, i) => [
			...agg,
			{
				time: curr * 1000,
				temperature_2m_max: forecast.daily.temperature_2m_max[i],
				temperature_2m_min: forecast.daily.temperature_2m_min[i],
				apparent_temperature_max: forecast.daily.apparent_temperature_max[i],
				apparent_temperature_min: forecast.daily.apparent_temperature_min[i],
				weather_code: forecast.daily.weather_code[i],
				precipitation_sum: forecast.daily.precipitation_sum[i],
				sunrise: forecast.daily.sunrise[i],
				sunset: forecast.daily.sunset[i],
			},
		],
		[] as Daily[],
	);

	const current = {
		time: forecast.current.time * 1000,
		temperature_2m: forecast.current.temperature_2m,
		apparent_temperature: forecast.current.apparent_temperature,
		isDay: !!forecast.current.is_day,
		weather: {
			id: forecast.current.weather_code,
			description: WMO_CODE_TO_DESCRIPTION[forecast.current.weather_code],
			icon: `${forecast.current.weather_code}-${forecast.current.is_day ? 'day' : 'night'}`,
		},
	};

	return {
		...forecast,
		current,
		daily: daily.map((o) => ({
			time: o.time,
			temp: { max: o.temperature_2m_max, min: o.temperature_2m_min },
			weather: {
				id: o.weather_code,
				description: WMO_CODE_TO_DESCRIPTION[o.weather_code],
				icon: `${o.weather_code}-day`,
			},
			precipitation_sum: o.precipitation_sum,
		})),
		hourly,
		minutely_15,
	};
};

export const useOpenMeteoForecast = ({ lat, long }: PartialLatLong) => {
	return useQuery({
		queryKey: ['openMeteoForecast', lat, long],
		queryFn: async () => getForecast({ lat, long }),
		enabled: lat !== undefined && long !== undefined,
		staleTime: ONE_MINUTE,
		gcTime: ONE_DAY,
		placeholderData: keepPreviousData,
	});
};
