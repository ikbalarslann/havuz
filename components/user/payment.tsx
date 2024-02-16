"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createBooking } from "@/actions/create-booking";
import { useRouter } from "next/navigation";
import { DiscountForm } from "@/components/user/discount-form";
import * as z from "zod";
import { PropertySchema } from "@/schemas";
import { IoWarningOutline } from "react-icons/io5";

const Payment = () => {
  const router = useRouter();
  const [items, setItems] = useState<z.infer<typeof PropertySchema>[]>([]);
  const [discount, setDiscount] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    const storedItems = localStorage.getItem("shoppingCard");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const total = items.reduce((acc, item) => {
    return acc + parseFloat(item.availability[0].price);
  }, 0);

  const handlePayment = async () => {
    const bookingPromises = items.map(async (item) => {
      if (discount) {
        const availability = item.availability;
        const newPrice = parseFloat(availability[0].price) * 0.9;
        const newAvailability = { ...availability[0], price: newPrice };
        const newItem = {
          ...item,
          availability: [newAvailability],
          code: code,
        };
        return createBooking(newItem);
      }

      return createBooking(item);
    });

    await Promise.all(bookingPromises);

    localStorage.removeItem("shoppingCard");
    router.push("/bookings");
  };

  return (
    <div className="mx-1">
      <h1 className="text-2xl font-medium mb-4 text-center text-cyan-900">
        Payment
      </h1>
      <div className=" my-5 mx-1">
        {items.map((item, index) => (
          <div key={index} className="mb-4  flex flex-col flex-start px-1">
            <p className="text-sm text-gray-500">{item.availability[0].date}</p>

            <div className="flex justify-between pb-2">
              <p className="font-medium text-cyan-900">{item.title}</p>
              <p>{item.availability[0].price} TL</p>
            </div>
            <hr />
          </div>
        ))}
        Total Price : {total.toFixed(1)} TL
        {discount ? (
          <p className="text-green-500 ">
            Discounted Price : {(total * 0.9).toFixed(1)} TL
          </p>
        ) : (
          ""
        )}
      </div>
      <DiscountForm setDiscount={setDiscount} setCode={setCode} />
      <div className="bg-amber-100 p-3 rounded-md gap-3 flex items-center mx-1 ">
        <IoWarningOutline className="text-amber-600 w-8 h-8 " />
        <p className="text-gray-700 ">
          full payment will be charged in person at the time of check-in
        </p>
      </div>

      <Button
        className="my-4 w-full bg-cyan-800 font-medium text-xl"
        onClick={handlePayment}
      >
        Complete the Reservation
      </Button>
    </div>
  );
};

export default Payment;
