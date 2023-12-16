import { operations } from "@/generated/schema";
import { useQuery } from "@tanstack/react-query";

const getHourlyForecast = async ({ url }: Params) => {
  if (url === null || url === undefined) {
    throw new Error('Missing url');
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const result: operations['gridpoint_forecast_hourly']['responses']['200']['content']['application/geo+json'] = await response.json();
  return result;
}

interface Params {
  url?: string | null;
}

export const useGetHourlyForecast = ({ url }: Params) => {
  return useQuery({
    queryKey: ['hourlyForecast', url],
    queryFn: async () => getHourlyForecast({ url }),
    enabled: url !== null && url !== undefined,
    staleTime: 1000 * 60 * 5
  })
}
