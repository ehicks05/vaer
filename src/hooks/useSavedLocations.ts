import type { Geoname } from '@/services/geonames/types';
import { useLocalStorage } from '@uidotdev/usehooks';

const key = 'vaer-saved-locations';

export const useSavedLocations = () => {
	return useLocalStorage<Geoname[]>(key, []);
};
