import { components } from '@/generated/schema';
import { useQuery } from '@tanstack/react-query';

interface Params {
	url?: string | null;
}

const getForecast = async ({ url }: Params) => {
	if (url === null || url === undefined) {
		throw new Error('Missing url');
	}

	const response = await fetch(url, {
		headers: { 'Feature-Flags': 'forecast_temperature_qv' },
	});
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const result: components['responses']['GridpointForecast']['content']['application/geo+json'] =
		await response.json();
	return result;
};

export const useGetForecast = ({ url }: Params) => {
	return useQuery({
		queryKey: ['forecast', url],
		queryFn: async () => getForecast({ url }),
		enabled: url !== null && url !== undefined,
		staleTime: 1000 * 60 * 5,
	});
};
