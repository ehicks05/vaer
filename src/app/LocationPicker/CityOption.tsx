import type { SearchResultGeoname } from '@/services/geonames/types';
import {
	HiOutlineCheckCircle,
	HiOutlinePlusCircle,
	HiOutlineXCircle,
} from 'react-icons/hi2';
import { geonameToLabel } from '../utils';

interface Props {
	city: Partial<SearchResultGeoname>;
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
	return (
		<div className="w-full flex justify-between items-center gap-4 md:gap-8 p-2 text-sm md:text-base bg-neutral-700 rounded-lg">
			<div className="flex items-center gap-4">
				{isSaved && (
					<HiOutlineCheckCircle
						size={28}
						onClick={onActivate}
						className={
							isActive
								? 'flex-shrink-0 cursor-pointer text-green-500 hover:text-green-400'
								: 'flex-shrink-0 cursor-pointer text-neutral-500 hover:text-neutral-400'
						}
					/>
				)}
				<div className="text-sm">{geonameToLabel(city)}</div>
			</div>
			<div className="flex items-center gap-2">
				{!isSaved && (
					<HiOutlinePlusCircle
						onClick={onClick}
						size={28}
						className="flex-shrink-0 cursor-pointer text-green-500 hover:text-green-400"
					/>
				)}
				{isSaved && (
					<HiOutlineXCircle
						onClick={onDelete}
						size={28}
						className={
							onDelete
								? 'flex-shrink-0 cursor-pointer text-red-500 hover:text-red-400'
								: 'invisible'
						}
					/>
				)}
			</div>
		</div>
	);
};
