"use server";

import { db } from "@/lib/db";

export const UpdateStatus = async ({ bookingId }: any) => {
  try {
    await db.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "APPROVED",
      },
    });

    return { success: "Property Successfully created!" };
  } catch (error) {
    console.error("Error creating property:", error);
    return { error: "Error creating property!" };
  }
};
