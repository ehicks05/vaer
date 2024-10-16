import type { RequestMetadata, TimeUnit } from './shared';

export interface HourlyUnits {
	time: TimeUnit;
}

export interface HourlyResponse {
	time: number[];
	us_aqi: number[];
}

export interface Hourly {
	time: number;
	us_aqi: number;
}

export interface OpenMeteoAirQuality extends RequestMetadata {
	hourly: HourlyResponse;
	hourly_units: HourlyUnits;
}
