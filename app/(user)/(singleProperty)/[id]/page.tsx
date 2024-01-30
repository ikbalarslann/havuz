import { getPropertyById } from "@/data/property";
import DatePickerForm from "@/components/user/date-form";

const SinglePropertyPage = async ({ params }: any) => {
  const { id } = params;
  const property = await getPropertyById(id);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-6xl">{property?.title}</h1>
      <h2 className="text-red-50">{property?.description}</h2>
      <DatePickerForm property={property} />
    </div>
  );
};

export default SinglePropertyPage;
