"use server";

import { db } from "@/lib/db";
import { getPropertyById } from "@/data/property";

interface updateProps {
  bookingId: string;
  propertyId: string;
  date: string;
}

export const UpdateStatus = async ({
  bookingId,
  propertyId,
  date,
}: updateProps) => {
  const property = await getPropertyById(propertyId);
  const availability = property?.availability;
  const stringAvailability = availability?.map((a) => JSON.stringify(a));
  const objAvailability =
    stringAvailability && stringAvailability.map((a) => JSON.parse(a));
  const availabilityArrayWithout = objAvailability?.filter((item) => {
    return item.date !== date;
  });
  const theAvailability = objAvailability?.filter((item) => {
    return item.date === date;
  });
  const newAvailability = theAvailability && {
    ...theAvailability[0],
    free: theAvailability[0].free - 1,
  };
  const newAvailabilityArray = availabilityArrayWithout && [
    ...availabilityArrayWithout,
    newAvailability,
  ];

  try {
    await db.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "APPROVED",
      },
    });

    await db.property.update({
      where: {
        id: propertyId,
      },
      data: {
        availability: newAvailabilityArray,
      },
    });

    return { success: "Property Successfully created!" };
  } catch (error) {
    console.error("Error creating property:", error);
    return { error: "Error creating property!" };
  }
};
