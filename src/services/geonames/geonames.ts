import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { ONE_DAY, ONE_MINUTE } from '../../constants/datetime';
import { BASE } from './constants';
import type { SearchResult } from './types';

const DEFAULTS = {
	countryBias: 'US',
	featureClass: 'P',
	maxRows: '7',
	orderby: 'population',
	style: 'FULL',
	username: import.meta.env.VITE_GEONAMES_USERNAME,
};

interface Params {
	query: string;
}

export const search = async ({ query }: Params): Promise<SearchResult> => {
	const params = new URLSearchParams({
		...DEFAULTS,
		name_startsWith: query,
	});
	const url = `${BASE}/searchJSON?${params}`;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const result: SearchResult = await response.json();
	return result;
};

export const useSearch = ({ query: _query }: Params) => {
	const query = useDebounce(_query, 500);

	return useQuery({
		queryKey: ['searchGeonames', query],
		queryFn: async () => search({ query }),
		enabled: query.length >= 3,
		staleTime: ONE_MINUTE,
		gcTime: ONE_DAY,
		placeholderData: keepPreviousData,
	});
};
