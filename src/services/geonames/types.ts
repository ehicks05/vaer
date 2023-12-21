export interface SearchResultGeoname {
	adminCode1: string;
	adminCodes1: { ISO3166_2: string };
	adminName1: string;
	countryCode: string;
	countryId: string;
	countryName: string;
	fcl: string;
	fclName: string;
	fcode: string;
	fcodeName: string;
	geonameId: number;
	lat: string;
	lng: string;
	name: string;
	population: number;
	toponymName: string;
}

export interface SearchResult {
	geonames: SearchResultGeoname[];
	totalResultsCount: number;
}

export interface GetResult {
	timezone: {
		gmtOffset: number;
		timeZoneId: string;
		dstOffset: number;
	};
}

export interface Geoname extends SearchResultGeoname {
	timeZoneId: string;
}
