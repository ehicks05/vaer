import { Ghost, Globe, Loader2, Search, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from '@/components/ui/input-group';
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from '@/components/ui/item';
import { useSpecifiedLocation } from '@/hooks';
import type { Geoname } from '@/services/geonames';
import { useSearch } from '@/services/geonames';
import { geonameToLabel } from '@/services/geonames/utils';
import { useSavedLocationStorage } from './useSavedLocationStorage';

interface Props {
	geoname: Geoname;
}

const SearchResult = ({ geoname }: Props) => {
	const [savedLocations, setSavedLocations] = useSavedLocationStorage();
	const [_, setSpecifiedLocation] = useSpecifiedLocation();

	const handleClick = () => {
		setSavedLocations([...savedLocations, geoname]);
		setSpecifiedLocation(geoname);
	};

	return (
		<Item variant="outline" size="xs">
			<ItemContent>
				<ItemTitle>{geoname.name}</ItemTitle>
				<ItemDescription>{geonameToLabel(geoname)}</ItemDescription>
			</ItemContent>
			<ItemActions>
				<Button onClick={handleClick} variant="secondary" size="sm">
					Add
				</Button>
			</ItemActions>
		</Item>
	);
};

export const LocationSearch = () => {
	const [savedLocations] = useSavedLocationStorage();

	const [queryString, setQueryString] = useState('');

	const query = useSearch({ query: queryString });
	const selectedIds = savedLocations.map((o) => o.geonameId);
	const locations = (query?.data?.geonames || []).filter(
		(geoname) => !selectedIds.includes(geoname.geonameId),
	);

	return (
		<div className="flex flex-col gap-2">
			<Field>
				<FieldLabel htmlFor="search">Location Search</FieldLabel>
				<InputGroup>
					<InputGroupAddon align="inline-start">
						<Search />
					</InputGroupAddon>
					<InputGroupInput
						id="search"
						value={queryString}
						onChange={(e) => setQueryString(e.target.value)}
						placeholder="Search..."
					/>
				</InputGroup>
			</Field>
			<div className="flex flex-col gap-2 w-full">
				{locations.length === 0 && (
					<div className="flex flex-col items-center p-4 text-muted-foreground rounded-lg border">
						{query.isFetching ? (
							<>
								<Loader2 size={48} className="animate-spin" />
								Searching...
							</>
						) : query.isError ? (
							<>
								<TriangleAlert size={48} className="text-red-600" />
								Something went wrong. Try again later.
							</>
						) : query.isSuccess && locations.length === 0 ? (
							<>
								<Ghost size={48} />
								No results
							</>
						) : (
							<>
								<Globe size={48} />
								Search results will appear here
							</>
						)}
					</div>
				)}
				<div className="grid grid-cols-1 gap-1">
					{locations.map((location) => (
						<SearchResult key={location.geonameId} geoname={location} />
					))}
				</div>
			</div>
		</div>
	);
};
