import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { search, Geoname } from "@/services/geonames";
import { useDebounce, useLocalStorage } from "usehooks-ts";
import { HiMagnifyingGlass, HiOutlineCheckCircle } from "react-icons/hi2";
import { getTimeParts } from "./utils";
import { Button, Card } from "@/components";

interface CityOptionProps {
  city: Geoname;
  isSelected: boolean;
  onClick: () => void;
}

const CityOption = ({ city, isSelected, onClick }: CityOptionProps) => {
  const { time, ampm } = getTimeParts(new Date(), city.timeZoneId);

  return (
    <Button onClick={onClick}>
      <div className="w-full flex justify-between items-center gap-4 sm:gap-8 p-2 sm:p-4">
        <div>
          {city.name}, {city.adminCode1}, {city.countryCode}
        </div>
        <div className="flex items-center gap-2">
          {isSelected && <HiOutlineCheckCircle size={24} className="text-green-500" />}
          {time} {ampm}
        </div>
      </div>
    </Button>
  );
};

const CityDialog = () => {
  const [selectedCities, setSelectedCities] = useLocalStorage<Geoname[]>(
    "selectedCities",
    []
  );
  const [_queryString, setQueryString] = useState("");
  const queryString = useDebounce(_queryString, 500);

  const query = useQuery({
    queryKey: ["cities", queryString],
    queryFn: search,
    enabled: queryString.length >= 3,
  });
  const cities = query?.data || [];

  return (
    <div className="flex flex-col gap-4">
      <input
        className="p-2 rounded-lg"
        value={_queryString}
        onChange={(e) => setQueryString(e.target.value)}
        placeholder="Search for a city"
      />
      <div className="grid grid-cols-1 gap-2 w-full">
        {cities.map((city) => {
          const isSelected = selectedCities.some(
            (c) => c.geonameId === city.geonameId
          );
          const onClick = isSelected
            ? () =>
                setSelectedCities(
                  selectedCities.filter((c) => c.geonameId !== city.geonameId)
                )
            : () => setSelectedCities([...selectedCities, city]);
          return (
            <CityOption
              key={city.geonameId}
              city={city}
              isSelected={isSelected}
              onClick={onClick}
            />
          );
        })}
        {cities.length === 0 && (
          <Card>
            <div className="flex flex-col gap-4 items-center text-neutral-500">
              <HiMagnifyingGlass size={96} />
              Search for a city
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CityDialog;
