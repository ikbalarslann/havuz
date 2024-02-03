import Link from "next/link";
import { currentUser } from "@/lib/auth";
import { getPropertyById } from "@/data/property";
import Header from "@/components/host/sidebar-header";

export const Sidebar = async () => {
  const user = await currentUser();
  const properties = user?.propertyIds;
  const property = await getPropertyById(properties[0]);

  return (
    <aside className="bg-gray-400 h-full w-[250px] p-4  shadow-sm flex flex-col items-center ">
      <Header property={property} />

      <Link href="/host/bookings">Bookings</Link>
      <Link href="/host/avaliability">Avaliability</Link>
      <Link href="/host/analytics">Analytics</Link>
      <Link href="/host/reviews">Reviews</Link>
    </aside>
  );
};
