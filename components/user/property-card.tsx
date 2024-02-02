import { PropertySchema } from "@/schemas";
import Image from "next/image";
import * as z from "zod";
import Link from "next/link";

const PropertyCard = ({
  property,
}: {
  property: z.infer<typeof PropertySchema>;
}) => {
  return (
    <Link href={`/${property.id}`}>
      <div
        className="bg-blue-200 rounded-md text-center p-4 flex-1 mx-2"
        key={property.title}
        style={{ cursor: "pointer", maxWidth: "600px" }}
      >
        <div className="relative overflow-hidden rounded-md">
          <Image
            src={`${property.imgUrls[0]}`}
            alt={property.title}
            width={1000}
            height={700}
            className="rounded-md z-0 "
          />
        </div>
        <h3 className="text-blue-600 text-xl font-bold mb-2 pt-3">
          {property.title}
        </h3>
      </div>
    </Link>
  );
};

export default PropertyCard;
