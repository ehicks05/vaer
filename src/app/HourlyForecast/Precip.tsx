import type { ThreeHourForecast } from '@/services/openweathermap/types/fiveDay';
import type { Hourly } from '@/services/openweathermap/types/oneCall';
import { useUnits } from '../../hooks/useUnits';

const parsePrecip = (forecast: Hourly | ThreeHourForecast) => {
	const { rain, snow } = forecast;
	const rainAmount =
		rain && '1h' in rain ? rain['1h'] : rain && '3h' in rain ? rain['3h'] : 0;
	const snowAmount =
		snow && '1h' in snow ? snow['1h'] : snow && '3h' in snow ? snow['3h'] : 0;

	const totalAmount = rainAmount + snowAmount;

	return { rainAmount, snowAmount, totalAmount };
};

export const Precip = ({ hourly }: { hourly: Hourly | ThreeHourForecast }) => {
	const { totalAmount } = parsePrecip(hourly);
	const { getLength } = useUnits();

	return (
		<div
			className={`whitespace-nowrap ${totalAmount === 0 ? 'text-neutral-400' : ''}`}
		>
			{getLength(totalAmount)}
		</div>
	);
};
