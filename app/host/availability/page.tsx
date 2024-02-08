import { currentUser } from "@/lib/auth";
import { getPropertyById } from "@/data/property";
import Callendar from "@/components/host/callendar/callendar";

const HostAvaliabilityPage = async () => {
  const user = await currentUser();
  const property = user && (await getPropertyById(user.propertyIds[0]));
  const availabilityArray = (property?.availability || []).map((a) => {
    return JSON.stringify(a);
  });
  const availabilityObjArray = availabilityArray.map((a) => JSON.parse(a));

  return (
    <div key={property?.title}>
      <div>
        <Callendar property={property} array={availabilityObjArray} />
      </div>
    </div>
  );
};

export default HostAvaliabilityPage;
