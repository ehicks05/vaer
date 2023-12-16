import { intervalToDuration } from "date-fns";

export const secondsToHms = (seconds: number) => {
  const dur = intervalToDuration({ start: 0, end: seconds * 1000 });
  const h = dur.hours ? `${dur.hours}h` : '';
  const m = dur.minutes ? `${dur.minutes}m` : "";
  const s = dur.seconds ? `${dur.seconds}s` : "";

  return {
    h,
    m,
    s,
    hms: `${h}${m}${s}`
  }
}