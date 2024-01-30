"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createBooking } from "@/actions/create-booking";

interface Property {
  title: string;
  description: string;
  imgUrl: string;
  availability: Array<JSON>;
}

const Payment = () => {
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

  const handlePayment = async () => {
    // ToDo:create a booking for each item after creating a booking reduce the free space
    // Clear localStorage
    // localStorage.removeItem("test");
    // ToDo: give success message
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Payment</h1>
      <div className="bg-red-50 p-4 rounded-md">
        {items.map((item, index) => (
          <p key={index} className="mb-4">
            {item.title}
            {"   "}
            Date: {item.availability[0].id}
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
