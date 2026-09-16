import { useQuery } from '@tanstack/react-query';
import { ONE_DAY } from '../../constants/datetime';
import type { SearchResult } from './types';

const BASE = 'https://secure.geonames.org/findNearbyPlaceNameJSON';

const DEFAULTS = {
	maxRows: '5',
	style: 'FULL',
	username: import.meta.env.VITE_GEONAMES_USERNAME,
};

interface Params {
	lat: string;
	lng: string;
}

const findNearbyPlaceName = async ({ lat, lng }: Params) => {
	const params = new URLSearchParams({ ...DEFAULTS, lat, lng });
	const url = `${BASE}?${params}`;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const result: SearchResult = await response.json();
	return result;
};

interface HookParams {
	lat?: number;
	lng?: number;
}

export const useFindNearbyPlaceName = ({ lat, lng }: HookParams) => {
	return useQuery({
		queryKey: ['findNearbyPlaceName', lat, lng],
		queryFn: async () => findNearbyPlaceName({ lat: String(lat), lng: String(lng) }),
		enabled: lat !== undefined && lng !== undefined,
		staleTime: ONE_DAY,
		gcTime: ONE_DAY,
	});
};
