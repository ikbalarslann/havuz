"use server";

import { db } from "@/lib/db";
import { getPropertyById } from "@/data/property";

export const UpdateStatus = async ({ bookingId, propertyId, date }: any) => {
  const property = await getPropertyById(propertyId);
  const availability = property?.availability;
  const availabilityArrayWithout = availability?.filter((item: any) => {
    return item.date !== date;
  });
  const theAvailability = availability?.filter((item: any) => {
    return item.date === date;
  });
  const newAvailability = {
    ...theAvailability[0],
    free: theAvailability[0].free - 1,
  };
  const newAvailabilityArray = [...availabilityArrayWithout, newAvailability];

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
