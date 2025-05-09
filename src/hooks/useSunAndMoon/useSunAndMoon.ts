import { addDays } from '@/app/utils';
import SunCalc from 'suncalc';
import { useResolvedLatLong } from '../useResolvedLatLong';
import { DEFAULT_PHASE } from './constants';
import { getMoonPhaseDetails } from './moonPhase';

const { getMoonTimes, getTimes } = SunCalc;

const toLocalDate = (date: Date, timeZone: string) =>
	date.toLocaleString('en-US', { timeZone }).substring(0, 10);

// hacky workaround:
// when tz is not utc, suncalc returns times that cross local calendar day boundaries
// so we grab times for the previous and next day, and filter down so that the
// localized MM/dd/yyyy matches between the input date and sun/moon time
const findLocalTimes = (date: Date, timeZone: string, lat: number, long: number) => {
	const localizedInputDate = toLocalDate(date, timeZone);
	const isDateMatch = (date?: Date) => {
		if (!date) return false;
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

export const useSunAndMoon = (date: Date, tz = 'utc') => {
	const resolvedLocation = useResolvedLatLong();
	const lat = Number(resolvedLocation.lat);
	const long = Number(resolvedLocation.long);

	if (!lat && !long) return { MoonPhaseIcon: DEFAULT_PHASE.Icon };

	const { Icon: MoonPhaseIcon, label: moonPhaseLabel } = getMoonPhaseDetails(date);

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
