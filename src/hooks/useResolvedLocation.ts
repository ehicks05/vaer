import { useWeatherGov } from '@/services/weathergov';
import { useResolvedLatLong } from './useResolvedLatLong';
import { useSpecifiedLocation } from './useSpecifiedLocation';

interface Location {
	lat?: string;
	long?: string;
	city?: string;
	state?: string;
	tz?: string;
}

export const useResolvedLocation = (): Location => {
	const { lat, long } = useResolvedLatLong();
	const { pointQuery } = useWeatherGov();
	const [specifiedLocation] = useSpecifiedLocation();

	const { tz, city, state } = specifiedLocation
		? {
				city: specifiedLocation.name,
				state: specifiedLocation.adminCodes1.ISO3166_2,
				tz: specifiedLocation.timezone.timeZoneId,
			}
		: {
				city: pointQuery.data?.properties.relativeLocation.properties.city,
				state: pointQuery.data?.properties.relativeLocation.properties.state,
				tz: pointQuery.data?.properties.timeZone,
			};

	return { lat, long, tz, city, state };
};
