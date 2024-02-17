"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useState, useEffect, useMemo } from "react";

const Arrows = ({ setMonth }: any) => {
  const [currentMonth, setCurrentMonth] = useState("01");

  const month = useMemo(
    () => [
      { value: "01", label: "January" },
      { value: "02", label: "February" },
      { value: "03", label: "March" },
      { value: "04", label: "April" },
      { value: "05", label: "May" },
      { value: "06", label: "June" },
      { value: "07", label: "July" },
      { value: "08", label: "August" },
      { value: "09", label: "September" },
      { value: "10", label: "October" },
      { value: "11", label: "November" },
      { value: "12", label: "December" },
    ],
    []
  );

  useEffect(() => {
    const date = new Date();
    const stringDate = date.toLocaleDateString("en-GB");
    const dateArray = stringDate.split("/");

    setCurrentMonth(dateArray[1]);
  }, []);

  useEffect(() => {
    setMonth(month[parseInt(currentMonth) - 1].value);
  }, [currentMonth, setMonth, month]);

  const increaseMonth = () => {
    if (currentMonth === "12") return;
    const numberMonth = parseInt(currentMonth);
    const newMonth = numberMonth + 1;
    const newMonthString = newMonth.toString();
    setCurrentMonth(newMonthString);
  };

  const decreaseMonth = () => {
    const numberMonth = parseInt(currentMonth);
    if (numberMonth === 1) return;
    const newMonth = numberMonth - 1;
    const newMonthString = newMonth.toString();
    setCurrentMonth(newMonthString);
  };

  return (
    <div className="flex justify-between w-[300px]">
      <ArrowLeftIcon className="w-6 h-6" onClick={decreaseMonth} />
      {month[parseInt(currentMonth) - 1].label}
      <ArrowRightIcon className="w-6 h-6" onClick={increaseMonth} />
    </div>
  );
};

export default Arrows;
