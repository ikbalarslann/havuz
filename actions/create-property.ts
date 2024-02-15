"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { CreatePropertyFormProps } from "@/schemas";
import { getPropertyByTitle } from "@/data/property";
import { currentUser } from "@/lib/auth";

export const createProperty = async (
  values: z.infer<typeof CreatePropertyFormProps>
) => {
  const validatedFields = CreatePropertyFormProps.safeParse(values);
  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    title,
    description,
    meta,
    price,
    free,
    imgUrls,
    location,
    address,
    depth,
    type,
    tags,
    checkIn,
    checkOut,
  } = validatedFields.data;

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
        meta: meta,
        imgUrls: imgUrls,
        depth: depth,
        location: location,
        address: address,
        type: type,
        tags: tags,
        availability: avaliabiliyMock,
        checkIn: checkIn,
        checkOut: checkOut,
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
