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
    description: property?.meta,
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

  const averageRating = () => {
    let sum = 0;
    property?.reviews.forEach((review: any) => {
      sum += review.rating;
    });

    if (!property) return;

    return sum / property?.reviews?.length;
  };

  const reviewSchemaArr = property?.reviews.map((review: any) => {
    return {
      "@type": "Review",
      author: review.userName,
      datePublished: review.date,
      reviewBody: review.description,
      name: review.title,
      reviewRating: {
        "@type": "Rating",
        bestRating: "5",
        ratingValue: review.rating.toString(),
        worstRating: "1",
      },
    };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating(),
      reviewCount: property?.reviews.length,
    },
    description: property?.description,
    name: property?.title,
    image: property?.imgUrls[0],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: price,
      priceCurrency: "TL",
    },
    review: reviewSchemaArr,
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
