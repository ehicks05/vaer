// INPUT PARAMS

import type {
	PrecipitationUnit,
	RequestMetadata,
	TemperatureUnit,
	TimeUnit,
	WindSpeedUnit,
} from './shared';

// RESPONSE SHAPE

export interface HourlyUnits {
	temperature_2m: TemperatureUnit;
	time: TimeUnit;
	precipitation: PrecipitationUnit;
	windspeed_10m: WindSpeedUnit;
}

export interface HourlyResponse {
	time: number[];
	temperature_2m: number[];
	relative_humidity_2m: number[];
	apparent_temperature: number[];
	precipitation: number[];
	precipitation_probability: number[];
	weather_code: number[];
	wind_speed_10m: number[];
	wind_direction_10m: number[];
	is_day: number[];
}
export interface Hourly {
	time: number;
	temperature_2m: number;
	relative_humidity_2m: number;
	apparent_temperature: number;
	precipitation: number;
	precipitation_probability: number;
	weather_code: number;
	wind_speed_10m: number;
	wind_direction_10m: number;
	is_day: number;
	// adding clientside
	us_aqi: number;
}

export interface Minutely15Response {
	time: number[];
	precipitation: number[];
}
export interface Minutely15 {
	time: number;
	precipitation: number;
}
export interface Minutely15Units {
	precipitation: PrecipitationUnit;
}

export type DailyResponse = {
	time: number[];
	temperature_2m_max: number[];
	temperature_2m_min: number[];
	apparent_temperature_max: number[];
	apparent_temperature_min: number[];
	weather_code: number[];
	precipitation_sum: number[];
	sunrise: string[];
	sunset: string[];
};
export type Daily = {
	time: number;
	temperature_2m_max: number;
	temperature_2m_min: number;
	apparent_temperature_max: number;
	apparent_temperature_min: number;
	weather_code: number;
	precipitation_sum: number;
	sunrise: string;
	sunset: string;
};

export interface Current {
	time: number;
	interval: number;
	temperature_2m: number;
	apparent_temperature: number;
	weather_code: number;
	is_day: number;
}

export interface OpenMeteoForecast extends RequestMetadata {
	current: Current;
	hourly: HourlyResponse;
	hourly_units: HourlyUnits;
	daily: DailyResponse;
	daily_units: HourlyUnits;
	minutely_15: Minutely15Response;
	minutely_15_units: Minutely15Units;
}
