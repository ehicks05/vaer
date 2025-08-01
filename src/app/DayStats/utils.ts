import { WiMoonrise, WiMoonset, WiSunrise, WiSunset } from 'react-icons/wi';
import { formatInTimeZone } from '../utils';

export const getSunTimeStats = (tz: string, sunrise?: Date, sunset?: Date) => [
	{
		Icon: WiSunrise,
		label: 'Sunrise',
		value: sunrise ? formatInTimeZone(sunrise, tz, 'h:mm a') : '0',
	},
	{
		Icon: WiSunset,
		label: 'Sunset',
		value: sunset ? formatInTimeZone(sunset, tz, 'h:mm a') : '0',
	},
];

export const getMoonTimeStats = (tz: string, moonrise?: Date, moonset?: Date) => {
	const moonriseStat = {
		Icon: WiMoonrise,
		label: 'Moonrise',
		value: moonrise ? formatInTimeZone(moonrise, tz, 'h:mm a') : 'none today',
	};
	const moonsetStat = {
		Icon: WiMoonset,
		label: 'Moonset',
		value: moonset ? formatInTimeZone(moonset, tz, 'h:mm a') : 'none today',
	};

	// if this day has a moonrise and moonset, show them in the order they occur
	return moonrise && moonset && moonset.getTime() < moonrise.getTime()
		? [moonsetStat, moonriseStat]
		: [moonriseStat, moonsetStat];
};

export const getAqiLabel = (aqis: number[]) => {
	if (aqis.length === 0) return undefined;
	const min = Math.min(...aqis);
	const max = Math.max(...aqis);
	if (min === max) {
		return min.toString();
	}
	return `${min} - ${max}`;
};
