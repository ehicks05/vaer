export const BASE = 'https://api.open-meteo.com';

const FIELDS = {
	CURRENT: ['temperature_2m', 'apparent_temperature', 'is_day', 'weather_code'],
	HOURLY: [
		'temperature_2m',
		'relative_humidity_2m',
		'apparent_temperature',
		'precipitation_probability',
		'precipitation',
		'weather_code',
		'wind_speed_10m',
		'wind_direction_10m',
		'is_day',
	],
	MINUTELY_15: ['precipitation'],
	DAILY: [
		'weather_code',
		'temperature_2m_max',
		'temperature_2m_min',
		'apparent_temperature_max',
		'apparent_temperature_min',
		'sunrise',
		'sunset',
		'precipitation_sum',
		'precipitation_probability_max',
	],
};

export const DEFAULT_PARAMS = {
	// fields we're interested in
	current: FIELDS.CURRENT.join(','),
	minutely_15: FIELDS.MINUTELY_15.join(','),
	hourly: FIELDS.HOURLY.join(','),
	daily: FIELDS.DAILY.join(','),

	// settings
	temperature_unit: 'fahrenheit',
	wind_speed_unit: 'mph',
	precipitation_unit: 'inch',
	// forecast_days: '7', // 0-16
	// forecast_hours: '',
	// forecast_minutely_15: '',
};

export const WMO_CODE_TO_DESCRIPTION: Record<string, string> = {
	0: 'clear sky',
	1: 'mainly clear',
	2: 'partly cloudy',
	3: 'overcast',
	45: 'fog',
	48: 'depositing rime fog',
	51: 'light drizzle',
	53: 'moderate drizzle',
	55: 'dense drizzle',
	56: 'light freezing drizzle',
	57: 'dense freezing drizzle',
	61: 'light rain',
	63: 'moderate rain',
	65: 'heavy rain',
	66: 'light freezing rain',
	67: 'heavy freezing rain',
	71: 'light snow',
	73: 'moderate snow',
	75: 'heavy snow',
	77: 'snow grains',
	80: 'light rain showers',
	81: 'moderate rain showers',
	82: 'violent rain showers',
	85: 'light snow showers',
	86: 'heavy snow showers',
	95: 'thunderstorm',
	96: 'thunderstorm with light hail',
	99: 'thunderstorm with heavy hail',
};
