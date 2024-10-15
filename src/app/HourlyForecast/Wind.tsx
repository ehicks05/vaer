import { WiDirectionUp } from 'react-icons/wi';

interface Props {
	windDeg: number;
	windSpeed: string;
}

export const Wind = ({ windDeg, windSpeed }: Props) => {
	const title = `${windDeg}\u00B0`;
	const style = { transform: `rotate(${180 + windDeg}deg)` };

	return (
		<div className="flex flex-col items-center">
			<WiDirectionUp size={32} title={title} style={style} />
			<div className="whitespace-nowrap -mt-2">{windSpeed}</div>
		</div>
	);
};
