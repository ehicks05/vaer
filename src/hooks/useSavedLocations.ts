import { useLocalStorage } from 'usehooks-ts';
import type { Geoname } from '@/services/geonames/types';

const key = 'vaer-saved-locations';

export const useSavedLocations = () => {
	return useLocalStorage<Geoname[]>(key, []);
};
