"use client";

import React, { useEffect, useState } from "react";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useCurrentUser } from "@/hooks/use-current-user";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Property {
  title: string;
  description: string;
  imgUrl: string;
  availability: Array<JSON>;
}

const ShoppingCard = () => {
  const [items, setItems] = useState<Property[]>([]);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const user = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    // Retrieve items array from localStorage
    const storedItems = localStorage.getItem("test");
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

  return items ? (
    <div className="flex justify-center items-center h-screen flex-col gap-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-purple-500 p-4 rounded-md text-white text-center"
          >
            <h1>{item.availability[0].date}</h1>
            <h2>Price : {item.availability[0].price}</h2>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2">{item.description}</p>

            <Image
              src={`${item.imgUrl}`}
              alt={item.title}
              width={100}
              height={50}
            />
          </div>
        ))}
      </div>
      <FormError message={error} />
      <FormSuccess message={success} />
      <Button onClick={() => handleOnClick()}>Pay Now</Button>
    </div>
  ) : (
    <div>shopping card is empty</div>
  );
};

export default ShoppingCard;
