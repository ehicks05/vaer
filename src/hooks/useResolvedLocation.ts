import { useFindNearbyPlaceName } from '@/services/geonames';
import { parseGeoname } from '@/services/geonames/utils';
import { useGeolocation } from './useGeolocation';
import { useSpecifiedLocation } from './useSpecifiedLocation';

export interface Location {
	lat?: string;
	long?: string;
	city?: string;
	state?: string;
	tz?: string;
}

export type LatLong = Required<Pick<Location, 'lat' | 'long'>>;

export const useResolvedLocation = (): Location => {
	const { latitude, longitude } = useGeolocation().coords || {};
	const [specifiedLocation] = useSpecifiedLocation();

	const { data: nearby } = useFindNearbyPlaceName({ lat: latitude, lng: longitude });
	const nearbyGeoname = nearby?.geonames[0];

	const { lat, long, tz, city, state } = specifiedLocation
		? {
				lat: specifiedLocation.lat,
				long: specifiedLocation.lng,
				city: specifiedLocation.name,
				state: parseGeoname(specifiedLocation).state,
				tz: specifiedLocation.timezone.timeZoneId,
			}
		: nearbyGeoname
			? {
					lat: nearbyGeoname.lat,
					long: nearbyGeoname.lng,
					city: nearbyGeoname.name,
					state: parseGeoname(nearbyGeoname).state,
					tz: nearbyGeoname.timezone.timeZoneId,
				}
			: {};

	return {
		lat: lat !== undefined ? String(lat) : undefined,
		long: long !== undefined ? String(long) : undefined,
		tz,
		city,
		state,
	};
};
