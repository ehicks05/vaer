import { useResolvedLocation } from '@/hooks';

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

const WindyMap = () => {
	const { lat, long } = useResolvedLocation();

	if (lat === undefined || long === undefined) {
		return null;
	}

	const params = new URLSearchParams({
		...defaults,
		lat: lat,
		lon: long,
		detailLat: lat,
		detailLon: long,
	});

	return (
		<iframe
			height="400"
			className="block w-full rounded-lg"
			src={`${base}?${params}`}
			title="weather map"
		/>
	);
};

export default WindyMap;
