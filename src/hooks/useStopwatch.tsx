import { addMilliseconds, differenceInMilliseconds } from "date-fns";
import { useState, useRef, useEffect } from "react";

const nf = Intl.NumberFormat("en-US", {
  minimumIntegerDigits: 2,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatTime = (
  ms: number,
  forceShowMinutes: boolean,
  forceShowHours: boolean
) => {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const seconds = nf.format((ms / 1000) % 60);
  return [
    ...(forceShowHours || hours ? [hours] : []),
    ...(forceShowMinutes || hours || minutes ? [minutes] : []),
    seconds,
  ]
    .map((x) => String(x).padStart(2, "0"))
    .join(":");
};
const TIME_STEP = 33;

interface Lap {
  lapNumber: number;
  lapTime: number;
  totalTime: number;
}

export const useStopwatch = () => {
  const [startedAt, setStartedAt] = useState<Date | undefined>(undefined);
  const [pausedAt, setPausedAt] = useState<Date | undefined>(undefined);
  const [paused, setPaused] = useState(true);
  const [now, setNow] = useState<Date | undefined>(undefined);
  const [laps, setLaps] = useState<Lap[]>([]);
  const interval = useRef(0);

  // Handle start / pause / unpause
  useEffect(() => {
    function startTimer() {
      interval.current = window.setInterval(
        () => setNow(new Date()),
        TIME_STEP
      );
    }

    if (paused) {
      // handle pause
      clearInterval(interval.current);
      if (startedAt) {
        setPausedAt(new Date());
      }
    }
    if (!paused) {
      // handle initial start
      if (!pausedAt) {
        setStartedAt(new Date());
        setNow(new Date());
      }
      // handle unpause
      if (pausedAt) {
        const delta = differenceInMilliseconds(new Date(), pausedAt);
        setStartedAt((startedAt) => addMilliseconds(startedAt || 0, delta));
      }
      startTimer();
    }

    return () => clearInterval(interval.current);
  }, [paused]);

  const reset = () => {
    setStartedAt(undefined);
    setPausedAt(undefined);
    setPaused(true);
    setNow(undefined);
    setLaps([]);
    clearInterval(interval.current);
  };

  const addLap = () => {
    if (!startedAt) {
      return;
    }
    const prevLap = laps?.[0] || undefined;
    setLaps([
      {
        lapNumber: laps.length + 1,
        lapTime: differenceInMilliseconds(
          new Date(),
          addMilliseconds(startedAt, prevLap?.totalTime || 0)
        ),
        totalTime: differenceInMilliseconds(new Date(), startedAt),
      },
      ...laps,
    ]);
  };

  const totalTime =
    now && startedAt ? differenceInMilliseconds(now, startedAt) : 0;
  const forceShowMinutes = totalTime > 1000 * 60;
  const forceShowHours = totalTime > 1000 * 60 * 60;

  return {
    startedAt,
    pausedAt,
    paused,
    now,
    laps,
    displayTime: formatTime(totalTime, forceShowMinutes, forceShowHours),
    togglePause: () => setPaused((paused) => !paused),
    reset,
    addLap,
    formatTime: (ms: number) =>
      formatTime(ms, forceShowMinutes, forceShowHours),
  };
};
