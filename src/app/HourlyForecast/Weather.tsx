import { getWmoWeatherIcon } from '@/constants/weather_icons';
import { WMO_CODE_TO_DESCRIPTION } from '@/services/openMeteo/constants';

interface Props {
	code: number;
	isDay: boolean;
}

export const Weather = ({ code, isDay }: Props) => {
	const Icon = getWmoWeatherIcon(code, isDay);

	return (
		<div className="flex flex-col items-center text-center text-xs">
			<Icon size={32} />
			{WMO_CODE_TO_DESCRIPTION[code]}
		</div>
	);
};
