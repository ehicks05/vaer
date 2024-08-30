import type { ThreeHourForecast } from '@/services/openweathermap/types/fiveDay';
import type { Hourly } from '@/services/openweathermap/types/oneCall';
import { round } from 'lodash-es';

const parsePrecip = (forecast: Hourly | ThreeHourForecast) => {
	const { rain, snow } = forecast;
	const rainAmount =
		rain && '1h' in rain ? rain['1h'] : rain && '3h' in rain ? rain['3h'] : 0;
	const snowAmount =
		snow && '1h' in snow ? snow['1h'] : snow && '3h' in snow ? snow['3h'] : 0;

	const totalAmount = rainAmount + snowAmount;
	const rounded = round(totalAmount, 2);
	const precip = rounded ? `${rounded} in` : !totalAmount ? '0 in' : '< .01 in';

	return { rainAmount, snowAmount, totalAmount, precip };
};

export const Precip = ({ hourly }: { hourly: Hourly | ThreeHourForecast }) => {
	const { precip } = parsePrecip(hourly);

	return (
		<div
			className={`whitespace-nowrap ${precip === '0 in' ? 'text-neutral-400' : ''}`}
		>
			{precip}
		</div>
	);
};
