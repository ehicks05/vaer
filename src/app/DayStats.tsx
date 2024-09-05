import { AQI_DISPLAY_NAMES } from '@/constants/aqi';
import { dateShort } from '@/constants/fmt';
import { getMoonPhaseIcon } from '@/constants/weather_icons';
import { DayIndexContext } from '@/contexts/DayIndexContext';
import { useOpenWeatherMap } from '@/hooks';
import { useOpenWeatherMapFiveDay } from '@/hooks/useOpenWeatherMap';
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
		icon: <WiRaindrop size={32} />,
		label: 'Precipitation',
		value: '0',
	},
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
	const { fiveDayQuery } = useOpenWeatherMapFiveDay();
	const { data: oneCallData } = oneCallQuery;
	const { data: airPollutionData } = airPollutionQuery;
	const { data: fiveDayData } = fiveDayQuery;

	if (!oneCallData || !airPollutionData || !fiveDayData) {
		return DAY_STATS.map((stat) => <DayStat key={stat.label} stat={stat} />);
	}

	const tz = oneCallData.timezone;
	const { moon_phase, moonrise, moonset, pressure, rain, snow, sunrise, sunset } =
		oneCallData.daily[dayIndex || 0];
	const { Icon: MoonPhaseIcon, label: moonPhaseLabel } =
		getMoonPhaseIcon(moon_phase);

	const dt = dayIndex ? oneCallData.daily[dayIndex].dt : undefined;
	const date = dt ? dateShort.format(dt) : undefined;

	const aqi = dayIndex
		? max(
				airPollutionData.forecast.list
					.filter((o) => dateShort.format(o.dt) === date)
					.map((o) => o.main.aqi),
			)
		: airPollutionData.current.list[0]?.main.aqi;

	const stats = [
		{
			label: 'Precipitation',
			value: getLength(rain + snow),
		},
		{
			label: 'Sunrise',
			value: formatInTimeZone(sunrise, tz, 'h:mm a'),
		},
		{
			label: 'Sunset',
			value: formatInTimeZone(sunset, tz, 'h:mm a'),
		},
		{
			label: 'Moonrise',
			value: formatInTimeZone(moonrise, tz, 'h:mm a'),
		},
		{
			label: 'Moonset',
			value: formatInTimeZone(moonset, tz, 'h:mm a'),
		},
		{
			icon: <MoonPhaseIcon size={32} />,
			label: 'Moon Phase',
			value: moonPhaseLabel,
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
