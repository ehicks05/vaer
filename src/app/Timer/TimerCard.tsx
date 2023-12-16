import React from "react";
import { Button } from "@/components";
import { useTimer } from "@/hooks/useTimer";
import { HiPlus, HiXMark } from "react-icons/hi2";
import { BUTTON_SIZES } from "@/constants";
import { MdRestartAlt, MdPlayArrow, MdPause } from "react-icons/md";
import ProgressBar from "@/components/ProgressBar";
import { useLocalStorage, useWindowSize } from "usehooks-ts";
import { secondsToHms } from "./utils";

const INNER_TEXT_SIZES = "text-2xl sm:text-3xl md:text-4xl";

export const TimerCard = ({
  index,
  duration,
}: {
  index: number;
  duration: number;
}) => {
  const {
    paused,
    expired,
    setPaused,
    hasTimeElapsed,
    reset,
    formattedTime,
    percent,
    updateMinutes,
  } = useTimer({ seconds: duration });

  const [, setTimers] = useLocalStorage<number[]>("timers", []);
  const { width } = useWindowSize();

  const { hms } = secondsToHms(duration);

  return (
    <div className="relative flex flex-col gap-4 flex-grow items-center justify-center p-4 rounded-lg font-mono bg-slate-900">
      <div className="absolute top-4 left-4">{hms}</div>
      <Button
        className="absolute top-4 right-4"
        onClick={() =>
          setTimers((timers) => {
            timers.splice(index, 1);
            return timers;
          })
        }
      >
        <HiXMark />
      </Button>
      <div className={INNER_TEXT_SIZES}>
        <ProgressBar
          size={width < 640 ? 200 : width < 768 ? 240 : 280}
          progress={percent}
          label={formattedTime}
        />
      </div>
      <div className="flex gap-4">
        {!expired && (
          <>
            {hasTimeElapsed && (
              <Button
                className="flex items-center"
                onClick={() => updateMinutes(1)}
              >
                <HiPlus className={BUTTON_SIZES.SECONDARY} />
              </Button>
            )}
            <Button onClick={() => setPaused(!paused)}>
              {paused ? (
                <MdPlayArrow className={BUTTON_SIZES.SECONDARY} />
              ) : (
                <MdPause className={BUTTON_SIZES.SECONDARY} />
              )}
            </Button>
          </>
        )}
        {hasTimeElapsed && (
          <Button onClick={() => reset()}>
            <MdRestartAlt className={BUTTON_SIZES.SECONDARY} />
          </Button>
        )}
      </div>
    </div>
  );
};
