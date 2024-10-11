import { AQI_DISPLAY_NAMES } from '@/constants/aqi';
import { dateShort } from '@/constants/fmt';
import { DayIndexContext } from '@/contexts/DayIndexContext';
import { useOpenWeatherMap, useSunAndMoon } from '@/hooks';
import { useUnits } from '@/hooks/useUnits';
import { max } from 'lodash-es';
import { type ReactNode, useContext } from 'react';
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
import { formatInTimeZone } from './utils';

interface DayStat {
	icon: ReactNode;
	label: string;
	value: string;
}

const DayStat = ({ stat: { icon, label, value } }: { stat: DayStat }) => {
	return (
		<div className="flex items-center gap-2 w-full p-4 bg-slate-800 rounded-lg">
			{icon}
			<div>
				<div className="text-xs text-neutral-400">{label}</div>
				<div>{value}</div>
			</div>
		</div>
	);
};

const DAY_STATS: DayStat[] = [
	{
		icon: <WiSunrise size={32} />,
		label: 'Sunrise',
		value: '0',
	},
	{
		icon: <WiSunset size={32} />,
		label: 'Sunset',
		value: '0',
	},
	{
		icon: <WiMoonrise size={32} />,
		label: 'Moonrise',
		value: '0',
	},
	{
		icon: <WiMoonset size={32} />,
		label: 'Moonset',
		value: '0',
	},
	{
		icon: <WiMoonNew size={32} />,
		label: 'Moon Phase',
		value: '0',
	},
	{
		icon: <WiRaindrop size={32} />,
		label: 'Precipitation',
		value: '0',
	},
	{
		icon: <WiBarometer size={32} />,
		label: 'Pressure',
		value: '0',
	},
	{
		icon: <WiSmoke size={32} />,
		label: 'Air Quality',
		value: '0',
	},
];

export const DayStats = () => {
	const { getLength, getPressure } = useUnits();
	const { dayIndex } = useContext(DayIndexContext);
	const { oneCallQuery, airPollutionQuery } = useOpenWeatherMap();
	const { data: oneCallData } = oneCallQuery;
	const { data: airPollutionData } = airPollutionQuery;

	if (!oneCallData || !airPollutionData) {
		return DAY_STATS.map((stat) => <DayStat key={stat.label} stat={stat} />);
	}

	const tz = oneCallData.timezone;
	const { pressure, rain, snow } = oneCallData.daily[dayIndex || 0];

	const dt = dayIndex ? oneCallData.daily[dayIndex].dt : undefined;
	const date = dt ? dateShort.format(dt) : undefined;

	const aqi = dayIndex
		? max(
				airPollutionData.forecast.list
					.filter((o) => dateShort.format(o.dt) === date)
					.map((o) => o.main.aqi),
			)
		: airPollutionData.current.list[0]?.main.aqi;

	const { sunrise, sunset, moonrise, moonset, MoonPhaseIcon, moonPhaseLabel } =
		useSunAndMoon(date ? new Date(date) : new Date());

	const moonriseStat = {
		label: 'Moonrise',
		value: moonrise ? formatInTimeZone(moonrise, tz, 'h:mm a') : 'none today',
	};
	const moonsetStat = {
		label: 'Moonset',
		value: moonset ? formatInTimeZone(moonset, tz, 'h:mm a') : 'none today',
	};

	// show moonrise/moonset in the order that they occur on a given day
	const moonTimeStats =
		moonrise && moonset && moonset.getTime() < moonrise.getTime()
			? [moonsetStat, moonriseStat]
			: [moonriseStat, moonsetStat];

	const stats = [
		{
			label: 'Sunrise',
			value: formatInTimeZone(sunrise, tz, 'h:mm a'),
		},
		{
			label: 'Sunset',
			value: formatInTimeZone(sunset, tz, 'h:mm a'),
		},
		...moonTimeStats,
		{
			icon: <MoonPhaseIcon size={32} />,
			label: 'Moon Phase',
			value: moonPhaseLabel,
		},
		{
			label: 'Precipitation',
			value: getLength(rain + snow),
		},
		{
			label: 'Pressure',
			value: getPressure(pressure),
		},
		{
			label: 'Air Quality',
			value: aqi ? AQI_DISPLAY_NAMES[aqi] : 'No data',
		},
	];

	return stats.map((stat, i) => (
		<DayStat
			key={stat.label}
			stat={{ ...stat, icon: stat.icon || DAY_STATS[i].icon }}
		/>
	));
};
