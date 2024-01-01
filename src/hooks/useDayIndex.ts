import { useLocalStorage } from '@uidotdev/usehooks';

const key = 'vaer-day-index';

export const useDayIndex = () => {
	return useLocalStorage<number | undefined>(key, undefined);
};
