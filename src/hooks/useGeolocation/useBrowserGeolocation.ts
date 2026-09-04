// adapted from @uidotdev/usehooks
// main changes:
// 1. don't request permission right away, wait for `locationPermission`
// 2. stick closer to web api types
import { useEffect, useState } from 'react';
import { useLocationPermission } from '@/features/LocationPicker/LocationPermission';
import type { GeolocationState } from './types';
import { roundCoords } from './utils';

const DEFAULT_STATE: GeolocationState = {
	loading: true,
	coords: null,
	timestamp: null,
	error: null,
};

/**
 * @returns Note: lat and long rounded to `PRECISION` places
 */
export function useBrowserGeolocation() {
	const [locationPermission] = useLocationPermission();
	const [state, setState] = useState<GeolocationState>(DEFAULT_STATE);

	useEffect(() => {
		if (!locationPermission) {
			return;
		}

		const onEvent = ({
			coords,
			timestamp,
		}: {
			coords: GeolocationCoordinates;
			timestamp: EpochTimeStamp;
		}) => {
			console.log('good');
			setState(() => ({
				loading: false,
				timestamp,
				coords: roundCoords(coords),
				error: null,
			}));
		};

		const onEventError = (error: GeolocationPositionError) => {
			console.log({ errorObject: error });
			setState((s) => ({
				loading: false,
				timestamp: error.PERMISSION_DENIED ? null : s.timestamp,
				coords: error.PERMISSION_DENIED ? null : s.coords,
				error: { message: error.message, code: error.code },
			}));
		};

		navigator.geolocation.getCurrentPosition(onEvent, onEventError);

		const watchId = navigator.geolocation.watchPosition(onEvent, onEventError);

		return () => {
			navigator.geolocation.clearWatch(watchId);
		};
	}, [locationPermission]);

	return state;
}
