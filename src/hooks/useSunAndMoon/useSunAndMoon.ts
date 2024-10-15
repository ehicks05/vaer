import { getMoonIllumination, getMoonTimes, getTimes } from 'suncalc';
import { useResolvedLatLong } from '../useResolvedLatLong';
import { MOON_PHASES } from './constants';

export const getMoonPhase = (moon_phase: number) => {
	const index = Math.round(moon_phase * (MOON_PHASES.length - 1));
	return MOON_PHASES[index];
};

export const useSunAndMoon = (_date?: Date) => {
	const date = _date ? new Date(_date) : new Date();
	const resolvedLocation = useResolvedLatLong();
	const lat = Number(resolvedLocation.lat);
	const long = Number(resolvedLocation.long);

	const { sunrise, sunset } = getTimes(date, lat, long);
	const { rise: moonrise, set: moonset } = getMoonTimes(date, lat, long);
	const { phase: moonPhase } = getMoonIllumination(date);
	const { Icon: MoonPhaseIcon, label: moonPhaseLabel } = getMoonPhase(moonPhase);

	return {
		sunrise,
		sunset,
		moonrise,
		moonset,
		MoonPhaseIcon,
		moonPhaseLabel,
	};
};
