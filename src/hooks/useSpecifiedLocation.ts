import { useLocalStorage } from 'usehooks-ts';
import type { Geoname } from '@/services/geonames/types';

const key = 'vaer-specified-location';

/**
 *
 * @returns The Geoname result of the user's specified location. If the user has
 * selected 'Current Location', this will be undefined.
 */
export const useSpecifiedLocation = () => {
	return useLocalStorage<Geoname | undefined>(key, undefined);
};
