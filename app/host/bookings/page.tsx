import { getBookingByPropertyId } from "@/data/booking";
import { currentUser } from "@/lib/auth";
import ApproveButton from "@/components/host/approve-button";

const HostBookingsPage = async () => {
  const user = await currentUser();
  const bookings = await getBookingByPropertyId(user.propertyIds[0]);
  const bookingsPending = bookings?.filter(
    (booking) => booking.status === "PENDING"
  );
  const bookingsApproved = bookings?.filter(
    (booking) => booking.status === "APPROVED"
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pending Bookings</h1>

      {bookingsPending?.map((booking) => (
        <div
          key={booking.id}
          className="mb-4 p-4 bg-white rounded-md shadow-md"
        >
          <p className="text-lg font-bold mb-2">{booking.date}</p>
          <p className="text-gray-600">User: {booking.userName}</p>

          <ApproveButton bookingId={booking.id} />
        </div>
      ))}

      <hr />

      <h1 className="text-2xl font-bold mb-4 mt-4">Completed Bookings</h1>

      {bookingsApproved?.map((booking) => (
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
