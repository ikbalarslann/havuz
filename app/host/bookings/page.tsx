import { getBookingByPropertyId } from "@/data/booking";
import { currentUser } from "@/lib/auth";

const HostBookingsPage = async () => {
  const user = await currentUser();
  const bookings = await getBookingByPropertyId(user.propertyIds[0]);

  return (
    <div className="p-4 shadow-md">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>

      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="mb-4 p-4 bg-white rounded-md shadow-md"
        >
          <p className="text-lg font-bold mb-2">{booking.date}</p>
          <p className="text-gray-600">User: {booking.userName}</p>
        </div>
      ))}
    </div>
  );
};

export default HostBookingsPage;
