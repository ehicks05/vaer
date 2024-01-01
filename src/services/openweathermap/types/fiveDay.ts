export interface FiveDayResponse {
	cod: string;
	message: number;
	cnt: number;
	list: ThreeHourForecast[];
	city: City;
}

export interface ThreeHourForecast {
	dt: number;
	main: Main;
	weather: Weather[];
	clouds: Clouds;
	wind: Wind;
	visibility: number;
	pop: number;
	rain?: PrecipitationAmount;
	snow?: PrecipitationAmount;
	sys: Sys;
	dt_txt: string;
}

export interface Main {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	sea_level: number;
	grnd_level: number;
	humidity: number;
	temp_kf: number;
}

export interface Weather {
	id: number;
	main: string;
	description: string;
	icon: string;
}

export interface Clouds {
	all: number;
}

export interface Wind {
	speed: number;
	deg: number;
	gust: number;
}

export interface PrecipitationAmount {
	'3h': number;
}

export interface Sys {
	pod: string;
}

export interface City {
	id: number;
	name: string;
	coord: Coord;
	country: string;
	population: number;
	timezone: number;
	sunrise: number;
	sunset: number;
}

export interface Coord {
	lat: number;
	lon: number;
}
