export interface OneCallResponse {
	lat: number;
	lon: number;
	timezone: string;
	timezone_offset: number;
	current: Current;
	minutely: Minutely[];
	hourly: Hourly[];
	daily: Daily[];
	alerts: Alert[];
}

export interface Current {
	dt: number;
	sunrise: number;
	sunset: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	uvi: number;
	clouds: number;
	visibility: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust?: number;
	rain?: PrecipitationAmount;
	snow?: PrecipitationAmount;
	weather: WeatherCondition[];
}

export interface WeatherCondition {
	id: number;
	main: string;
	description: string;
	icon: string;
}

export interface Minutely {
	dt: number;
	precipitation: number;
}

export interface Hourly {
	dt: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	uvi: number;
	clouds: number;
	visibility: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust?: number;
	pop: number;
	rain?: PrecipitationAmount;
	snow?: PrecipitationAmount;
	weather: WeatherCondition[];
}

export interface PrecipitationAmount {
	'1h': number;
}

export interface Daily {
	dt: number;
	sunrise: number;
	sunset: number;
	moonrise: number;
	moonset: number;
	moon_phase: number;
	summary: string;
	temp: Temp;
	feels_like: FeelsLike;
	pressure: number;
	humidity: number;
	dew_point: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust?: number;
	clouds: number;
	uvi: number;
	pop: number;
	rain?: number;
	snow?: number;
	weather: WeatherCondition[];
}

export interface Temp {
	morn: number;
	day: number;
	eve: number;
	night: number;
	min: number;
	max: number;
}

export interface FeelsLike {
	morn: number;
	day: number;
	eve: number;
	night: number;
}

export interface Alert {
	sender_name: string;
	event: string;
	start: number;
	end: number;
	description: string;
	tags: string[];
}
