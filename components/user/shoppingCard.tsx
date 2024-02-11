"use client";

import React, { useEffect, useState } from "react";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { PropertySchema } from "@/schemas";

const ShoppingCard = () => {
  const [items, setItems] = useState<z.infer<typeof PropertySchema>[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const user = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    // Retrieve items array from localStorage
    const storedItems = localStorage.getItem("shoppingCard");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const handleOnClick = () => {
    if (!user) {
      setError("You must be logged in to book properties.");
      return;
    }
    router.push("/pay");
    setSuccess("Property successfully booked!");
  };

  const handleRemoveClick = (item: z.infer<typeof PropertySchema>) => {
    const spesificItem = items.find(
      (i) =>
        i.title === item.title &&
        i.availability[0].date === item.availability[0].date
    );

    const newItems = items.filter((i) => i !== spesificItem);
    setItems(newItems);
    localStorage.setItem("shoppingCard", JSON.stringify(newItems));
  };

  return items.length > 0 ? (
    <div className="flex justify-start items-center min-h-full flex-col gap-7 ">
      <h1 className="text-3xl">Shopping Card</h1>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row ">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-blue-800 p-4 rounded-md text-white text-center flex w-auto  mx-2 "
          >
            <div className="flex gap-3 justify-center items-center flex-col w-[300px]">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <div className="flex gap-4">
                <p className="pb-1">{item.availability[0].date}</p>
                <p>Price : {item.availability[0].price} TL</p>
              </div>
              <div className="flex gap-4">
                <p>Check in : {item.checkIn}</p>
                <p>Check out : {item.checkOut}</p>
              </div>

              <Button
                onClick={() => handleRemoveClick(item)}
                className="w-full bg-blue-950"
              >
                Remove from the card
              </Button>
            </div>
          </div>
        ))}
      </div>
      <FormError message={error} />
      <FormSuccess message={success} />
      <Button onClick={() => handleOnClick()} className="w-full bg-blue-950">
        Pay Now
      </Button>
    </div>
  ) : (
    <div>shopping card is empty</div>
  );
};

export default ShoppingCard;
