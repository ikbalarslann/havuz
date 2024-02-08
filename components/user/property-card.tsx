"use client";

import { set } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const PropertyCard = ({ property }: any) => {
  const [currentDate, setCurrentDate] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [price, setPrice] = useState("");

  useEffect(() => {
    const date = localStorage.getItem("choosenDate");

    date && setCurrentDate(date);
  }, []);

  useEffect(() => {
    const avilabilityArray = property.availability;
    const avilability = avilabilityArray.find((item: any) => {
      return item.date === currentDate;
    });
    setPrice(avilability?.price);

    if (!avilability) {
      setIsAvailable(false);
      return;
    }
    avilability.free > 0 ? setIsAvailable(true) : setIsAvailable(false);
  }, [currentDate]);

  const onClick = () => {
    const singleProperty = JSON.stringify(property);

    localStorage.setItem("singleProperty", singleProperty);
  };

  return (
    isAvailable && (
      <Link href="/pool">
        <div
          className="bg-blue-200 rounded-md text-center p-4 flex-1 mx-2"
          key={property.title}
          style={{ cursor: "pointer", maxWidth: "600px" }}
          onClick={onClick}
        >
          <div className="relative overflow-hidden rounded-md">
            <Image
              src={`${property.imgUrls[0]}`}
              alt={property.title}
              width={1000}
              height={700}
              className="rounded-md z-0 "
            />
          </div>
          <h3 className="text-blue-600 text-xl font-bold mb-2 pt-3">
            {property.title}
          </h3>
          <p> Price : {price} TL</p>
        </div>
      </Link>
    )
  );
};

export default PropertyCard;
