import { Card } from '@/components';
import { useResolvedLocation } from '@/hooks/useResolvedLocation';
import { DailyForecast } from './DailyForecast';
import { DayStats } from './DayStats';
import { HourlyForecast } from './HourlyForecast';
import { LocationForm } from './LocationPicker/LocationForm';
import { VaerMap } from './maps/VaerMap';
import { Summary } from './Summary';
import { UpcomingPrecipitation } from './UpcomingPrecipitation';

export const Home = () => {
	const { lat } = useResolvedLocation();

	if (!lat) {
		return (
			<div className="grow w-full h-full flex items-center justify-center">
				<Card gradient={false} className="p-8 bg-neutral-800">
					<LocationForm />
				</Card>
			</div>
		);
	}

	return (
		<div className="">
			<div className="p-2 max-w-7xl mx-auto grid grid-cols-1 md:hidden items-start justify-center gap-4">
				<div className="flex flex-col sm:flex-row gap-4">
					<Summary />
					<UpcomingPrecipitation />
				</div>
				<div className="">
					<HourlyForecast />
				</div>
				<div className="flex flex-col gap-4 h-full">
					<DailyForecast />
					<VaerMap className="block h-96 w-full rounded-lg" />
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="col-span-2 h-full">
						<DayStats />
					</div>
				</div>
			</div>

			<div className="hidden p-2 max-w-7xl mx-auto md:grid grid-cols-3 xl:hidden items-start justify-center gap-4">
				<div className="flex flex-col gap-4 h-full">
					<DailyForecast />
					<VaerMap className="block h-full w-full rounded-lg" />
				</div>

				<div className="flex flex-col gap-4 col-span-2">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
						<div className="lg:col-span-2 h-2" />
						<Summary />
						<UpcomingPrecipitation />
					</div>
					<div>
						<HourlyForecast />
					</div>
					<div className="h-full">
						<DayStats />
					</div>
				</div>
			</div>

			<div className="hidden p-2 max-w-7xl mx-auto xl:grid grid-cols-4 gap-4">
				<div className="col-span- flex flex-col gap-4 h-full">
					<div className="lg:col-span-2 h-5" />
					<Summary />
					<UpcomingPrecipitation />
					<VaerMap className="flex h-full w-full" />
				</div>

				<div className="">
					<DailyForecast />
				</div>

				<div className="col-span-2 flex flex-col gap-4 h-full">
					<div className="h-full">
						<HourlyForecast />
					</div>
					<div className="">
						<DayStats />
					</div>
				</div>
			</div>
		</div>
	);
};
