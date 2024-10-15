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
		<iframe className={className} src={`${base}?${params}`} title="weather map" />
	);
};
