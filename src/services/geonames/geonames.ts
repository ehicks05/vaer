import { QueryFunctionContext } from '@tanstack/react-query';
import { SHARED_PARAMS, BASE } from './constants';
import { GetResult, Geoname, SearchResult } from './types';

const get = async (geonameId: string) => {
	const params = new URLSearchParams({
		...SHARED_PARAMS,
		geonameId,
	});
	const url = `${BASE}/getJSON?${params}`;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const getResult: GetResult = await response.json();
	return getResult;
};

export const search = async ({
	queryKey,
}: QueryFunctionContext): Promise<Geoname[]> => {
	const [_key, queryString] = queryKey;
	const params = new URLSearchParams({
		...SHARED_PARAMS,
		name_startsWith: queryString as string,
		countryBias: 'US',
		featureClass: 'P',
		orderby: 'population',
		maxRows: '5',
	});
	const url = `${BASE}/searchJSON?${params}`;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const searchResult: SearchResult = await response.json();
	const getResults = await Promise.all(
		searchResult.geonames.map(({ geonameId }) => get(String(geonameId))),
	);

	return searchResult.geonames.map((geoname, i) => ({
		...geoname,
		timeZoneId: getResults[i].timezone.timeZoneId,
	}));
};

export const searchDEBUG = async () => {
	const cities: Geoname[] = [
		{
			adminCode1: 'FL',
			lng: '-81.71898',
			geonameId: 4155594,
			toponymName: 'Fleming Island',
			countryId: '6252001',
			fcl: 'P',
			population: 27126,
			countryCode: 'US',
			name: 'Fleming Island',
			fclName: 'city, village,...',
			adminCodes1: {
				ISO3166_2: 'FL',
			},
			countryName: 'United States',
			fcodeName: 'populated place',
			adminName1: 'Florida',
			lat: '30.0933',
			fcode: 'PPL',
			timeZoneId: 'America/New_York',
		},
		{
			adminCode1: 'NJ',
			lng: '-74.85933',
			geonameId: 5098124,
			toponymName: 'Flemington',
			countryId: '6252001',
			fcl: 'P',
			population: 4641,
			countryCode: 'US',
			name: 'Flemington',
			fclName: 'city, village,...',
			adminCodes1: {
				ISO3166_2: 'NJ',
			},
			countryName: 'United States',
			fcodeName: 'seat of a second-order administrative division',
			adminName1: 'New Jersey',
			lat: '40.51233',
			fcode: 'PPLA2',
			timeZoneId: 'America/New_York',
		},
		{
			adminCode1: 'KY',
			lng: '-83.73381',
			geonameId: 4291905,
			toponymName: 'Flemingsburg',
			countryId: '6252001',
			fcl: 'P',
			population: 2894,
			countryCode: 'US',
			name: 'Flemingsburg',
			fclName: 'city, village,...',
			adminCodes1: {
				ISO3166_2: 'KY',
			},
			countryName: 'United States',
			fcodeName: 'seat of a second-order administrative division',
			adminName1: 'Kentucky',
			lat: '38.4223',
			fcode: 'PPLA2',
			timeZoneId: 'America/New_York',
		},
		{
			adminCode1: 'NC',
			lng: '-78.50001',
			geonameId: 4474919,
			toponymName: 'Lake Waccamaw',
			countryId: '6252001',
			fcl: 'P',
			population: 1465,
			countryCode: 'US',
			name: 'Flemington',
			fclName: 'city, village,...',
			adminCodes1: {
				ISO3166_2: 'NC',
			},
			countryName: 'United States',
			fcodeName: 'populated place',
			adminName1: 'North Carolina',
			lat: '34.31906',
			fcode: 'PPL',
			timeZoneId: 'America/New_York',
		},
		{
			adminCode1: 'PA',
			lng: '-77.47165',
			geonameId: 5189839,
			toponymName: 'Flemington',
			countryId: '6252001',
			fcl: 'P',
			population: 1339,
			countryCode: 'US',
			name: 'Flemington',
			fclName: 'city, village,...',
			adminCodes1: {
				ISO3166_2: 'PA',
			},
			countryName: 'United States',
			fcodeName: 'populated place',
			adminName1: 'Pennsylvania',
			lat: '41.12646',
			fcode: 'PPL',
			timeZoneId: 'America/New_York',
		},
	];
	return cities;
};
