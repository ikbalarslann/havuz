"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { ReviewSchema } from "@/schemas";
import { v4 as uuidv4 } from "uuid";
import { currentUser } from "@/lib/auth";
import { getPropertyById } from "@/data/property";

export const createReview = async (values: z.infer<typeof ReviewSchema>) => {
  const validatedFields = ReviewSchema.safeParse(values);
  const user = await currentUser();

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { bookingId, propertyId, rating, title, description } =
    validatedFields.data;

  try {
    const property = await getPropertyById(propertyId);
    const reviewArray = property?.reviews;
    const review = {
      id: uuidv4(),
      bookingId: bookingId,
      userId: user?.id,
      userName: user?.name,
      rating: rating,
      title: title,
      description: description,
    };

    const newReviewArray = [...reviewArray, review];

    await db.property.update({
      where: {
        id: propertyId,
      },
      data: {
        reviews: newReviewArray,
      },
    });

    await db.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        review: true,
      },
    });

    return { success: "Property Successfully created!" };
  } catch (error) {
    console.error("Error creating property:", error);
    return { error: "Error creating property!" };
  }
};
