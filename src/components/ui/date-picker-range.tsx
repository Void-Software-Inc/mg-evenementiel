"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { fr } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerWithRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

export function DatePickerWithRange({
  className,
  date,
  setDate
}: DatePickerWithRangeProps) {

  React.useEffect(() => {
    if (date) {
      console.log("Selected Date:", date.from, date.to);
    } else {
      console.log("No selected date");
    }
  }, [date]);

  return (
    <div className={cn("w-full drop-shadow-none", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              " min-w-[247px] w-full py-6 px-4 justify-start items-center text-left drop-shadow-none bg-transparent rounded-t-md rounded-b-none border border-b border-t-0 border-x-0 border-gray-300 tracking-tight hover:border-gray-700",
              !date && "text-base text-muted-foreground"
            )}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd LLL, y", { locale: fr })} -{" "}
                  {format(date.to, "dd LLL, y", { locale: fr })}
                </>
              ) : (
                format(date.from, "dd LLL, y", { locale: fr })
              )
            ) : (
              <span className="text-base font-light text-gray-500">Date de l'événement</span>
            )}
             <CalendarIcon className="h-4 w-4 ml-auto" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={fr}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default DatePickerWithRange;
