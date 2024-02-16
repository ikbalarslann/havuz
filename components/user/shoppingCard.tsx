"use client";

import React, { useEffect, useState } from "react";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { PropertySchema } from "@/schemas";
import { FaRegTrashAlt } from "react-icons/fa";
import Image from "next/image";

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
      <h1 className="text-2xl text-cyan-900">Shopping Card</h1>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row ">
        {items.map((item, index) => (
          <div
            key={index}
            className=" py-1 rounded-md  text-center flex w-full  mx-2 "
          >
            <div className="flex gap-3  flex-col w-[300px]">
              <div className="flex gap-2">
                <div>
                  <Image
                    src={item.imgUrls[0]}
                    alt="property"
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                </div>

                <div className="flex flex-col items-center justify-start">
                  <p className="text-sm text-gray-600">
                    {item.availability[0].date}
                  </p>
                  <h3 className="text-lg font-semibold text-blue-950">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 ml-2">
                    {item.checkIn}-{item.checkOut}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button
                  className=" bg-red-100 rounded-full py-1 px-3"
                  onClick={() => handleRemoveClick(item)}
                >
                  <FaRegTrashAlt className="text-red-600 cursor-pointer w-4 h-4 " />
                </Button>
                <p> {item.availability[0].price} TL</p>
              </div>
              <hr />
            </div>
          </div>
        ))}
      </div>
      <FormError message={error} />
      <FormSuccess message={success} />
      <Button
        onClick={() => handleOnClick()}
        className="w-full bg-cyan-500 text-md"
      >
        Pay Now
      </Button>
    </div>
  ) : (
    <div>shopping card is empty</div>
  );
};

export default ShoppingCard;
