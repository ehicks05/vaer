import { operations } from '@/generated/schema';
import { useQuery } from '@tanstack/react-query';

interface Params {
	url?: string | null;
}

const getHourlyForecast = async ({ url }: Params) => {
	if (url === null || url === undefined) {
		throw new Error('Missing url');
	}

	const response = await fetch(url, {
		headers: { 'Feature-Flags': 'forecast_temperature_qv' },
	});
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const result: operations['gridpoint_forecast_hourly']['responses']['200']['content']['application/geo+json'] =
		await response.json();
	return result;
};

export const useGetHourlyForecast = ({ url }: Params) => {
	return useQuery({
		queryKey: ['hourlyForecast', url],
		queryFn: async () => getHourlyForecast({ url }),
		enabled: url !== null && url !== undefined,
		staleTime: 1000 * 60 * 5,
		refetchInterval: 1000 * 60 * 5,
	});
};
