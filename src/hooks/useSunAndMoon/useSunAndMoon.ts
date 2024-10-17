import { addDays } from '@/app/utils';
import { getMoonIllumination, getMoonTimes, getTimes } from 'suncalc';
import { useResolvedLatLong } from '../useResolvedLatLong';
import { MOON_PHASES } from './constants';

export const getMoonPhase = (moon_phase: number) => {
	const index = Math.round(moon_phase * (MOON_PHASES.length - 1));
	return MOON_PHASES[index];
};

const toLocalDate = (date: Date, timeZone: string) =>
	date.toLocaleString('en-US', { timeZone }).substring(0, 10);

// hacky workaround:
// when tz is not utc, suncalc returns times that cross local calendar day boundaries
// so we grab times for the previous and next day, and filter down so that the
// localized MM/dd/yyyy matches between the input date and sun/moon time
const findLocalTimes = (date: Date, timeZone: string, lat: number, long: number) => {
	const localizedInputDate = toLocalDate(date, timeZone);
	const isDateMatch = (date: Date) => {
		const localized = toLocalDate(date, timeZone);
		return localized === localizedInputDate;
	};
	const dates = [-1, 0, 1].map((i) => addDays(date, i));

	const moonTimes = dates.map((offsetDate) => getMoonTimes(offsetDate, lat, long));
	const moonrises = moonTimes.map((moonTime) => moonTime.rise);
	const moonsets = moonTimes.map((moonTime) => moonTime.set);

	const sunTimes = dates.map((offsetDate) => getTimes(offsetDate, lat, long));
	const sunrises = sunTimes.map((sunTime) => sunTime.sunrise);
	const sunsets = sunTimes.map((sunTime) => sunTime.sunset);

	return {
		moonrise: moonrises.find(isDateMatch),
		moonset: moonsets.find(isDateMatch),
		sunrise: sunrises.find(isDateMatch),
		sunset: sunsets.find(isDateMatch),
	};
};

export const useSunAndMoon = (date: Date, tz: string) => {
	const resolvedLocation = useResolvedLatLong();
	const lat = Number(resolvedLocation.lat);
	const long = Number(resolvedLocation.long);

	if (!lat && !long) return { MoonPhaseIcon: MOON_PHASES[0].Icon };

	const { phase: moonPhase } = getMoonIllumination(date);
	const { Icon: MoonPhaseIcon, label: moonPhaseLabel } = getMoonPhase(moonPhase);

	const { moonrise, moonset, sunrise, sunset } = findLocalTimes(date, tz, lat, long);

	return {
		sunrise,
		sunset,
		moonrise,
		moonset,
		MoonPhaseIcon,
		moonPhaseLabel,
	};
};
