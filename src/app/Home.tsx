import React from "react";
import { Button } from "@/components";
import { useStopwatch } from "@/hooks";
import { BiStopwatch } from "react-icons/bi";
import { FONT_SIZES, BUTTON_SIZES } from "@/constants";
import { MdRestartAlt, MdPlayArrow, MdPause } from "react-icons/md";

export const Home = () => {
  const {
    startedAt,
    paused,
    laps,
    displayTime,
    togglePause,
    reset,
    addLap,
    formatTime,
  } = useStopwatch();

  return (
    <div className="font-mono flex flex-col flex-grow items-center justify-center gap-4">
      <div className="flex flex-col items-center flex-grow">
        <div className="p-16"></div>
        <div className={FONT_SIZES.PRIMARY}>{displayTime}</div>
        <div className="max-h-96 overflow-auto">
          <table>
            <tbody>
              {laps.map((lap, i) => (
                <tr className={FONT_SIZES.SECONDARY} key={i}>
                  <td className="px-4">#{lap.lapNumber}</td>
                  <td className="px-4">{formatTime(lap.lapTime)}</td>
                  <td className="px-4">{formatTime(lap.totalTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center gap-8">
        {startedAt && (
          <Button onClick={reset}>
            <MdRestartAlt className={BUTTON_SIZES.SECONDARY} />
          </Button>
        )}
        <Button onClick={togglePause}>
          {paused ? (
            <MdPlayArrow className={BUTTON_SIZES.PRIMARY} />
          ) : (
            <MdPause className={BUTTON_SIZES.PRIMARY} />
          )}
        </Button>
        {startedAt && (
          <Button onClick={addLap} disabled={paused}>
            <BiStopwatch className={BUTTON_SIZES.SECONDARY} />
          </Button>
        )}
      </div>
    </div>
  );
}
