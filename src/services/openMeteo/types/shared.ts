export type TimeUnit = 'iso8601';
export type TemperatureUnit = '°C' | '°F';
export type PrecipitationUnit = 'mm';
export type WindSpeedUnit = 'km/h';
export type ShortwaveRadiationUnit = 'W/m²';

export interface RequestMetadata {
	latitude: number;
	longitude: number;
	elevation: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	timezone_abbreviation: string;
}
