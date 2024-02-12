"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const PropertyCard = ({ property }: any) => {
  const [currentDate, setCurrentDate] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [price, setPrice] = useState("");

  const openNewTab = () => {
    window.open(property.location, "_blank");
  };

  useEffect(() => {
    const date = localStorage.getItem("choosenDate");

    date
      ? setCurrentDate(date)
      : setCurrentDate(new Date().toLocaleDateString("en-GB"));
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
  }, [currentDate, property.availability]);

  const env = () => {
    const environment = property.env;
    if (environment === "indoor") {
      return "Indoor";
    } else {
      return "Outdoor";
    }
  };

  const linkTo = () => {
    const newTitle = property.title.split(" ").join("-");

    return `discover/${newTitle}`;
  };

  return (
    isAvailable && (
      <Link href={linkTo()}>
        <div
          className="bg-blue-200 rounded-md text-center p-4 flex-1 mx-2"
          key={property.title}
          style={{ cursor: "pointer", maxWidth: "600px" }}
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

          <div className="flex justify-between items-center text-l font-bold text-blue-900">
            <p> {price} TL</p>

            <p> {env()}</p>
          </div>
          <Button
            className=" text-xl font-bold  bg-blue-200 text-blue-900 shadow-none hover:text-white  w-full mt-2 "
            onClick={openNewTab}
          >
            Location
          </Button>
        </div>
      </Link>
    )
  );
};

export default PropertyCard;
