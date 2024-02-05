"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createBooking } from "@/actions/create-booking";
import { useRouter } from "next/navigation";
import { DiscountForm } from "@/components/user/discount-form";

const Payment = () => {
  const router = useRouter();

  const [items, setItems] = useState([]);
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
        const newPrice = availability[0].price * 0.9;
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
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Payment</h1>
      <div className="bg-blue-100 p-4 rounded-md my-5 mx-1">
        {items.map((item, index) => (
          <p key={index} className="mb-4">
            {item.title}
            {"   "}
            Date: {item.availability[0].date}
            {"   "} Price: {item.availability[0].price} TL
          </p>
        ))}
        total Price : {total} TL
        {discount ? (
          <p className="text-green-500 ">Discounted Price : {total * 0.9} TL</p>
        ) : (
          ""
        )}
      </div>
      <p className="my-4 mx-1 bg-red-300 p-3 rounded-md text-gray-900">
        <span className="text-red-600">important Note:</span> full payment will
        be charged in person at the time of check-in
      </p>
      <DiscountForm setDiscount={setDiscount} setCode={setCode} />
      <Button className="my-4" onClick={handlePayment}>
        Complete the Reservation
      </Button>
    </div>
  );
};

export default Payment;
