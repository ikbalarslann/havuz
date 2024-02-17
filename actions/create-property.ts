"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { CreatePropertyProps } from "@/schemas";
import { getPropertyByTitle } from "@/data/property";
import { currentUser } from "@/lib/auth";

export const createProperty = async (
  values: z.infer<typeof CreatePropertyProps>
) => {
  const validatedFields = CreatePropertyProps.safeParse(values);

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
    hours,
  } = validatedFields.data;

  const stringHours = JSON.stringify(hours);
  const objHours = JSON.parse(stringHours);

  const avaliabiliyMock = [];

  for (let i = 0; i < 300; i++) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i);

    avaliabiliyMock.push({
      date: currentDate.toLocaleDateString("en-GB"),
      price: price,
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
        hours: objHours,
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
