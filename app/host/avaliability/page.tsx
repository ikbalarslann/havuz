import { currentUser } from "@/lib/auth";
import { getPropertyById } from "@/data/property";
import { Modal } from "@/components/host/avaliability-modal";

const HostAvaliabilityPage = async () => {
  const user = await currentUser();
  const property = await getPropertyById(user.propertyIds[2]);
  return (
    <div key={property?.title}>
      <h1>{property?.title}</h1>
      <p>{property?.availability[0].free}</p>

      <div className="grid grid-cols-5 gap-4">
        {property?.availability.map((a) => (
          <Modal
            key={a?.id}
            property={a}
            title={property.title}
            Trigger={
              <div
                key={a.id}
                className="bg-white p-4 rounded-md shadow-md transition transform hover:scale-105"
              >
                <p className="text-lg font-semibold">{a.id}</p>
                <p className="text-gray-600">{a.price}</p>
                <p className="text-green-500">{a.free} available</p>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default HostAvaliabilityPage;
