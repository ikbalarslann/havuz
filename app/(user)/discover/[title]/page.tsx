import SingleProperty from "@/components/user/single-property";
import { Metadata } from "next";
import { getPropertyByTitle } from "@/data/property";
import StructuredData from "@/components/user/structured-data";

export async function generateMetadata({
  params,
}: {
  params: { title: string };
}): Promise<Metadata> {
  const title = params.title.split("-").join(" ");
  const property = await getPropertyByTitle(title);
  return {
    title: title,
    description: property?.description,
  };
}

const SinglePropertyPage = async ({
  params,
}: {
  params: { title: string };
}) => {
  const title = params.title.split("-").join(" ");
  const property = await getPropertyByTitle(title);
  const sobj = JSON.stringify(
    property?.availability.find(
      (a: any) => a?.date === new Date().toLocaleDateString("en-GB")
    )
  );
  const obj = sobj && JSON.parse(sobj);
  const price = obj?.price;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "3.5",
      reviewCount: "11",
    },
    description: property?.description,
    name: property?.title,
    image:
      "https://hdqwalls.com/wallpapers/lamborghini-aventador-s-roadster-2019-4k-ok.jpg",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: price,
      priceCurrency: "TL",
    },
    review: [
      {
        "@type": "Review",
        author: "Ellie",
        datePublished: "2011-04-01",
        reviewBody: "The lamp burned out and now I have to replace it.",
        name: "Not a happy camper",
        reviewRating: {
          "@type": "Rating",
          bestRating: "5",
          ratingValue: "1",
          worstRating: "1",
        },
      },
      {
        "@type": "Review",
        author: "Lucas",
        datePublished: "2011-03-25",
        reviewBody:
          "Great microwave for the price. It is small and fits in my apartment.",
        name: "Value purchase",
        reviewRating: {
          "@type": "Rating",
          bestRating: "5",
          ratingValue: "4",
          worstRating: "1",
        },
      },
    ],
  };

  return property ? (
    <>
      <StructuredData data={jsonLd} />
      <SingleProperty propertyObj={property} />
    </>
  ) : (
    <div>
      <h1>Property not found</h1>
    </div>
  );
};

export default SinglePropertyPage;
