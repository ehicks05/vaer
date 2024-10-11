import { getMoonPhaseIcon } from '@/constants/weather_icons';
import { getMoonIllumination, getMoonTimes, getTimes } from 'suncalc';
import { useResolvedLocation } from './useResolvedLocation';

export const useSunAndMoon = (date: Date) => {
	const { lat, long } = useResolvedLocation();
	const { sunrise, sunset } = getTimes(
		date ? new Date(date) : new Date(),
		Number(lat),
		Number(long),
	);
	const { rise: moonrise, set: moonset } = getMoonTimes(
		date ? new Date(date) : new Date(),
		Number(lat),
		Number(long),
	);
	const { phase: moonPhase } = getMoonIllumination(
		date ? new Date(date) : new Date(),
	);
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
