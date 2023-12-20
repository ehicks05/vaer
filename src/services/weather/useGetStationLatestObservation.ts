import { operations } from '@/generated/schema';
import { useQuery } from '@tanstack/react-query';

interface Params {
	stationBaseUrl?: string | null;
}

const getStationLatestObservation = async ({ stationBaseUrl }: Params) => {
	if (stationBaseUrl === null || stationBaseUrl === undefined) {
		throw new Error('Missing id');
	}

	const response = await fetch(`${stationBaseUrl}/observations/latest`);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const result: operations['station_observation_latest']['responses']['200']['content']['application/geo+json'] =
		await response.json();
	return result;
};

export const useGetStationLatestObservation = ({ stationBaseUrl }: Params) => {
	return useQuery({
		queryKey: ['stationLatestObservation', stationBaseUrl],
		queryFn: async () => getStationLatestObservation({ stationBaseUrl }),
		enabled: stationBaseUrl !== null && stationBaseUrl !== undefined,
		staleTime: 1000 * 60 * 5,
		refetchInterval: 1000 * 60 * 5,
	});
};
