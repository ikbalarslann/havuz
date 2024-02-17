import { getBookingByPropertyId } from "@/data/booking";
import { currentUser } from "@/lib/auth";
import ApproveButton from "@/components/host/approve-button";

const HostBookingsPage = async () => {
  const user = await currentUser();
  const bookings = user && (await getBookingByPropertyId(user.propertyIds[0]));
  const bookingsPending = bookings?.filter(
    (booking) => booking.status === "PENDING"
  );
  const bookingsApproved = bookings?.filter(
    (booking) => booking.status === "APPROVED"
  );

  return (
    <div>
      <h1 className="text-lg text-cyan-950 font-bold mb-4 mt-4">
        Pending Bookings
      </h1>

      {bookingsPending?.map((booking) => (
        <div
          key={booking.id}
          className="mb-8 p-3 bg-white border rounded-md shadow-md w-[300px] flex items-center justify-between"
        >
          <div>
            <p className="text-sm text-gray-500 mb-2">{booking.date}</p>
            <p className="text-cyan-900">{booking.userName}</p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <ApproveButton
              bookingId={booking.id}
              propertyId={booking.propertyId}
              date={booking.date}
            />
          </div>
        </div>
      ))}

      <hr />

      <h1 className="text-lg text-cyan-950 font-bold mb-4 mt-4">
        Completed Bookings
      </h1>

      {bookingsApproved?.map((booking) => (
        <div key={booking.id} className="mb-4 p-4 bg-white ">
          <p className="text-sm text-gray-500 mb-2">{booking.date}</p>
          <p className="text-cyan-900">{booking.userName}</p>
          <hr className="my-2" />
        </div>
      ))}
    </div>
  );
};

export default HostBookingsPage;
