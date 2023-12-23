import { operations } from '@/generated/schema';
import { useQuery } from '@tanstack/react-query';

interface Params {
	url?: string | null;
}

const getStations = async ({ url }: Params) => {
	if (url === null || url === undefined) {
		throw new Error('Missing url');
	}

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const result: operations['gridpoint_stations']['responses']['200']['content']['application/geo+json'] =
		await response.json();
	return result;
};

export const useGetStations = ({ url }: Params) => {
	return useQuery({
		queryKey: ['station', url],
		queryFn: async () => getStations({ url }),
		enabled: url !== null && url !== undefined,
		staleTime: 1000 * 60 * 60,
	});
};
