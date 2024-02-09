"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
const Arrows = ({ setMonth }: any) => {
  const [currentMonth, setCurrentMonth] = useState("01");
  const arrayIndex = parseInt(currentMonth) - 1;

  const month = [
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
  ];

  useEffect(() => {
    const date = new Date();
    const stringDate = date.toLocaleDateString("en-GB");
    const dateArray = stringDate.split("/");

    setCurrentMonth(dateArray[1]);
  }, []);

  useEffect(() => {
    setMonth(month[arrayIndex].value);
  }, [currentMonth, arrayIndex, setMonth, month]);

  const increseMonth = () => {
    if (currentMonth === "12") return;
    const numbermonth = parseInt(currentMonth);
    const newMonth = numbermonth + 1;
    const newMonthString = newMonth.toString();
    currentMonth && setCurrentMonth(newMonthString);
  };

  const decreseMonth = () => {
    const numbermonth = parseInt(currentMonth);
    if (numbermonth === 1) return;
    const newMonth = numbermonth - 1;
    const newMonthString = newMonth.toString();
    currentMonth && setCurrentMonth(newMonthString);
  };

  return (
    <div className="flex justify-between w-[500px] ">
      <ArrowLeftIcon className="w-6 h-6" onClick={decreseMonth} />
      {month[arrayIndex].label}
      <ArrowRightIcon className="w-6 h-6" onClick={increseMonth} />
    </div>
  );
};

export default Arrows;
