"use server";

import { db } from "@/lib/db";
import { getPropertyByTitle } from "@/data/property";

interface Availability {
  date: string;
  price: number;
  free: boolean;
}

export const UpdatePropertyAvailability = async ({
  title,
  values,
}: {
  title: string;
  values: Availability;
}) => {
  const { date, price, free } = values;
  const property = await getPropertyByTitle(title);
  const availability = property?.availability.filter((a) => a?.date !== date);
  const updatedAvailability = [...availability, { date, price, free }];

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
