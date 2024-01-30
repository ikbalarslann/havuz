"use client";

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
        className="bg-red-200 rounded-md text-center"
        key={property.title}
        style={{ cursor: "pointer" }}
      >
        <h3 className="text-red-600">{property.title}</h3>
        <p>{property.description}</p>
        <Image
          src={`${property.imgUrl}`}
          alt={property.title}
          width={100}
          height={50}
        />
      </div>
    </Link>
  );
};

export default PropertyCard;
