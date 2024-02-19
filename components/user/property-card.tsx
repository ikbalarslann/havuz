"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { DotFilledIcon } from "@radix-ui/react-icons";

import { HoverIcon } from "./icon-hover";

const PropertyCard = ({ property }: any) => {
  const [currentDate, setCurrentDate] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [price, setPrice] = useState("");

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

  const averageRating = () => {
    let sum = 0;
    property.reviews.forEach((review: any) => {
      sum += review.rating;
    });
    return sum / property.reviews.length;
  };

  return (
    isAvailable && (
      <Link href={linkTo()}>
        <div
          className=" rounded-md  "
          key={property.title}
          style={{ cursor: "pointer", maxWidth: "600px" }}
        >
          <Image
            src={`${property.imgUrls[0]}`}
            alt={property.title}
            width={400}
            height={200}
            className="rounded-md"
          />
          <h3 className="text-blue-950 text-xl font-medium  mb-2 pt-3 ">
            {property.title}
          </h3>
          <div className="flex items-center justify-start gap-1">
            {property.type !== "mix" && (
              <p className="p-1 bg-blue-900 text-gray-100  rounded  inline mr-2 ">
                {property.type}
              </p>
            )}

            {property.reviews.length > 0 && (
              <>
                <p className="bg-gray-300 text-gray-800 inline p-1 rounded ">
                  {averageRating().toFixed(1)}
                </p>
                <DotFilledIcon className="w-3 h-3 text-blue-900 inline" />
                <p className="inline">{property.reviews.length} Reviews</p>
              </>
            )}
          </div>
          {property.title === "Guven Hamam" && (
            <div className="mt-1">
              <p className="p-1 bg-amber-600 text-gray-100 text-sm rounded  inline mr-2   ">
                Tuesday Women&apos;s Only
              </p>
            </div>
          )}
          <div className="my-3 flex gap-3">
            {property.tags.map((tag: string, index: number) => (
              <div key={index}>
                <HoverIcon tag={tag} />
              </div>
            ))}
          </div>

          <div className="flex justify-between px-3 items-center   text-gray-900">
            <p className="font-medium">Day Pass</p>
            <div className="flex  items-end gap-1">
              <span className="font-bold text-xl text-blue-950">{price}</span>
              <span className="font-light ">TL</span>
            </div>
          </div>
          <hr />
        </div>
      </Link>
    )
  );
};

export default PropertyCard;
