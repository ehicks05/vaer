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
	coords: [string, string];
}

export const WindyMap = ({ className, coords: [lat, lon] }: Props) => {
	const params = new URLSearchParams({
		...defaults,
		lat,
		lon,
		detailLat: lat,
		detailLon: lon,
	});

	return (
		// 8.01px seems to fix weird issue where the iframe is breaking through the rounding
		<div className="h-full w-full bg-black rounded-[8.01px] overflow-clip">
			<iframe className={className} src={`${base}?${params}`} title="weather map" />
		</div>
	);
};
