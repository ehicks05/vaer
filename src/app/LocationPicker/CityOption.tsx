import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Geoname, geonameToLabel } from '@/services/geonames';

interface Props {
	city: Partial<Geoname>;
	isActive: boolean;
	onClick?: () => void;
	onDelete?: () => void;
}

export const CityOption = ({ city, isActive, onClick, onDelete }: Props) => {
	const classes = isActive ? 'bg-green-600' : 'bg-neutral-500 hover:bg-neutral-400';
	return (
		<div className="flex gap-2 text-sm">
			<Button onClick={onClick} className={`grow ${classes}`}>
				{geonameToLabel(city)}
			</Button>
			{onDelete && (
				<Button variant="destructive" size="icon" onClick={onDelete}>
					<X />
				</Button>
			)}
		</div>
	);
};
