import {
	useGetPoint,
	useGetForecast,
	useGetHourlyForecast,
	useGetGridpoint,
	useGetStations,
	useGetStationLatestObservation,
} from '@/services/weathergov';
import { useCachedGeolocation } from './useCachedGeolocation';
import { round } from 'lodash';

export const useWeatherGov = () => {
	const geolocation = useCachedGeolocation();
	const { latitude, longitude } = geolocation || {};

	const pointQuery = useGetPoint({
		lat:
			latitude !== null && latitude !== undefined ? round(latitude, 4) : undefined,
		long:
			longitude !== null && longitude !== undefined
				? round(longitude, 4)
				: undefined,
	});

	// const forecastQuery = useGetForecast({
	// 	url: pointQuery.data?.properties.forecast,
	// });

	// const hourlyForecastQuery = useGetHourlyForecast({
	// 	url: pointQuery.data?.properties.forecastHourly,
	// });

	// const gridpointQuery = useGetGridpoint({
	// 	url: pointQuery.data?.properties.forecastGridData,
	// });

	// const stationsQuery = useGetStations({
	// 	url: pointQuery.data?.properties.observationStations,
	// });

	// const stationLatestObservationQuery = useGetStationLatestObservation({
	// 	stationBaseUrl: stationsQuery.data?.observationStations?.[0],
	// });

	return {
		geolocation,
		pointQuery,
		// forecastQuery,
		// hourlyForecastQuery,
		// gridpointQuery,
		// stationsQuery,
		// stationLatestObservationQuery,
	};
};
