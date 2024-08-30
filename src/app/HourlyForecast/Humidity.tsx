import type { ThreeHourForecast } from '@/services/openweathermap/types/fiveDay';
import type { Hourly } from '@/services/openweathermap/types/oneCall';
import { WiHumidity } from 'react-icons/wi';

export const Humidity = ({ hourly }: { hourly: Hourly | ThreeHourForecast }) => {
	const { humidity } = 'main' in hourly ? hourly.main : hourly;

	return (
		<div className="flex items-center whitespace-nowrap">
			{`${humidity}`}
			<WiHumidity size={28} className="-ml-1" />
		</div>
	);
};
