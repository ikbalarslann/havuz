import Link from "next/link";
import { currentUser } from "@/lib/auth";
import { getPropertyById } from "@/data/property";
import Header from "@/components/host/sidebar-header";
import Image from "next/image";

export const Sidebar = async () => {
  const user = await currentUser();
  const properties = user?.propertyIds;
  const property = await getPropertyById(properties[0]);

  return (
    <aside className="bg-gray-400 h-full w-[250px] p-4 shadow-sm flex flex-col items-center ">
      <Image src="/logo.png" width={100} height={100} alt="logo" />

      <Header property={property} />

      <Link
        href="/host/bookings"
        className=" my-2 p-2 hover:bg-gray-300 rounded transition duration-300 w-full text-center mt-8"
      >
        Bookings
      </Link>

      <Link
        href="/host/reviews"
        className="my-2 p-2 hover:bg-gray-300 rounded transition duration-300 w-full text-center"
      >
        Reviews
      </Link>

      <Link
        href="/host/availability"
        className="my-2 p-2 hover:bg-gray-300 rounded transition duration-300 w-full text-center"
      >
        Availability
      </Link>
    </aside>
  );
};
