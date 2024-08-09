import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { HALF_HOUR, ONE_DAY } from '../../constants/datetime';
import { BASE, SHARED_PARAMS } from './constants';
import type { SearchResult } from './types';

interface Params {
	query: string;
}

export const search = async ({ query }: Params): Promise<SearchResult> => {
	const params = new URLSearchParams({
		...SHARED_PARAMS,
		name_startsWith: query,
		countryBias: 'US',
		featureClass: 'P',
		orderby: 'population',
		maxRows: '7',
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
		staleTime: HALF_HOUR,
		gcTime: ONE_DAY,
		placeholderData: keepPreviousData,
	});
};
