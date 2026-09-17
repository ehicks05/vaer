import { Droplet, Snowflake } from 'lucide-react';
import { type ReactNode, useContext } from 'react';
import { Card } from '@/components';
import { EmbeddedTitle } from '@/components/EmbeddedTitle';
import { MOON_PHASES } from '@/constants/moon_phases';
import { DayIndexContext } from '@/contexts/DayIndexContext';
import { useUnitSystem } from '@/features/UnitSystem/useUnitSystem';
import { useOpenMeteo } from '@/hooks';
import { DayStat } from './DayStat';
import { getMoonTimeStats, getSunTimeStats } from './utils';

const Container = ({ children }: { children?: ReactNode }) => (
	<Card className="min-h-30 relative flex flex-col pt-2 mt-2">
		<EmbeddedTitle title="Day Stats" />
		{children}
	</Card>
);

export const DayStats = () => {
	const { getLength } = useUnitSystem();
	const { dayIndex } = useContext(DayIndexContext);
	const { openMeteo } = useOpenMeteo();

	if (!openMeteo?.data) {
		return <Container />;
	}

	const { daily, timezone: tz } = openMeteo.data;
	const {
		precipitation_sum,
		snowfall_sum,
		sunrise,
		sunset,
		moon_phase,
		moonrise,
		moonset,
	} = daily[dayIndex || 0];

	const isSnowfallGreater = snowfall_sum > precipitation_sum;
	const precipIcon = isSnowfallGreater ? Snowflake : Droplet;
	const precipLabel = getLength(Math.max(precipitation_sum, snowfall_sum));

	const moonPhaseIndex = Math.floor(moon_phase * MOON_PHASES.length);
	const phase = MOON_PHASES.at(moonPhaseIndex) || MOON_PHASES[0];

	const newStats = [
		...getSunTimeStats(tz, sunrise, sunset),
		{ Icon: precipIcon, label: 'Precip', value: precipLabel, isLucide: true },
		...getMoonTimeStats(tz, moonrise, moonset),
		{
			Icon: phase.Icon,
			label: 'Moon',
			value: phase.label || 'phase',
			title: moon_phase?.toString(),
		},
	];

	return (
		<Container>
			<div className="grid grid-cols-3">
				{newStats.map((stat) => (
					<DayStat key={stat.label} stat={stat} />
				))}
			</div>
		</Container>
	);
};
