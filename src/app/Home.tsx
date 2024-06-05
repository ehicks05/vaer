import { Alert } from './Alert';
import DailyForecast from './DailyForecast';
import { DayStats } from './DayStats';
import { Hourly } from './Hourly';
import { Summary } from './Summary';
import WindyMap from './WindyMap';

export const Home = () => {
	return (
		<div className="p-2 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-start justify-center gap-4">
			<Alert />
			<div className="md:hidden">
				<Summary />
			</div>
			<div className="md:hidden">
				<Hourly />
			</div>
			<div className="flex flex-col gap-4 h-full">
				<DailyForecast />
				<WindyMap />
			</div>
			<div className="grid grid-cols-2 gap-4 xl:col-span-2">
				<div className="col-span-2 hidden md:block">
					<Summary />
				</div>
				<div className="col-span-2 hidden md:block">
					<Hourly />
				</div>
				<div className="col-span-2 h-full">
					<div className="grid grid-cols-2 lg:grid-cols-2 gap-4 xl:col-span-2">
						<DayStats />
					</div>
				</div>
			</div>
		</div>
	);
};
