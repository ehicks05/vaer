import { useComputedActiveLocation } from '@/hooks';

const WindyMap = () => {
	const { lat, long } = useComputedActiveLocation();

	const params = new URLSearchParams({
		lat: lat,
		lon: long,
		detailLat: lat,
		detailLon: long,
		zoom: '6',
		level: 'surface',
		overlay: 'radar',
		product: 'radar',
		menu: '',
		message: 'true',
		marker: '',
		calendar: 'now',
		pressure: '',
		type: 'map',
		location: 'coordinates',
		detail: '',
		metricWind: 'default',
		metricTemp: 'default',
		radarRange: '-1',
	});

	return (
		<iframe
			height="400"
			className="block w-full rounded-lg"
			src={`https://embed.windy.com/embed2.html?${params}`}
			title="weather map"
		/>
	);
};

export default WindyMap;
