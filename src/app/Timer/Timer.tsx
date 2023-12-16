import React, { useState } from "react";
import { Button, Card, Dialog, PageContainer } from "@/components";
import { HiOutlineClock, HiPlus } from "react-icons/hi2";
import { BUTTON_SIZES } from "@/constants";
import { useLocalStorage } from "usehooks-ts";
import { TimerCard } from "./TimerCard";
import { CreateTimerDialog } from "./CreateTimerDialog";

export const Timer = () => {
  const [timers] = useLocalStorage<number[]>("timers", []);
  const [isCreateTimerDialogOpen, setIsCreateTimerDialogOpen] = useState(false);

  return (
    <PageContainer>
      <div className="flex flex-col flex-grow items-center justify-center gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
          {timers.map((timer, i) => (
            <TimerCard key={timer} index={i} duration={timer} />
          ))}
        </div>

        {timers.length === 0 && (
          <Card className="bg-slate-900 text-neutral-400">
            <HiOutlineClock size={96} /> Add a timer
          </Card>
        )}

        <Button
          className="flex items-center"
          onClick={() => setIsCreateTimerDialogOpen(true)}
        >
          <HiPlus className={BUTTON_SIZES.PRIMARY} />
        </Button>
        <Dialog
          isOpen={isCreateTimerDialogOpen}
          onClose={() => setIsCreateTimerDialogOpen(false)}
        >
          <CreateTimerDialog />
        </Dialog>
      </div>
    </PageContainer>
  );
};
