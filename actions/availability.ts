"use server";

import { db } from "@/lib/db";
import { getPropertyByTitle } from "@/data/property";

interface updateProps {
  title: string;
  values: {
    date: string;
    price: string;
    free: number;
  };
}

export const UpdatePropertyAvailability = async ({
  title,
  values,
}: updateProps) => {
  const { date, price, free } = values;
  const property = await getPropertyByTitle(title);
  const stringAvailability = property?.availability.map((a) =>
    JSON.stringify(a)
  );
  const objAvailability =
    stringAvailability && stringAvailability.map((a) => JSON.parse(a));
  const availability = (objAvailability || []).filter((a) => a?.date !== date);
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
