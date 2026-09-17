import { Card } from '@/components';
import { useResolvedLocation } from '@/hooks/useResolvedLocation';
import { MapLibreMap } from './MapLibreMap';

interface Props {
	className?: string;
}

export const VaerMap = ({ className }: Props) => {
	const { lat, long, tz } = useResolvedLocation();

	if (lat === undefined || long === undefined) {
		return (
			<Card
				className="flex items-center justify-center h-full bg-muted"
				gradient={false}
			>
				Map
			</Card>
		);
	}

	return (
		<div
			className={`w-full flex overflow-hidden dark:brightness-70 rounded-lg bg-muted dark:bg-neutral-100 shadow ${className}`}
		>
			<MapLibreMap coords={[Number(lat), Number(long)]} tz={tz} />
		</div>
	);
};
