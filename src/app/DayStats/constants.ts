import {
	WiBarometer,
	WiMoonNew,
	WiMoonrise,
	WiMoonset,
	WiRaindrop,
	WiSmoke,
	WiSunrise,
	WiSunset,
} from 'react-icons/wi';
import type { DayStat } from './types';

export const DEFAULT_DAY_STATS: DayStat[] = [
	{ value: '0', Icon: WiSunrise, label: 'Sunrise' },
	{ value: '0', Icon: WiSunset, label: 'Sunset' },
	{ value: '0', Icon: WiMoonrise, label: 'Moonrise' },
	{ value: '0', Icon: WiMoonset, label: 'Moonset' },
	{ value: '0', Icon: WiMoonNew, label: 'Moon Phase' },
	{ value: '0', Icon: WiRaindrop, label: 'Precipitation' },
	{ value: '0', Icon: WiBarometer, label: 'Pressure' },
	{ value: '0', Icon: WiSmoke, label: 'Air Quality' },
];
