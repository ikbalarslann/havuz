"use client";

import DatePickerForm from "@/components/user/date-form-pool";
import Slider from "@/components/user/slider";
import { useEffect, useState } from "react";
import * as z from "zod";
import { PropertySchema } from "@/schemas";
import { IoLocationOutline } from "react-icons/io5";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { HoverIcon } from "./icon-hover";
import { FaRegClock } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import { SiGooglemaps } from "react-icons/si";
import Hours from "./hours";

const SingleProperty = ({ propertyObj }: { propertyObj: any }) => {
  const [array, setArray] = useState<string[]>([]);
  const [property, setProperty] = useState<z.infer<typeof PropertySchema>>();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeTab, setActiveTab] = useState("DayPass");

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  useEffect(() => {
    setProperty(propertyObj);
    setArray(propertyObj.imgUrls);
  }, [propertyObj]);

  const averageRating = () => {
    let sum = 0;
    property?.reviews.forEach((review: any) => {
      sum += review.rating;
    });

    if (!property) return;

    return sum / property?.reviews?.length;
  };

  const openNewTab = () => {
    window.open(property?.location, "_blank");
  };

  const howItWorks = [
    {
      title: "1",
      description:
        "Select an available day in the calendar and complete booking",
    },
    {
      title: "2",
      description: "Receive booking confirmation with details and instructions",
    },
    {
      title: "3",
      description:
        "Payments are in-person at the front desk on the day of visit",
    },
    {
      title: "4",
      description: "Bring valid photo ID and check-in at the front desk",
    },
    {
      title: "5",
      description: "Enjoy your pool day!",
    },
  ];

  return (
    <div className="flex flex-col max-w-[400px]">
      <Slider array={array} />
      <div className="mx-2 my-1">
        <div className="flex  items-center">
          <IoLocationOutline className="text-xl text-orange-600 " />
          <p className="font-medium">Istanbul,Turkey</p>
        </div>

        <h1 className="text-3xl pb-3 text-gray-700 font-medium">
          {property?.title}
        </h1>

        {property && property?.reviews.length > 0 && (
          <div className="mb-3">
            <p className="bg-gray-300 text-gray-800 inline p-1 rounded ">
              {averageRating()?.toFixed(1)}
            </p>
            <DotFilledIcon className="w-3 h-3 text-blue-900 inline" />
            <p className="inline">
              {property && property.reviews.length} Reviews
            </p>
          </div>
        )}
        {property?.type !== "mix" && (
          <div className="bg-amber-100 p-3 rounded-md gap-3 flex ">
            <IoWarningOutline className="text-amber-600 w-6 h-6 " />
            <p className="text-gray-700 ">This is {property?.type} pool</p>
          </div>
        )}

        <div className=" py-4 px-2 mb-1 ">
          <p
            className={`overflow-hidden ${
              showFullDescription ? "" : "h-[100px]"
            }`}
          >
            {property?.description}
          </p>
          <Button
            variant="link"
            className="m-0 p-0 font-bold "
            onClick={toggleDescription}
          >
            {showFullDescription ? "Read Less" : "Read More"}
          </Button>
        </div>

        <div className="flex my-4">
          <p
            className={`flex-1 text-center border-t-4 pt-2 ${
              activeTab === "DayPass" ? "border-cyan-500" : "border-transparent"
            }`}
            onClick={() => handleTabClick("DayPass")}
          >
            DayPass
          </p>
          <p
            className={`flex-1 text-center border-t-4 pt-2 ${
              activeTab === "Reviews"
                ? " border-cyan-500"
                : "border-transparent"
            }`}
            onClick={() => handleTabClick("Reviews")}
          >
            Reviews
          </p>
        </div>
        {activeTab === "DayPass" ? (
          <div>
            <h2 className="text-gray-800 my-3 text-2xl font-medium">
              When&apos;s your pool day?
            </h2>
            <div className="pb-6">
              {property && <DatePickerForm property={property} />}
            </div>
            <hr />
            <div>
              <h2 className="font-medium text-xl my-2">Amenities</h2>
              <div className="flex flex-col gap-2 mb-3">
                {property?.tags.map((amenity: any, index: number) => (
                  <div key={index} className="flex gap-4">
                    <HoverIcon tag={amenity} iconSize={7} />

                    <p className="text-gray-600">{amenity}</p>
                  </div>
                ))}
              </div>
            </div>

            <hr />

            <div className="py-3">
              <h2 className="text-gray-800 mb-3 text-2xl font-medium">Hours</h2>

              <Hours type={property?.type} hours={property?.hours} />
            </div>

            <hr />
            <div className="py-3">
              <h2 className="text-gray-800 mb-3 text-2xl font-medium">
                How it Works
              </h2>
              <div className="flex flex-col gap-3">
                {howItWorks.map((item) => (
                  <div className="flex gap-3 items-start" key={item.title}>
                    <p className="bg-teal-500 px-3 py-1 rounded-full ">
                      {item.title}
                    </p>
                    <p className="text-gray-600 ">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <hr />

            <div className="my-3">
              <h2 className="text-gray-800 mb-3 text-2xl font-medium">
                Location
              </h2>
              <p className="text-gray-600 my-4">{property?.address}</p>

              <Button
                className=" text-xl font-bold mb-2 bg-cyan-500 text-white shadow-none w-full"
                onClick={openNewTab}
              >
                <SiGooglemaps className="w-6 h-6  mr-2" />
                Maps
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <hr />
            <div className="flex justify-between items-center ">
              <div>
                <p className="text-xl text-gray-900 font-medium ">
                  Guest reviews
                </p>
                <p className="text-sm text-gray-500">
                  {property?.reviews.length} verified Havuz ve Havuz reviews
                </p>
              </div>
              <p className=" p-2 shadow rounded bg-gray-200 inline ">
                {averageRating()?.toFixed(1) === "NaN"
                  ? "0.0"
                  : averageRating()?.toFixed(1)}
              </p>
            </div>
            <hr />
            {property?.reviews &&
              (property?.reviews.length > 0 ? (
                property?.reviews.map((review, index) => (
                  <div key={index} className="bg-white  rounded-lg  ">
                    <div className="flex items-center mb-4 justify-between">
                      <p className="text-gray-700 text-xl font-medium">
                        {review.title}
                      </p>

                      <p className=" p-1 shadow rounded bg-gray-200 inline ">
                        {review.rating.toFixed(1)}
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <p className=" text-gray-600 font-medium">
                        {review.date}
                      </p>
                      <p className="text-gray-500">{review.userName}</p>
                    </div>

                    <p className="text-gray-700 my-4">{review.description}</p>
                    <hr />
                  </div>
                ))
              ) : (
                <p className="text-center">No reviews yet</p>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProperty;
