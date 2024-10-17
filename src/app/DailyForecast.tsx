import { Card } from '@/components';
import { DayIndexContext } from '@/contexts/DayIndexContext';
import { useOpenMeteo } from '@/hooks';
import { useUnits } from '@/hooks/useUnits';
import { type ReactNode, useContext } from 'react';
import { getWmoWeatherIcon } from '../constants/weather_icons';
import { addDays, formatInTimeZone } from './utils';

interface OneDaySummaryProps {
	weather: { id: number; description: string };
	day: string;
	min: number;
	max: number;
	onClick?: () => void;
	isSelected?: boolean;
}

const OneDaySummary = ({
	weather,
	day,
	min,
	max,
	onClick,
	isSelected,
}: OneDaySummaryProps) => {
	const { getTemp } = useUnits();
	const Icon = getWmoWeatherIcon(weather.id, true);

	return (
		<div
			onClick={onClick}
			onKeyUp={onClick}
			className={`py-2 sm:py-4 px-4 first:rounded-t-lg last:pb-4 last:rounded-b-lg cursor-pointer ${
				isSelected ? 'bg-slate-800' : 'hover:brightness-110'
			}`}
		>
			<div className="flex items-center justify-between gap-1">
				<div className="flex gap-4 items-center">
					<div className="flex flex-col gap-1 items-center">
						<Icon size={32} />
					</div>
					<div className="whitespace-nowrap">
						{day}
						<div className="text-xs opacity-75">{weather.description}</div>
					</div>
				</div>
				<div className="whitespace-nowrap flex flex-col text-right">
					<span>{getTemp(max)}</span>
					<span className="opacity-75">{getTemp(min)}</span>
				</div>
			</div>
		</div>
	);
};

const getPlaceholderData = () => ({
	daily: [...new Array(8)].map((_, i) => ({
		time: addDays(new Date(), i).getTime(),
		temp: { min: 0, max: 0 },
		weather: { id: 800, description: 'loading', icon: 'd' },
	})),
	timezone: '',
});

const DailyForecast = () => {
	const { dayIndex, setDayIndex } = useContext(DayIndexContext);
	const { openMeteo } = useOpenMeteo();

	const { daily: dailies, timezone } = openMeteo.data || getPlaceholderData();

	return (
		<Container>
			{dailies?.map((daily, id) => {
				const formattedDay = formatInTimeZone(daily.time, timezone, 'EEE');
				const today = formatInTimeZone(new Date(), timezone, 'EEE');
				const day = formattedDay === today ? 'Today' : formattedDay;

				return (
					<OneDaySummary
						key={new Date(daily.time).getTime()}
						weather={daily.weather}
						day={day}
						min={daily.temp.min}
						max={daily.temp.max}
						onClick={() => setDayIndex(id === dayIndex ? undefined : id)}
						isSelected={id === dayIndex}
					/>
				);
			})}
		</Container>
	);
};

const Container = ({ children }: { children: ReactNode }) => (
	<div className="w-full">
		Daily Forecast
		<Card>
			<div className="flex flex-col w-full">{children}</div>
		</Card>
	</div>
);

export default DailyForecast;
