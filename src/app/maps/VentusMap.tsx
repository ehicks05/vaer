import { useResolvedLatLong } from '@/hooks';

const base = 'https://embed.ventusky.com';

const zoom = '7';

interface Props {
	className: string;
}

export const VentusMap = ({ className }: Props) => {
	const { lat, long } = useResolvedLatLong();

	if (lat === undefined || long === undefined) {
		return null;
	}

	const params = new URLSearchParams({
		p: `${lat};${long};${zoom}`,
		pin: `${lat};${long};dot;home`,
		l: 'rain-3h',
	});

	return (
		<iframe className={className} src={`${base}?${params}`} title="weather map" />
	);
};
