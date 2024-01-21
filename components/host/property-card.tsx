"use client";

import React, { useState, useEffect } from "react";
import { PropertySchema } from "@/schemas";
import Image from "next/image";
import * as z from "zod";

const PropertyCard = ({
  property,
}: {
  property: z.infer<typeof PropertySchema>;
}) => {
  const [test, setTest] = useState<z.infer<typeof PropertySchema>[]>([]);

  useEffect(() => {
    const storedTest = localStorage.getItem("test");
    if (storedTest) {
      setTest(JSON.parse(storedTest));
    }
  }, []);

  const handleCardClick = () => {
    // Use push directly on the array
    test.push(property);

    // Update the state with the new array
    setTest([...test]);

    // Store the updated test array in localStorage
    localStorage.setItem("test", JSON.stringify(test));
  };

  return (
    <div
      className="bg-red-200 rounded-md text-center"
      key={property.title}
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <h3 className="text-red-600">{property.title}</h3>
      <p>{property.description}</p>
      <Image
        src={`${property.imgUrl}`}
        alt={property.title}
        width={100}
        height={50}
      />
    </div>
  );
};

export default PropertyCard;
