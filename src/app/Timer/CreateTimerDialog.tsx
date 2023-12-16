import React, { useState } from "react";
import { Button } from "@/components";
import { HiOutlineBackspace, HiPlus } from "react-icons/hi2";
import { BUTTON_SIZES } from "@/constants";
import { useLocalStorage } from "usehooks-ts";
import { chunk } from "lodash";

const DEFAULT_INPUT = "000000";

export const CreateTimerDialog = () => {
  const [, setTimers] = useLocalStorage<number[]>("timers", []);
  const [input, setInput] = useState(DEFAULT_INPUT);

  const inputToSeconds = (input: string) => {
    const [h, m, s] = inputToLabel(input).split(":");
    return Number(h) * 60 * 60 + Number(m) * 60 + Number(s);
  };

  const inputToLabel = (input: string) =>
    chunk(input.split(""), 2)
      .map((chunk) => chunk.join(""))
      .join(":");

  const handleAddTimer = () => {
    setTimers((timers) => [...timers, inputToSeconds(input)].sort((t1, t2) => t1 - t2));
    setInput(DEFAULT_INPUT);
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="font-mono px-8 rounded-lg text-center text-4xl">
        {inputToLabel(input)}
      </span>
      <div className="px-4 grid grid-cols-3 gap-2 w-full">
        {Array.from(Array(12)).map((_, i) => {
          const label =
            i < 9 ? (
              String(i + 1)
            ) : i === 9 ? (
              "00"
            ) : i === 10 ? (
              "0"
            ) : i === 11 ? (
              <HiOutlineBackspace size={24} />
            ) : (
              "0"
            );

          const slice = label === "00" ? [2, 8] : [1, 7];

          const onClick =
            typeof label === "string"
              ? () => setInput((input) => (input + label).slice(...slice))
              : () => setInput((input) => ("0" + input).slice(0, 6));

          return (
            <button
              key={label.toString()}
              className="flex items-center justify-center aspect-square w-full rounded-full bg-neutral-700 hover:bg-neutral-600 text-xl"
              onClick={onClick}
            >
              {label}
            </button>
          );
        })}
      </div>
      <Button
        className="flex justify-center"
        onClick={handleAddTimer}
        disabled={input === DEFAULT_INPUT}
      >
        <HiPlus className={BUTTON_SIZES.PRIMARY} />
      </Button>
    </div>
  );
};
