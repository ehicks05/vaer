export interface ReverseGeoResult {
	name: string;
	lat: number;
	lon: number;
	country: string;
	state: string;
}

export type ReverseGeoResponse = ReverseGeoResult[];
