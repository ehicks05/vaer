import { useState, useRef, useEffect } from "react";

export const useClock = () => {
  const [date, setDate] = useState(new Date());
  const interval = useRef(0);

  useEffect(() => {
    interval.current = window.setInterval(() => setDate(new Date()), 100);

    return () => clearInterval(interval.current);
  }, []);

  return { date };
};
