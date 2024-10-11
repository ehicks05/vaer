import { getMoonPhaseIcon } from '@/constants/weather_icons';
import { getMoonIllumination, getMoonTimes, getTimes } from 'suncalc';
import { useResolvedLocation } from './useResolvedLocation';

export const useSunAndMoon = (_date?: Date) => {
	const date = _date ? new Date(_date) : new Date();
	const resolvedLocation = useResolvedLocation();
	const lat = Number(resolvedLocation.lat);
	const long = Number(resolvedLocation.long);

	const { sunrise, sunset } = getTimes(date, lat, long);
	const { rise: moonrise, set: moonset } = getMoonTimes(date, lat, long);
	const { phase: moonPhase } = getMoonIllumination(date);
	const { Icon: MoonPhaseIcon, label: moonPhaseLabel } = getMoonPhaseIcon(moonPhase);

	return {
		sunrise,
		sunset,
		moonrise,
		moonset,
		MoonPhaseIcon,
		moonPhaseLabel,
	};
};
