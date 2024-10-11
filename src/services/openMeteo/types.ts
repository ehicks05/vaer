// INPUT PARAMS

// RESPONSE SHAPE

export type TimeUnit = 'iso8601';
export type TemperatureUnit = '°C' | '°F';
export type PrecipitationUnit = 'mm';
export type WindSpeedUnit = 'km/h';
export type ShortwaveRadiationUnit = 'W/m²';

export interface HourlyUnits {
	temperature_2m: TemperatureUnit;
	time: TimeUnit;
	precipitation: PrecipitationUnit;
	windspeed_10m: WindSpeedUnit;
}

export interface HourlyResponse {
	time: string[];
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
	time: string;
	temperature_2m: number;
	relative_humidity_2m: number;
	apparent_temperature: number;
	precipitation: number;
	precipitation_probability: number;
	weather_code: number;
	wind_speed_10m: number;
	wind_direction_10m: number;
	is_day: number;
}

export interface Minutely15Response {
	time: string[];
	precipitation: number[];
}
export interface Minutely15 {
	time: string;
	precipitation: number;
}
export interface Minutely15Units {
	precipitation: PrecipitationUnit;
}

export type DailyResponse = {
	time: string[];
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
	time: string;
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
	time: string;
	interval: number;
	temperature_2m: number;
	apparent_temperature: number;
	weather_code: number;
	is_day: number;
}

export interface OpenMeteoForecast {
	latitude: number;
	longitude: number;
	elevation: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	timezone_abbreviation: string;

	current: Current;
	hourly: HourlyResponse;
	hourly_units: HourlyUnits;
	daily: DailyResponse;
	daily_units: HourlyUnits;
	minutely_15: Minutely15Response;
	minutely_15_units: Minutely15Units;
}

/**
daily MISSING:
moonrise moonset
moon phase
pressure (for the day?)
air quality
*/
