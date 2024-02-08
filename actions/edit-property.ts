"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { EditPropertyFormProps } from "@/schemas";
import { currentUser } from "@/lib/auth";

export const editProperty = async (
  values: z.infer<typeof EditPropertyFormProps>
) => {
  const validatedFields = EditPropertyFormProps.safeParse(values);
  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { description, price, free, imgUrls, checkIn, checkOut } =
    validatedFields.data;

  const avaliabiliyMock = [];

  for (let i = 0; i < 300; i++) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i);

    avaliabiliyMock.push({
      date: currentDate.toLocaleDateString("en-GB"),
      price: ((price * 10) / 9).toFixed(1),
      free: free,
    });
  }

  try {
    await db.property.update({
      where: {
        userId: user?.id,
      },
      data: {
        userId: user?.id,
        description: description,
        imgUrls: imgUrls,
        availability: avaliabiliyMock,
        checkIn: checkIn,
        checkOut: checkOut,
      },
    });

    return { success: "Property Successfully edited!" };
  } catch (error) {
    console.error("Error editing property:", error);
    return { error: "Error editing property!" };
  }
};
