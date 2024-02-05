import { getAllProperties } from "@/data/property";
import PropertyCard from "@/components/user/property-card";

const HomePage = async () => {
  const properties = await getAllProperties();

  return (
    <div className="flex flex-wrap gap-4  justify-center">
      {properties?.map((property) => (
        <div key={property.id}>
          <PropertyCard property={property} />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
