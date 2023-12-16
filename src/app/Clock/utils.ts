import { format, formatInTimeZone, getTimezoneOffset } from "date-fns-tz";

export const getTimeParts = (
  date: Date,
  tz = Intl.DateTimeFormat().resolvedOptions().timeZone
) => ({
  time: formatInTimeZone(date, tz, "h:mm"),
  ampm: formatInTimeZone(date, tz, "a"),
  date: formatInTimeZone(date, tz, "EEE, MMM dd"),
  offset: formatInTimeZone(date, tz, "XXX"),
});

// get offset relative to browser
// sample result: '+14h tomorrow'
export const getRelativeOffset = (timeZoneId: string) => {
  const offsetMillis =
    getTimezoneOffset(timeZoneId) -
    getTimezoneOffset(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const hour = Math.floor(offsetMillis / 1000 / 60 / 60);
  const minute = (offsetMillis / 1000 / 60) % 60;
  const offset = `${offsetMillis > 0 ? "+" : ""}${hour + "h"}${
    minute ? " " + minute + "m" : ""
  }`;

  const localDate = format(new Date(), "dd");
  const nonLocalDate = formatInTimeZone(new Date(), timeZoneId, "dd");

  const relativeDate =
    nonLocalDate > localDate
      ? " tomorrow"
      : nonLocalDate < localDate
        ? " yesterday"
        : "";

  return `${offset}${relativeDate}`;
};