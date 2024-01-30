import { getAllProperties } from "@/data/property";
import PropertyCard from "@/components/user/property-card";

const HomePage = async () => {
  const properties = await getAllProperties();

  return (
    <div className="flex flex-col gap-4">
      Home page
      {properties?.map((property) => (
        <div key={property.id}>
          <PropertyCard property={property} />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
