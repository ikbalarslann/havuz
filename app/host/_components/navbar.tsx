import { currentUser } from "@/lib/auth";
import { getPropertyById } from "@/data/property";
import NavbarClient from "@/app/host/_components/navbar-client";

export const Navbar = async ({ className }: any) => {
  const user = await currentUser();
  const properties = user?.propertyIds;
  const property = properties && (await getPropertyById(properties[0]));

  return <NavbarClient property={property} className={className} />;
};
