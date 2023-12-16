import { Geoname } from "@/services/geonames";
import { getTimeParts, getRelativeOffset } from "./utils";
import { FONT_SIZES } from "./constants";
import { useState, MouseEvent } from "react";
import { Button } from "@/components";
import { HiOutlineArrowUp, HiOutlineArrowDown } from "react-icons/hi2";
import { useLocalStorage } from "usehooks-ts";
import clsx from "clsx";

export const City = ({ city }: { city: Geoname }) => {
  const [selectedCities, setSelectedCities] = useLocalStorage<Geoname[]>(
    "selectedCities",
    []
  );
  const [isReorderMode, setIsReorderMode] = useState(false);

  const currentIndex = selectedCities.findIndex(
    (c) => c.geonameId === city.geonameId
  );
  const canMoveUp = currentIndex > 0;
  const canMoveDown = currentIndex < selectedCities.length - 1;

  const handleMove = (e: MouseEvent<HTMLButtonElement>, direction: string) => {
    e.preventDefault();
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    const swapee = selectedCities[newIndex];
    const cities = [...selectedCities];
    cities[currentIndex] = swapee;
    cities[newIndex] = city;

    setSelectedCities(cities);
  };

  const { time, ampm, offset } = getTimeParts(new Date(), city.timeZoneId);
  return (
    <div
      className={clsx(
        "w-full flex justify-between items-center gap-4 p-2 border-2 bg-slate-900 rounded-lg cursor-pointer",
        { "border-transparent": !isReorderMode },
        { "border-sky-900": isReorderMode }
      )}
      onClick={() => setIsReorderMode((isReorderMode) => !isReorderMode)}
    >
      <div className="flex flex-col">
        <div className="text-3xl">{city.name}</div>
        <div className="text-sm" title={`utc offset: ${offset}`}>
          {getRelativeOffset(city.timeZoneId)}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-baseline gap-1">
          <div className={FONT_SIZES.SECONDARY}>{time}</div>
          <div>{ampm}</div>
        </div>
        {isReorderMode && (
          <div
            className={clsx("flex flex-col", { "opacity-0": !isReorderMode })}
          >
            <Button onClick={(e) => handleMove(e, "up")} disabled={!canMoveUp}>
              <HiOutlineArrowUp />
            </Button>
            <Button
              onClick={(e) => handleMove(e, "down")}
              disabled={!canMoveDown}
            >
              <HiOutlineArrowDown />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
