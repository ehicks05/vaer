import { useResolvedLatLong } from '@/hooks';

const base = 'https://radar.weather.gov/';

const defaults = {
	agenda: {
		id: 'weather',
		zoom: 10.4,
		layer: 'bref_qcd',
	},
	animating: false,
	base: 'darkcanvas',
	artcc: false,
	county: false,
	cwa: false,
	rfc: false,
	state: false,
	menu: false,
	shortFusedOnly: false,
	opacity: { alerts: 0.8, local: 0.6, localStations: 0.8, national: 0.6 },
};

interface Props {
	className: string;
	height: number;
}

export const NWSMap = ({ className, height }: Props) => {
	const { lat, long } = useResolvedLatLong();

	if (lat === undefined || long === undefined) {
		return null;
	}

	const paramObject = {
		...defaults,
		agenda: { ...defaults.agenda, center: [long, lat], location: null },
	};

	const settings = `v1_${btoa(JSON.stringify(paramObject))}`;
	const params = new URLSearchParams({ settings });

	return (
		<iframe
			height={height}
			className={className}
			src={`${base}?${params}`}
			title="weather map"
		/>
	);
};
