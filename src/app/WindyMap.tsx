import { useResolvedLocation } from '@/hooks';

const WindyMap = () => {
	const { lat, long } = useResolvedLocation();

	if (lat === undefined || long === undefined) {
		return null;
	}

	const params = new URLSearchParams({
		lat: lat,
		lon: long,
		detailLat: lat,
		detailLon: long,
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
	});

	return (
		<iframe
			height="400"
			className="block w-full rounded-lg"
			src={`https://embed.windy.com/embed.html?${params}`}
			title="weather map"
		/>
	);
};

export default WindyMap;
