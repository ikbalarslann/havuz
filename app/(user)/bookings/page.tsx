import { getBookingByUserId } from "@/data/booking";
import { currentUser } from "@/lib/auth";
import ReviewButton from "@/components/user/review-button";
import Modal from "@/components/user/booking-modal";

const BookingPage = async () => {
  const user = await currentUser();
  const bookings = user && (await getBookingByUserId(user.id));
  const bookingsPending = bookings?.filter(
    (booking) => booking.status === "PENDING"
  );
  const bookingsApproved = bookings?.filter(
    (booking) => booking.status === "APPROVED"
  );

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-center text-cyan-950">
        Arrival Bookings
      </h1>
      {bookingsPending?.map((booking: any) => (
        <div key={booking.id}>
          <Modal
            booking={booking}
            trigger={
              <div
                key={booking.id}
                className=" px-1 py-2 mb-1 w-[350px] flex flex-col items-start justify-start shadow rounded"
              >
                <h2 className="text-gray-500 text-sm">{booking.date}</h2>
                <p className="text-cyan-900 text-center">
                  {booking.propertyTitle}
                </p>
              </div>
            }
          />
        </div>
      ))}

      <hr className="my-4" />

      <h1 className="text-xl font-bold mb-4 text-center text-cyan-950">
        Previous Bookings
      </h1>

      {bookingsApproved?.map((booking: any) => (
        <div key={booking.id} className="mb-4 px-1 py-2  ">
          <p className="text-gray-600 text-sm">{booking.date}</p>

          <p className="text-lg text-cyan-950 mb-1 ">{booking.propertyTitle}</p>
          <div className="flex justify-between">
            <p className="text-gray-600 ">
              {booking.checkIn} - {booking.checkOut}
            </p>
            <p className="text-gray-600 ">{booking.price.toFixed(1)}TL</p>
          </div>

          {!booking.review && (
            <ReviewButton
              bookingId={booking.id}
              propertyId={booking.propertyId}
            />
          )}
          <hr className="my-3" />
        </div>
      ))}
    </div>
  );
};

export default BookingPage;
