"use client";
import DatePickerForm from "@/components/user/date-form-pool";
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
      <h1 className="text-3xl pb-3  text-blue-100 text-center font-bold">
        {property?.title}
      </h1>

      <Slider array={array} />

      <h2 className="bg-blue-500 text-white py-4 px-2 mb-1 rounded-md shadow-md text-center">
        {property?.description}
      </h2>
      <div className="bg-blue-500 py-4  mb-5 rounded-md shadow-md">
        <div className="flex items-center justify-between mx-3">
          <p className="text-white text-center my-1">
            Depth : {property?.depth} m
          </p>
          <p className="text-white text-center my-1">
            Heigth : {property?.heigth} m
          </p>
          <p className="text-white text-center my-1">
            Width : {property?.width} m
          </p>
        </div>

        <p className="text-white text-center my-1">
          Type: {property?.type} pool
        </p>
        <p className="text-white text-center my-1">
          Check-in time: {property?.checkIn}
        </p>
        <p className="text-white text-center my-1">
          Check-out time: {property?.checkOut}
        </p>
        <p className="text-white text-center my-1 pb-3">
          Address: {property?.location}
        </p>
      </div>

      <div className="pb-6">
        {property && <DatePickerForm property={property} />}
      </div>

      <div className="space-y-6">
        <hr />
        <h1 className="text-4xl mb-6 font-bold text-center">Reviews</h1>

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
