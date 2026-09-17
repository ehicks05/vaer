import { type ReactNode, useContext } from 'react';
import { Card } from '@/components';
import { EmbeddedTitle } from '@/components/EmbeddedTitle';
import { getWmoWeatherIcon } from '@/constants/weather_icons';
import { DayIndexContext } from '@/contexts/DayIndexContext';
import { useUnitSystem } from '@/features/UnitSystem/useUnitSystem';
import { useOpenMeteo } from '@/hooks';
import { formatInTimeZone } from '@/lib/utils';
import { WMO_CODE_TO_DESCRIPTION } from '@/services/openMeteo/constants';
import type { Daily } from '@/services/openMeteo/types/forecast';

interface Props {
	daily: Daily;
	tz: string;
	index: number;
}

const OneDaySummary = ({ daily, tz, index }: Props) => {
	const { dayIndex, setDayIndex } = useContext(DayIndexContext);
	const { getTemp } = useUnitSystem();

	const formattedDay = formatInTimeZone(daily.time, tz, 'EEE');
	const today = formatInTimeZone(new Date(), tz, 'EEE');
	const dayTitle = formattedDay === today ? 'Today' : formattedDay;

	const Icon = getWmoWeatherIcon(daily.weather_code, true);

	const handleClick = () => setDayIndex(index === dayIndex ? undefined : index);
	const isSelected = index === dayIndex;

	return (
		<button
			type="button"
			onClick={handleClick}
			onKeyUp={handleClick}
			className={`grow px-4 first:pt-1 last:pb-1 first:rounded-t-lg last:rounded-b-lg cursor-pointer ${
				isSelected ? 'bg-muted' : 'hover:bg-sidebar'
			}`}
		>
			<div className="flex items-center justify-between gap-1">
				<div className="flex gap-4 items-center">
					<div className="flex flex-col gap-1 items-center">
						<Icon size={32} />
					</div>
					<div className="whitespace-nowrap text-left">
						{dayTitle}
						<div className="text-xs text-muted-foreground">
							{WMO_CODE_TO_DESCRIPTION[daily.weather_code]}
						</div>
					</div>
				</div>
				<div className="whitespace-nowrap flex flex-col text-right">
					<span>{getTemp(daily.temperature_2m_max)}</span>
					<span className="text-muted-foreground">
						{getTemp(daily.temperature_2m_min)}
					</span>
				</div>
			</div>
		</button>
	);
};

export const DailyForecast = () => {
	const { openMeteo } = useOpenMeteo();

	if (!openMeteo.data) {
		return <Container />;
	}

	const { daily: dailies, timezone: tz } = openMeteo.data;

	return (
		<Container>
			{dailies?.map((daily, i) => (
				<OneDaySummary key={daily.time} daily={daily} tz={tz} index={i} />
			))}
		</Container>
	);
};

const Container = ({ children }: { children?: ReactNode }) => (
	<Card className="relative w-full md:h-full flex flex-col grow min-h-106 mt-2 md:mt-0">
		<EmbeddedTitle title="Daily Forecast" />
		<div className="flex flex-col w-full h-full justify-between">{children}</div>
	</Card>
);
