import Link from "next/link";
import { currentUser } from "@/lib/auth";
import { getPropertyById } from "@/data/property";
import Header from "@/components/host/sidebar-header";
import Image from "next/image";

export const Sidebar = async ({ className }: any) => {
  const user = await currentUser();
  const properties = user?.propertyIds;
  const property = properties && (await getPropertyById(properties[0]));

  return (
    <aside
      className={`bg-gray-400 min-h-full w-[250px] p-4 shadow-sm  flex-col items-center ${className}`}
    >
      <Link href="/host">
        <Image src="/logo.png" width={100} height={100} alt="logo" />
      </Link>

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
