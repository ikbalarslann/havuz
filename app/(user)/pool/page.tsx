"use client";
import DatePickerForm from "@/components/user/date-form";
import Slider from "@/components/user/slider";
import { useEffect, useState } from "react";
import * as z from "zod";
import { PropertySchema } from "@/schemas";

const SinglePropertyPage = () => {
  const [array, setArray] = useState<string[]>([]);
  const [property, setProperty] = useState<z.infer<typeof PropertySchema>>();

  useEffect(() => {
    const singleProperty = localStorage.getItem("singleProperty");
    const object = singleProperty && JSON.parse(singleProperty);

    setProperty(object);
    setArray(object.imgUrls);
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-6xl pb-3 text-blue-100">{property?.title}</h1>

      <Slider array={array} />

      <h2 className="text-red-50 py-3 text-center">{property?.description}</h2>
      <div className="pl-6">
        <p>Depth of the pool is {property?.depth}m</p>
        <p>Type : {property?.type} pool</p>
        <p>Check in time: {property?.checkIn}</p>
        <p>Check out time: {property?.checkOut}</p>
        <p className="pb-6">Adress : {property?.location}</p>
      </div>

      <div className="pb-6">
        <DatePickerForm property={property} />
      </div>

      <div className="space-y-6">
        <h1 className="text-4xl mb-6 font-bold">Customer Reviews</h1>

        {property?.reviews &&
          (property?.reviews.length > 0 ? (
            property?.reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold mr-2">
                      {review.rating}/5
                    </span>
                    <span className="text-blue-500">{review.title}</span>
                  </div>
                  <p className="ml-auto text-gray-600">{review.date}</p>
                </div>
                <p className="text-gray-700 mb-4">{review.description}</p>
                <div className="flex items-center">
                  <span className="text-gray-700 font-semibold mr-2">
                    Posted by:
                  </span>
                  <span className="text-blue-500">{review.userName}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No reviews yet</p>
          ))}
      </div>
    </div>
  );
};

export default SinglePropertyPage;
