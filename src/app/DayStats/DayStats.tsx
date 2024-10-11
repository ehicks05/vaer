import { AQI_DISPLAY_NAMES } from '@/constants/aqi';
import { dateShort } from '@/constants/fmt';
import { DayIndexContext } from '@/contexts/DayIndexContext';
import { useOpenWeatherMap, useSunAndMoon } from '@/hooks';
import { useUnits } from '@/hooks/useUnits';
import { max } from 'lodash-es';
import { useContext } from 'react';
import { formatInTimeZone } from '../utils';
import { DayStat } from './DayStat';
import { DEFAULT_DAY_STATS } from './constants';

export const DayStats = () => {
	const { getLength, getPressure } = useUnits();
	const { dayIndex } = useContext(DayIndexContext);
	const { oneCallQuery, airPollutionQuery } = useOpenWeatherMap();
	const { data: oneCallData } = oneCallQuery;
	const { data: airPollutionData } = airPollutionQuery;

	if (!oneCallData || !airPollutionData) {
		return DEFAULT_DAY_STATS.map((stat) => <DayStat key={stat.label} stat={stat} />);
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

	// if this day has a moonrise and moonset, show moonset first if it occurs first
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
			Icon: MoonPhaseIcon,
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
			stat={{ ...stat, Icon: stat.Icon || DEFAULT_DAY_STATS[i].Icon }}
		/>
	));
};
