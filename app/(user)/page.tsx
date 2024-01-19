import { getAllProperties } from "@/data/property";
import PropertyCard from "@/components/host/property-card";

const HomePage = async () => {
  const properties = await getAllProperties();

  return (
    <div className="flex flex-col gap-4">
      Home page
      {properties?.map((property) => (
        <PropertyCard property={property} />
      ))}
    </div>
  );
};

export default HomePage;
