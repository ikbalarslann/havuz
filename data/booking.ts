import { db } from "@/lib/db";

export const getBookingByUserId = async (userId: string) => {
  try {
    const booking = await db.booking.findMany({ where: { userId } });

    return booking;
  } catch {
    return null;
  }
};

export const getBookingByPropertyId = async (propertyId: string) => {
  try {
    const booking = await db.booking.findMany({ where: { propertyId } });

    return booking;
  } catch {
    return null;
  }
};

export const getApprovedBookingByPropertyId = async (propertyId: string) => {
  try {
    const allBookings = await db.booking.findMany({ where: { propertyId } });

    const bookingsApproved = allBookings?.filter(
      (booking) => booking.status === "APPROVED"
    );

    return bookingsApproved;
  } catch {
    return null;
  }
};
