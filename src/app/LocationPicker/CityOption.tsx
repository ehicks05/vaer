import { type Geoname, geonameToLabel } from '@/services/geonames';
import { HiOutlineXCircle } from 'react-icons/hi2';

interface Props {
	city: Partial<Geoname>;
	isSaved: boolean;
	isActive: boolean;
	onClick?: () => void;
	onActivate?: () => void;
	onDelete?: () => void;
}

export const CityOption = ({
	city,
	isSaved,
	isActive,
	onClick,
	onActivate,
	onDelete,
}: Props) => {
	const classes = isActive ? 'bg-green-800' : 'bg-neutral-700 hover:bg-neutral-600';
	return (
		<div className="flex gap-2 text-sm">
			<button
				type="button"
				disabled={isActive}
				onClick={isSaved ? onActivate : onClick}
				className={`w-full p-2 text-left rounded-lg ${classes}`}
			>
				{geonameToLabel(city)}
			</button>
			{onDelete && (
				<button
					type="button"
					onClick={onDelete}
					className="p-1 rounded-lg bg-neutral-700 hover:bg-neutral-600"
				>
					<HiOutlineXCircle size={28} className="text-red-500" />
				</button>
			)}
		</div>
	);
};
