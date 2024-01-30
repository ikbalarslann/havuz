import { getBookingByUserId } from "@/data/booking";
import { currentUser } from "@/lib/auth";

const BookingPage = async () => {
  const user = await currentUser();
  const bookings = await getBookingByUserId(user.id);
  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>

      {bookings?.map((booking) => (
        <div
          key={booking.id}
          className="mb-4 p-4 bg-white rounded-md shadow-md"
        >
          <h2 className="text-xl font-bold">{booking.date}</h2>
          <p className="text-gray-600">Price: ${booking.price}</p>
          <p className="text-gray-600">User: {booking.userName}</p>
        </div>
      ))}
    </div>
  );
};

export default BookingPage;
