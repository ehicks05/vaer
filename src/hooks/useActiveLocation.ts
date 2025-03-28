import type { Geoname } from '@/services/geonames/types';
import { useLocalStorage } from '@uidotdev/usehooks';

const key = 'vaer-active-location';

/**
 *
 * @returns The Geoname result of the user's active location. If the user has
 * selected 'Current Location', this will be undefined.
 */
export const useActiveLocation = () => {
	return useLocalStorage<Geoname | undefined>(key, undefined);
};
