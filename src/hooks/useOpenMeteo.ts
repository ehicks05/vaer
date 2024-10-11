import { useOpenMeteoForecast } from '@/services/openMeteo';
import { useResolvedLocation } from './useResolvedLocation';

export const useOpenMeteo = () => {
	const { lat, long } = useResolvedLocation();

	const openMeteo = useOpenMeteoForecast({ lat, long });

	return { openMeteo };
};
