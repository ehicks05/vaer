import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from '@/components/ui/item';
import type { Geoname } from '@/services/geonames';
import { geonameToLabel } from '@/services/geonames/utils';

interface Props {
	city: Partial<Geoname>;
	isActive: boolean;
	onClick?: () => void;
	onDelete?: () => void;
}

export const CityOption = ({ city, isActive, onClick, onDelete }: Props) => {
	return (
		<Item variant="outline" size="xs">
			<ItemContent>
				<ItemTitle>
					{city.name}
					{/*{isActive && <CheckCircle2Icon size={16} className="text-green-500" />}*/}
				</ItemTitle>
				{city.name !== 'Current Location' && (
					<ItemDescription>{geonameToLabel(city)}</ItemDescription>
				)}
			</ItemContent>
			<ItemActions>
				{isActive && (
					<Button
						onClick={onClick}
						variant="secondary"
						size="sm"
						className="bg-green-100 hover:bg-green-100 dark:bg-green-900 dark:hover:bg-green-900"
					>
						Active
					</Button>
				)}

				{!isActive && (
					<Button onClick={onClick} variant="secondary" size="sm">
						{onDelete || city.name === 'Current Location' ? 'Select' : 'Add'}
					</Button>
				)}
				{onDelete && (
					<Button onClick={onDelete} variant="destructive" size="icon-sm">
						<X />
					</Button>
				)}
			</ItemActions>
		</Item>
	);
};
