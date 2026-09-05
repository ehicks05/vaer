import { useLocalStorage } from 'usehooks-ts';
import type { Geoname } from '@/services/geonames/types';

const key = 'vaer-saved-locations';

export const useSavedLocationStorage = () => {
	return useLocalStorage<Geoname[]>(key, []);
};
