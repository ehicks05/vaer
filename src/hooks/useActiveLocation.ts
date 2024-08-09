import type { SearchResultGeoname } from '@/services/geonames/types';
import { useLocalStorage } from '@uidotdev/usehooks';

export type ActiveLocation = SearchResultGeoname | undefined;
const key = 'vaer-active-location';

/**
 *
 * @returns The Geoname result of the user's active location. If the user has selected 'Current Location', this will be undefined.
 */
export const useActiveLocation = () => {
	return useLocalStorage<ActiveLocation>(key, undefined);
};
