import SingleProperty from "@/components/user/single-property";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { title: string };
}): Promise<Metadata> {
  const title = params.title.split("-").join(" ");
  return {
    title: title,
    description: "Rent this beautiful pool for your next vacation! ",
  };
}

const SinglePropertyPage = () => {
  return <SingleProperty />;
};

export default SinglePropertyPage;
