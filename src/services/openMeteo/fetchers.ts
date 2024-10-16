import type { PartialLatLong } from '@/hooks/useResolvedLatLong';
import {
	AIR_QUALITY_BASE,
	AIR_QUALITY_DEFAULT_PARAMS,
	FORECAST_BASE,
	FORECAST_DEFAULT_PARAMS,
} from './constants';
import type { OpenMeteoAirQuality } from './types/airQuality';
import type { OpenMeteoForecast } from './types/forecast';

export const fetchForecast = async ({ lat, long }: Required<PartialLatLong>) => {
	const params = new URLSearchParams({
		...FORECAST_DEFAULT_PARAMS,
		latitude: lat,
		longitude: long,
	});

	const url = `${FORECAST_BASE}/v1/forecast?${params}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const result: OpenMeteoForecast = await response.json();
	return result;
};

export const fetchAirQuality = async ({ lat, long }: Required<PartialLatLong>) => {
	const params = new URLSearchParams({
		...AIR_QUALITY_DEFAULT_PARAMS,
		latitude: lat,
		longitude: long,
	});

	const url = `${AIR_QUALITY_BASE}/v1/air-quality?${params}`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const result: OpenMeteoAirQuality = await response.json();
	return result;
};
