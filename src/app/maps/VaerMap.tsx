import { Card } from '@/components';
import { useResolvedLatLong } from '@/hooks';
import { MapLibreMap } from './MapLibreMap';

interface Props {
	className?: string;
}

export const VaerMap = ({ className }: Props) => {
	const { lat, long } = useResolvedLatLong();

	if (lat === undefined || long === undefined) {
		return (
			<Card
				className="flex items-center justify-center h-full bg-slate-800"
				gradient={false}
			>
				Map
			</Card>
		);
	}

	return (
		<div className={className}>
			<MapLibreMap coords={[Number(lat), Number(long)]} />
		</div>
	);
};
