import { useOpenMeteoForecast } from '@/services/openMeteo';
import { useResolvedLatLong } from './useResolvedLatLong';

export const useOpenMeteo = () => {
	const { lat, long } = useResolvedLatLong();

	const openMeteo = useOpenMeteoForecast({ lat, long });

	return { openMeteo };
};
