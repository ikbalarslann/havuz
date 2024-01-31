import { currentUser } from "@/lib/auth";
import { getApprovedBookingByPropertyId } from "@/data/booking";

const HostAnalyticsPage = async () => {
  const user = await currentUser();
  const bookings = await getApprovedBookingByPropertyId(user.propertyIds[0]);

  return (
    <div>
      <h1>Money-day weekly bar chart</h1>
      length: {bookings?.length}
      <hr />
      <h1>Occupancy-day weekly bar chart</h1>
    </div>
  );
};

export default HostAnalyticsPage;
