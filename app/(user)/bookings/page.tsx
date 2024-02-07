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
      <h1 className="text-2xl font-bold mb-4 text-center">Arrival Bookings</h1>
      {bookingsPending?.map((booking: any) => (
        <div key={booking.id}>
          <Modal
            booking={booking}
            trigger={
              <div
                key={booking.id}
                className="mb-4 p-4 bg-blue-100 rounded-md shadow-md w-[350px] flex items-center justify-between"
              >
                <h2 className="text-l font-bold">{booking.date}</h2>
                <p className="text-gray-600">Pool : {booking.propertyTitle}</p>
              </div>
            }
          />
        </div>
      ))}

      <hr />

      <h1 className="text-2xl font-bold my-4 text-center">Previous Bookings</h1>

      {bookingsApproved?.map((booking: any) => (
        <div
          key={booking.id}
          className="mb-4 p-4 bg-blue-100 rounded-md shadow-md"
        >
          <p className="text-l font-bold text-center">{booking.date}</p>
          <div className="flex gap-8">
            <p className="text-gray-600">Price: ${booking.price}</p>
            <p className="text-gray-600">Pool: {booking.propertyTitle}</p>
          </div>

          <div className="flex gap-8">
            <p className="text-gray-600">check in: {booking.checkIn}</p>
            <p className="text-gray-600">check out: {booking.checkOut}</p>
          </div>

          <p className="text-gray-600 text-center">
            Adress: {booking.location}
          </p>
          {!booking.review && (
            <ReviewButton
              bookingId={booking.id}
              propertyId={booking.propertyId}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default BookingPage;
