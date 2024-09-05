import { useUnits } from '@/hooks/useUnits';
import type { ThreeHourForecast } from '@/services/openweathermap/types/fiveDay';
import type { Hourly } from '@/services/openweathermap/types/oneCall';
import { WiDirectionUp } from 'react-icons/wi';

export const Wind = ({ hourly }: { hourly: Hourly | ThreeHourForecast }) => {
	const { getSpeed } = useUnits();

	const { wind_deg, wind_speed } =
		'wind' in hourly
			? { wind_deg: hourly.wind.deg, wind_speed: hourly.wind.speed }
			: hourly;

	const title = `${wind_deg}\u00B0`;
	const style = { transform: `rotate(${180 + wind_deg}deg)` };

	return (
		<div className="flex flex-col items-center">
			<WiDirectionUp size={32} title={title} style={style} />
			<div className="whitespace-nowrap -mt-2">{getSpeed(wind_speed)}</div>
		</div>
	);
};
