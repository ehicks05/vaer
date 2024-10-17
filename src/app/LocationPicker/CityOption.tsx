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
		<button
			type="button"
			disabled={isActive}
			onClick={isSaved ? onActivate : onClick}
			className={`w-full flex justify-between items-center gap-4 md:gap-8 p-2 text-sm rounded-lg ${classes}`}
		>
			<div className="text-left">{geonameToLabel(city)}</div>
			<div className="flex items-center gap-2">
				{isSaved && (
					<HiOutlineXCircle
						onClick={(e) => {
							e.stopPropagation();
							onDelete ? onDelete() : undefined;
						}}
						size={28}
						className={
							onDelete
								? 'flex-shrink-0 cursor-pointer text-red-500 hover:text-red-400'
								: 'invisible'
						}
					/>
				)}
			</div>
		</button>
	);
};
