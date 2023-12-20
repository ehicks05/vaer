import {
	useGetPoint,
	useGetForecast,
	useGetHourlyForecast,
	useGetGridpoint,
	useGetStations,
	useGetStationLatestObservation,
} from '@/services/weather';
import { useCachedGeolocation } from './useCachedGeolocation';

export const useWeather = () => {
	const geolocation = useCachedGeolocation();
	const { latitude: lat, longitude: long } = geolocation || {};

	const pointQuery = useGetPoint({
		lat,
		long,
	});

	const forecastQuery = useGetForecast({
		url: pointQuery.data?.properties.forecast,
	});

	const hourlyForecastQuery = useGetHourlyForecast({
		url: pointQuery.data?.properties.forecastHourly,
	});

	const gridpointQuery = useGetGridpoint({
		url: pointQuery.data?.properties.forecastGridData,
	});

	const stationsQuery = useGetStations({
		url: pointQuery.data?.properties.observationStations,
	});

	const stationLatestObservationQuery = useGetStationLatestObservation({
		stationBaseUrl: stationsQuery.data?.observationStations?.[0],
	});

	return {
		geolocation,
		pointQuery,
		forecastQuery,
		hourlyForecastQuery,
		gridpointQuery,
		stationsQuery,
		stationLatestObservationQuery,
	};
};
