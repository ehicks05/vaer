import { useState, useRef, useEffect } from "react";

interface Props {
  hours?: number;
  minutes?: number;
  seconds?: number;
}

/**
 * While counting down, we want 0 to appear exactly when time is up.
 * So we'll round up. After time is up we can round down.
 */
const formatTime = (_ms: number) => {
  const ms = Math.abs(_ms);
  const secondRound = _ms >= 0 ? Math.ceil : Math.floor;
  const totalSeconds = secondRound(ms / 1000);
  let seconds = totalSeconds % 60;

  const minuteRound =
    _ms > 0 && totalSeconds > 0 && totalSeconds % 60 === 0 ? Math.ceil : Math.floor;
  const totalMinutes = minuteRound(ms / (1000 * 60));
  let minutes = totalMinutes % 60;

  const hourRound =
    _ms > 0 && totalMinutes > 0 && totalMinutes % 60 === 0 ? Math.ceil : Math.floor;
  let hours = hourRound(ms / (1000 * 60 * 60));

  hours = Math.floor(hours);
  minutes = Math.floor(minutes);

  let joined = [hours, minutes, seconds]
    .map((x) => String(x).padStart(2, "0"))
    .join(":");
  
  while (joined.startsWith("00:")) {
    joined = joined.slice(3);
  }

  return `${_ms < 0 ? "-" : ""}${joined}`;
};

const TIME_STEP = 16;

export const useTimer = (props: Props) => {
  let initialMs =
    (props?.seconds || 0) * 1000 +
    (props?.minutes || 0) * 1000 * 60 +
    (props?.hours || 0) * 1000 * 60 * 60;

  const [ms, setMs] = useState(initialMs);
  const [paused, setPaused] = useState(true);
  const [expired, setExpired] = useState(false);

  const msRef = useRef(ms);
  const interval = useRef(0);

  useEffect(() => {
    msRef.current = ms;

    if (ms <= 0) {
      setExpired(true);
    }
  }, [ms]);

  useEffect(() => {
    function startTimer() {
      function decrement() {
        setMs(msRef.current - TIME_STEP);
      }

      interval.current = window.setInterval(decrement, TIME_STEP);
    }

    paused ? clearInterval(interval.current) : startTimer();

    return () => clearInterval(interval.current);
  }, [paused]);

  function reset() {
    setMs(initialMs);
    setExpired(false);
    setPaused(true);
  }

  function updateMinutes(amount: number) {
    const addedMs = amount * 60 * 1000;
    initialMs += addedMs;
    setMs(ms + addedMs);
  }

  const hasTimeElapsed = ms !== initialMs;

  return {
    ms,
    paused,
    expired,
    setPaused,
    hasTimeElapsed,
    reset,
    formattedTime: formatTime(ms),
    percent: expired ? 0 : (ms / initialMs) * 100,
    updateMinutes,
  };
};
