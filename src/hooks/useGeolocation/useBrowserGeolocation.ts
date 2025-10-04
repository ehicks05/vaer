// adapted from @uidotdev/usehooks
// main changes:
// 1. don't request permission right away, wait for `isAllowPermissionRequests`
// 2. stick closer to web api types
import React from 'react';
import { useOnInteraction } from '../useOnInteraction';
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
	const isAllowPermissionRequests = useOnInteraction();
	const [state, setState] = React.useState<GeolocationState>(DEFAULT_STATE);

	React.useEffect(() => {
		if (!isAllowPermissionRequests) {
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
	}, [isAllowPermissionRequests]);

	return state;
}
