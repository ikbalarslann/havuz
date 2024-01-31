import { getBookingByUserId } from "@/data/booking";
import { currentUser } from "@/lib/auth";

const BookingPage = async () => {
  const user = await currentUser();
  const bookings = await getBookingByUserId(user.id);
  const bookingsPending = bookings?.filter(
    (booking) => booking.status === "PENDING"
  );
  const bookingsApproved = bookings?.filter(
    (booking) => booking.status === "APPROVED"
  );
  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Arrival Bookings</h1>

      {bookingsPending?.map((booking) => (
        <div
          key={booking.id}
          className="mb-4 p-4 bg-white rounded-md shadow-md"
        >
          <h2 className="text-xl font-bold">{booking.date}</h2>
          <p className="text-gray-600">Price: ${booking.price}</p>
          <p className="text-gray-600">Property: {booking.propertyTitle}</p>
        </div>
      ))}

      <hr />

      <h1 className="text-2xl font-bold mb-4">Previous Bookings</h1>

      {bookingsApproved?.map((booking) => (
        <div
          key={booking.id}
          className="mb-4 p-4 bg-white rounded-md shadow-md"
        >
          <h2 className="text-xl font-bold">{booking.date}</h2>
          <p className="text-gray-600">Price: ${booking.price}</p>
          <p className="text-gray-600">Property: {booking.propertyTitle}</p>
        </div>
      ))}
    </div>
  );
};

export default BookingPage;
