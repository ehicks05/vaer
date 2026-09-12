import { CheckCircle2Icon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Geoname, geonameToLabel } from '@/services/geonames';

interface Props {
	city: Partial<Geoname>;
	isActive: boolean;
	onClick?: () => void;
	onDelete?: () => void;
}

export const CityOption = ({ city, isActive, onClick, onDelete }: Props) => {
	return (
		<div className="flex gap-2">
			<Button variant="outline" onClick={onClick} className="grow">
				{isActive && <CheckCircle2Icon className="text-green-500" />}
				{city.name === 'Current Location'
					? 'Current Location'
					: geonameToLabel(city)}
			</Button>
			{onDelete && (
				<Button variant="destructive" size="icon" onClick={onDelete}>
					<X />
				</Button>
			)}
		</div>
	);
};
