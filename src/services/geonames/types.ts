export interface Timezone {
	gmtOffset: number;
	timeZoneId: string;
	dstOffset: number;
}

export interface Bbox {
	east: number;
	south: number;
	north: number;
	west: number;
	accuracyLevel: number;
}

export interface AdminCodes1 {
	ISO3166_2: string;
}

export interface AlternateName {
	name: string;
	lang: string;
	isPreferredName?: boolean;
	isShortName?: boolean;
}

export interface Geoname {
	timezone: Timezone;
	bbox: Bbox;
	asciiName: string;
	astergdem: number;
	countryId: string;
	fcl: string;
	srtm3: number;
	adminId2: string;
	countryCode: string;
	adminCodes1: AdminCodes1;
	adminId1: string;
	lat: string;
	fcode: string;
	continentCode: string;
	elevation: number;
	adminCode2: string;
	adminCode1: string;
	lng: string;
	geonameId: number;
	toponymName: string;
	population: number;
	adminName5: string;
	adminName4: string;
	adminName3: string;
	alternateNames: AlternateName[];
	adminName2: string;
	name: string;
	fclName: string;
	countryName: string;
	fcodeName: string;
	adminName1: string;
}

export interface SearchResult {
	geonames: Geoname[];
	totalResultsCount: number;
}
