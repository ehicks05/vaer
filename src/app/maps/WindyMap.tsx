import { Card } from '@/components';
import { useResolvedLatLong } from '@/hooks';

const base = 'https://embed.windy.com/embed.html';

const defaults = {
	zoom: '6',
	level: 'surface',
	overlay: 'radar',
	product: 'radar',
	message: 'true',
	type: 'map',
	location: 'coordinates',
	metricWind: 'default',
	metricTemp: 'default',
	radarRange: '-1',
};

interface Props {
	className: string;
}

export const WindyMap = ({ className }: Props) => {
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

	const params = new URLSearchParams({
		...defaults,
		lat: lat,
		lon: long,
		detailLat: lat,
		detailLon: long,
	});

	return (
		// 8.01px seems to fix weird issue where the iframe is breaking through the rounding
		<div className="h-full w-full bg-black rounded-[8.01px] overflow-clip">
			<iframe className={className} src={`${base}?${params}`} title="weather map" />
		</div>
	);
};
