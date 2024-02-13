import { getAllProperties } from "@/data/property";
import PropertyCard from "@/components/user/property-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discover",
  description: "Discover pools in Istanbul and rent them easily.",
};

const DiscoverPage = async () => {
  const properties = await getAllProperties();

  return (
    <div className="flex flex-col sm:flex-row gap-4  justify-center">
      {properties?.map((property) => (
        <div key={property.id}>
          <PropertyCard property={property} />
        </div>
      ))}
    </div>
  );
};

export default DiscoverPage;
