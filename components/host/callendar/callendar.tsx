"use client";
import Arrows from "./arrows";
import { Modal } from "@/components/host/avaliability-modal";
import { useState, useEffect } from "react";

interface Item {
  date: string;
  price: string;
  free: number;
}

const Callendar = ({ property, array }: any) => {
  const [month, setMonth] = useState("");
  const [filteredArray, setFilteredArray] = useState([]);
  const [year, setYear] = useState("");

  useEffect(() => {
    const filt = array.filter((a: any) => {
      return a.date.split("/")[1] === month;
    });
    const firstItem = array[0];
    setYear(firstItem.date.split("/")[2]);

    setFilteredArray(filt);
  }, [month, array]);

  const comparator = (a: Item, b: Item) => {
    const aDate = parseInt(a.date.slice(0, 2));
    const bDate = parseInt(b.date.slice(0, 2));
    return aDate - bDate;
  };

  // Sorting the array using the custom comparator
  const sortedArray = filteredArray.sort(comparator);

  return (
    <div>
      <div className="flex items-center justify-center flex-col gap-3">
        {year}
        <Arrows setMonth={setMonth} />
      </div>

      <div className="mt-10 grid grid-cols-5 gap-4">
        {sortedArray.map(
          (a: any) =>
            a && (
              <div key={`${a.date}-${month}`}>
                <Modal
                  availabilityItem={a}
                  title={property?.title}
                  Trigger={
                    <div className="bg-white p-4 rounded-md shadow-md transition transform hover:scale-105">
                      <p className="text-lg font-semibold text-center">
                        {a.date.split("/")[0]}
                      </p>
                      <p className="text-gray-600"> Price: {a.price} TL</p>
                      <p className="text-gray-500">max : {a.free} People </p>
                    </div>
                  }
                />
              </div>
            )
        )}
      </div>
    </div>
  );
};
export default Callendar;
