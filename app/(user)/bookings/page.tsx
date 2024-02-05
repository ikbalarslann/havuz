import { getBookingByUserId } from "@/data/booking";
import { currentUser } from "@/lib/auth";
import ReviewButton from "@/components/user/review-button";

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
      <h1 className="text-2xl font-bold mb-4">Arrival Bookings</h1>

      {bookingsPending?.map((booking) => (
        <div
          key={booking.id}
          className="mb-4 p-4 bg-blue-100 rounded-md shadow-md"
        >
          <h2 className="text-xl font-bold">{booking.date}</h2>
          <p className="text-gray-600">Price: ${booking.price}</p>
          <p className="text-gray-600">Pool: {booking.propertyTitle}</p>
          <p className="text-gray-600">Adress: {booking.location}</p>
        </div>
      ))}

      <hr />

      <h1 className="text-2xl font-bold my-4">Previous Bookings</h1>

      {bookingsApproved?.map((booking) => (
        <div
          key={booking.id}
          className="mb-4 p-4 bg-blue-100 rounded-md shadow-md"
        >
          <h2 className="text-xl font-bold">{booking.date}</h2>
          <p className="text-gray-600">Price: ${booking.price}</p>
          <p className="text-gray-600">Pool: {booking.propertyTitle}</p>
          <p className="text-gray-600">Adress: {booking.location}</p>
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
