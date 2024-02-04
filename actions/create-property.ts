"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { PropertySchema } from "@/schemas";
import { getPropertyByTitle } from "@/data/property";
import { currentUser } from "@/lib/auth";

export const createProperty = async (
  values: z.infer<typeof PropertySchema>
) => {
  const validatedFields = PropertySchema.safeParse(values);
  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { title, description, price, free, imgUrls, location, depth, type } =
    validatedFields.data;

  const avaliabiliyMock = [];

  for (let i = 0; i < 30; i++) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i);

    avaliabiliyMock.push({
      date: currentDate.toLocaleDateString("en-GB"),
      price: ((price * 10) / 9).toFixed(1),
      free: free,
    });
  }
  const existingProperty = await getPropertyByTitle(title);

  if (existingProperty) {
    return { error: "Title already in use!" };
  }
  try {
    const createdproperty = await db.property.create({
      data: {
        userId: user?.id,
        title: title,
        description: description,
        imgUrls: imgUrls,
        depth: depth,
        location: location,
        type: type,
        availability: avaliabiliyMock,
      },
    });

    await db.user.update({
      where: {
        id: user?.id,
      },
      data: {
        propertyIds: {
          push: createdproperty.id,
        },
      },
    });

    return { success: "Property Successfully created!" };
  } catch (error) {
    console.error("Error creating property:", error);
    return { error: "Error creating property!" };
  }
};
