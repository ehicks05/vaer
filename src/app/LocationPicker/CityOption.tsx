import { HiOutlineXCircle } from 'react-icons/hi2';
import { type Geoname, geonameToLabel } from '@/services/geonames';

interface Props {
	city: Partial<Geoname>;
	isActive: boolean;
	onClick?: () => void;
	onDelete?: () => void;
}

export const CityOption = ({ city, isActive, onClick, onDelete }: Props) => {
	const classes = isActive ? 'bg-green-800' : 'bg-neutral-700 hover:bg-neutral-600';
	return (
		<div className="flex gap-2 text-sm">
			<button
				type="button"
				disabled={isActive}
				onClick={onClick}
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
