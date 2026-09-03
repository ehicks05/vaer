import { WiMoonrise, WiMoonset, WiSunrise, WiSunset } from 'react-icons/wi';
import { formatInTimeZone } from '../utils';

export const getSunTimeStats = (tz: string, sunrise?: number, sunset?: number) => [
	{
		Icon: WiSunrise,
		label: 'Sunrise',
		value: sunrise ? formatInTimeZone(sunrise, tz, 'h:mm a') : '0:00 AM',
	},
	{
		Icon: WiSunset,
		label: 'Sunset',
		value: sunset ? formatInTimeZone(sunset, tz, 'h:mm a') : '0:00 AM',
	},
];

export const getMoonTimeStats = (
	tz: string,
	moonrise?: number,
	moonset?: number,
) => {
	const moonriseStat = {
		Icon: WiMoonrise,
		label: 'Moonrise',
		value: moonrise ? formatInTimeZone(moonrise, tz, 'h:mm a') : 'none',
	};
	const moonsetStat = {
		Icon: WiMoonset,
		label: 'Moonset',
		value: moonset ? formatInTimeZone(moonset, tz, 'h:mm a') : 'none',
	};

	// if this day has a moonrise and moonset, show them in the order they occur
	return moonrise &&
		moonset &&
		new Date(moonset).getTime() < new Date(moonrise).getTime()
		? [moonsetStat, moonriseStat]
		: [moonriseStat, moonsetStat];
};
