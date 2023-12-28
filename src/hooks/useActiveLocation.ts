import { SearchResultGeoname } from '@/services/geonames/types';
import { useLocalStorage } from '@uidotdev/usehooks';

export type ActiveLocation = SearchResultGeoname | undefined;
const key = 'vaer-active-location';

export const useActiveLocation = () => {
	return useLocalStorage<ActiveLocation>(key, undefined);
};
