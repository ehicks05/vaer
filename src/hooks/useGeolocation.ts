// adapted from @uidotdev/usehooks
// main changes:
// 1. don't request permission right away, wait for `isAllowPermissionRequests`
// 2. stick closer to web api types

import { round } from 'es-toolkit';
import React from 'react';
import { useOnInteraction } from './useOnInteraction';

export type GeolocationOptions = {
	maximumAge?: number;
	timeout?: number;
	enableHighAccuracy?: boolean;
};

const DEFAULT_OPTIONS = {};

export type GeolocationState = {
	loading: boolean;
	timestamp: number | null;
	coords: GeolocationCoordinates | null;
	error: Pick<GeolocationPositionError, 'code' | 'message'> | null;
};

const DEFAULT_STATE: GeolocationState = {
	loading: true,
	coords: null,
	timestamp: null,
	error: null,
};

const PRECISION = 2;

export const roundCoords = (geolocationCoordinates: GeolocationCoordinates) => ({
	...geolocationCoordinates,
	latitude: round(geolocationCoordinates.latitude, PRECISION),
	longitude: round(geolocationCoordinates.longitude, PRECISION),
});

/**
 * @returns Note: lat and long rounded to `PRECISION` places
 */
export function useGeolocation(options: GeolocationOptions = DEFAULT_OPTIONS) {
	const isAllowPermissionRequests = useOnInteraction();
	const [state, setState] = React.useState<GeolocationState>(DEFAULT_STATE);

	const optionsRef = React.useRef(options);

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

		navigator.geolocation.getCurrentPosition(
			onEvent,
			onEventError,
			optionsRef.current,
		);

		const watchId = navigator.geolocation.watchPosition(
			onEvent,
			onEventError,
			optionsRef.current,
		);

		return () => {
			navigator.geolocation.clearWatch(watchId);
		};
	}, [isAllowPermissionRequests]);

	return state;
}
