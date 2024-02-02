"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createBooking } from "@/actions/create-booking";
import { useRouter } from "next/navigation";

interface Property {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
  availability: Array<JSON>;
}

const Payment = () => {
  const router = useRouter();

  const [items, setItems] = useState<Property[]>([]);
  useEffect(() => {
    // Retrieve items array from localStorage
    const storedItems = localStorage.getItem("test");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const total = items.reduce((acc, item) => {
    return acc + parseFloat(item.availability[0].price);
  }, 0);

  const handlePayment = () => {
    Promise.all(
      items.map((item) => {
        return createBooking(item);
      })
    );
    localStorage.removeItem("test");
    router.push("/bookings");
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Payment</h1>
      <div className="bg-blue-100 p-4 rounded-md my-5">
        {items.map((item, index) => (
          <p key={index} className="mb-4">
            {item.title}
            {"   "}
            Date: {item.availability[0].date}
            {"   "} Price: ${item.availability[0].price}
          </p>
        ))}
        total Price : ${total}
      </div>
      <Button onClick={handlePayment}>Complete the Payment</Button>
    </div>
  );
};

export default Payment;
