import { operations } from '@/generated/schema';
import { useQuery } from '@tanstack/react-query';

interface Params {
	url?: string | null;
}

const getGridpoint = async ({ url }: Params) => {
	if (url === null || url === undefined) {
		throw new Error('Missing url');
	}

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Network response was not ok');
	}

	const result: operations['gridpoint']['responses']['200']['content']['application/geo+json'] =
		await response.json();
	return result;
};

export const useGetGridpoint = ({ url }: Params) => {
	return useQuery({
		queryKey: ['gridpoint', url],
		queryFn: async () => getGridpoint({ url }),
		enabled: url !== null && url !== undefined,
		staleTime: 1000 * 60 * 5,
	});
};
