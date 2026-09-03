import { useContext } from 'react';
import { WiRaindrop, WiSnowflakeCold } from 'react-icons/wi';
import { Card } from '@/components';
import { DayIndexContext } from '@/contexts/DayIndexContext';
import { useOpenMeteo } from '@/hooks';
import { useUnitSystem } from '@/hooks/useUnitSystem';
import { DEFAULT_PHASE, MOON_PHASES } from './constants';
import { DayStatCard } from './DayStatCard';
import { getMoonTimeStats, getSunTimeStats } from './utils';

export const DayStats = () => {
	const { getLength } = useUnitSystem();
	const { dayIndex } = useContext(DayIndexContext);
	const {
		openMeteo: { data: openMeteo },
	} = useOpenMeteo();

	const tz = openMeteo?.timezone || 'utc';
	const {
		precipitation_sum,
		snowfall_sum,
		sunrise,
		sunset,
		moon_phase,
		moonrise,
		moonset,
	} = openMeteo?.daily[dayIndex || 0] || {};

	const isSnowfallGreater = (snowfall_sum || 0) > (precipitation_sum || 0);
	const precipIcon = isSnowfallGreater ? WiSnowflakeCold : WiRaindrop;
	const precipLabel = getLength(Math.max(precipitation_sum || 0, snowfall_sum || 0));

	const moonPhaseIndex = Math.floor((moon_phase || 0) * MOON_PHASES.length);
	const phase = MOON_PHASES.at(moonPhaseIndex) || DEFAULT_PHASE;

	const newStats = [
		...getSunTimeStats(tz, sunrise, sunset),
		{ Icon: precipIcon, label: 'Precip', value: precipLabel },
		...getMoonTimeStats(tz, moonrise, moonset),
		{
			Icon: phase.Icon,
			label: 'Moon',
			value: phase.label || 'phase',
			title: moon_phase?.toString(),
		},
	];

	return (
		<div className="flex flex-col">
			Day Stats
			<Card>
				<div className="grid grid-cols-3">
					{newStats.map((stat) => (
						<DayStatCard key={stat.label} stat={stat} />
					))}
				</div>
			</Card>
		</div>
	);
};
