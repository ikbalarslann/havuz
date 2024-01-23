"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { PropertySchema } from "@/schemas";
import { getPropertyByTitle } from "@/data/property";

export const createProperty = async (
  values: z.infer<typeof PropertySchema>
) => {
  const validatedFields = PropertySchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { title, description, imgUrl } = validatedFields.data;

  const avaliabiliyMock = [
    { date: new Date(), price: 2, free: 3 },
    { date: new Date(), price: 6, free: 4 },
  ];

  const existingProperty = await getPropertyByTitle(title);

  if (existingProperty) {
    return { error: "Title already in use!" };
  }
  try {
    await db.property.create({
      data: {
        title: title,
        description: description,
        imgUrl: imgUrl,
        availability: {
          create: avaliabiliyMock,
        },
      },
    });

    return { success: "Property Successfully created!" };
  } catch (error) {
    console.error("Error creating property:", error);
    return { error: "Error creating property!" };
  }
};
