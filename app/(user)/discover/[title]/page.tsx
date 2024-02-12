import SingleProperty from "@/components/user/single-property";
import { Metadata } from "next";
import { getPropertyByTitle } from "@/data/property";

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

  return property ? (
    <SingleProperty propertyObj={property} />
  ) : (
    <div>
      <h1>Property not found</h1>
    </div>
  );
};

export default SinglePropertyPage;
