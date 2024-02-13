import { getAllProperties } from "@/data/property";
import PropertyCard from "@/components/user/property-card";
import StructuredData from "@/components/user/structured-data";
import { Metadata } from "next";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@id": "https://havuzvehavuz.com/",
        name: "Havuz ve Havuz",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@id": "https://havuzvehavuz.com/discover",
        name: "Discover",
      },
    },
  ],
};

export const metadata: Metadata = {
  title: "Discover",
  description: "Discover pools in Istanbul and rent them easily.",
};

const DiscoverPage = async () => {
  const properties = await getAllProperties();

  return (
    <div className="flex flex-col sm:flex-row gap-4  justify-center">
      <StructuredData data={jsonLd} />
      {properties?.map((property) => (
        <div key={property.id}>
          <PropertyCard property={property} />
        </div>
      ))}
    </div>
  );
};

export default DiscoverPage;
