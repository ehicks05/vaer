import { WiHumidity } from 'react-icons/wi';

export const Humidity = ({ humidity }: { humidity: number }) => (
	<div className="flex items-center whitespace-nowrap">
		{`${humidity}`}
		<WiHumidity size={28} className="-ml-1" />
	</div>
);
