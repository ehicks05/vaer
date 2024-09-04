import { Alert } from './Alert';
import DailyForecast from './DailyForecast';
import { DayStats } from './DayStats';
import { HourlyForecast } from './HourlyForecast';
import { Summary } from './Summary';
import { WindyMap } from './maps/WindyMap';

export const Home = () => {
	return (
		<div className="p-2 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-start justify-center gap-4">
			<div className="col-span-full w-full md:max-w-screen-sm mx-auto">
				<Alert />
			</div>
			<div className="md:hidden">
				<Summary />
			</div>
			<div className="md:hidden">
				<HourlyForecast />
			</div>
			<div className="flex flex-col gap-4 h-full">
				<DailyForecast />
				<WindyMap className="block w-full rounded-lg" height={400} />
			</div>
			<div className="grid grid-cols-2 gap-4 xl:col-span-2">
				<div className="col-span-2 hidden md:block">
					<Summary />
				</div>
				<div className="col-span-2 hidden md:block">
					<HourlyForecast />
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
