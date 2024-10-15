import { useActiveLocation } from './useActiveLocation';
import { useResolvedLatLong } from './useResolvedLatLong';
import { useWeatherGov } from './useWeatherGov';

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
	const [activeLocation] = useActiveLocation();

	const { tz, city, state } = activeLocation
		? {
				city: activeLocation.name,
				state: activeLocation.adminCodes1.ISO3166_2,
				tz: activeLocation.timezone.timeZoneId,
			}
		: {
				city: pointQuery.data?.properties.relativeLocation.properties.city,
				state: pointQuery.data?.properties.relativeLocation.properties.state,
				tz: pointQuery.data?.properties.timeZone,
			};

	return { lat, long, tz, city, state };
};
