import DailyForecast from './DailyForecast';
import { DayStats } from './DayStats';
import { HourlyForecast } from './HourlyForecast';
import { WindyMap } from './maps/WindyMap';
import { Summary } from './Summary';
import { UpcomingPrecipitation } from './UpcomingPrecipitation';

export const Home = () => {
	return (
		<div className="p-2 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-start justify-center gap-4">
			<div className="flex flex-col gap-4 md:hidden">
				<Summary />
				<UpcomingPrecipitation />
			</div>
			<div className="md:hidden">
				<HourlyForecast />
			</div>
			<div className="flex flex-col gap-4 h-full">
				<DailyForecast />
				<WindyMap className="block w-full aspect-square rounded-lg" />
			</div>
			<div className="grid grid-cols-2 gap-4 md:col-span-2">
				<div className="col-span-2 hidden md:flex flex-col gap-4">
					<Summary />
					<UpcomingPrecipitation />
				</div>
				<div className="col-span-2 hidden md:block">
					<HourlyForecast />
				</div>
				<div className="col-span-2 h-full">
					<div className="grid grid-cols-2 gap-4">
						<DayStats />
					</div>
				</div>
			</div>
		</div>
	);
};
