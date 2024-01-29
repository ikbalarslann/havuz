"use server";

import { db } from "@/lib/db";
import { getPropertyByTitle } from "@/data/property";

export const UpdatePropertyAvailability = async ({ title, values }: any) => {
  const { id, price, free } = values;
  const property = await getPropertyByTitle(title);
  const availability = property?.availability.filter((a) => a?.id !== id);
  const updatedAvailability = [...availability, { id, price, free }];

  try {
    await db.property.update({
      where: {
        title: title,
      },
      data: {
        availability: updatedAvailability,
      },
    });
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};
