import { Moon } from 'lunarphase-js';
import { DEFAULT_PHASE, MOON_PHASES } from './constants';

/**
 * @param startOfDayPhase
 * @param endOfDayPhase
 * @returns A moon phase from 0 to 1
 * @description If the range represented by `startOfDayPhase` and `endOfDayPhase`
 * includes a primary phase, return that phase. Otherwise return the average
 * of the two phases to represent midday. This approach is meant to ensure that
 * if, for example, a day includes a full moon, the entire day is considered to
 * be a full moon.
 */
const clampPhase = (startOfDayPhase: number, endOfDayPhase: number) => {
	if (startOfDayPhase > endOfDayPhase) return 0;
	if (startOfDayPhase <= 0.25 && endOfDayPhase >= 0.25) return 0.25;
	if (startOfDayPhase <= 0.5 && endOfDayPhase >= 0.5) return 0.5;
	if (startOfDayPhase <= 0.75 && endOfDayPhase >= 0.75) return 0.75;

	return (endOfDayPhase + startOfDayPhase) / 2;
};

export const getMoonPhaseDetails = (date: Date) => {
	const eod = new Date(
		new Date(new Date(date).setDate(date.getDate() + 1)).setMilliseconds(-1),
	);

	const startPhase = Moon.lunarAgePercent(date);
	const endPhase = Moon.lunarAgePercent(eod);
	const phase = clampPhase(startPhase, endPhase);

	const index = Math.floor(phase * MOON_PHASES.length);
	return MOON_PHASES.at(index) || DEFAULT_PHASE;
};
