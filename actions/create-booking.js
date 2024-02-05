"use server";

import { db } from "@/lib/db";
import { getPropertyById } from "@/data/property";
import { currentUser } from "@/lib/auth";

export const createBooking = async (property) => {
  console.log("property", property);

  const user = await currentUser();

  const inputs = {
    propertyId: property.id,
    userId: user.id,
    date: property.availability[0].date,
    price: parseFloat(property.availability[0].price),
    propertyTitle: property.title,
    userName: user?.name,
    discountCode: property.code,
    location: property.location,
  };

  const {
    propertyId,
    userId,
    date,
    price,
    propertyTitle,
    userName,
    discountCode,
    location,
  } = inputs;

  try {
    await db.booking.create({
      data: {
        propertyId,
        userId,
        date,
        price,
        propertyTitle,
        userName,
        discountCode,
        location,
      },
    });
    const property = await getPropertyById(propertyId);
    const theDate = property.availability.find((a) => a.id === date);
    const updatedDate = { ...theDate, free: theDate.free - 1 };
    const updatedAvailability = property.availability.map((a) =>
      a.id === date ? updatedDate : a
    );

    await db.property.update({
      where: {
        id: propertyId,
      },
      data: {
        availability: updatedAvailability,
      },
    });

    return { success: "Property Successfully created!" };
  } catch (error) {
    console.error("Error creating property:", error);
    return { error: "Error creating property!" };
  }
};
