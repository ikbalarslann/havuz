import { currentUser } from "@/lib/auth";
import { getPropertyById } from "@/data/property";
import { Modal } from "@/components/host/avaliability-modal";

const HostAvaliabilityPage = async () => {
  const user = await currentUser();
  const property = user && (await getPropertyById(user.propertyIds[0]));
  const availabilityArray = (property?.availability || []).map((a) => {
    return JSON.stringify(a);
  });
  const availabilityObjArray = availabilityArray.map((a) => JSON.parse(a));

  return (
    <div key={property?.title}>
      <div className="grid grid-cols-5 gap-4">
        {availabilityObjArray.map(
          (a) =>
            a && (
              <Modal
                key={a?.id}
                availabilityItem={a}
                title={property?.title}
                Trigger={
                  <div
                    key={a.id}
                    className="bg-white p-4 rounded-md shadow-md transition transform hover:scale-105"
                  >
                    <p className="text-lg font-semibold">{a.date}</p>
                    <p className="text-gray-600"> Price: {a.price} TL</p>
                    <p className="text-gray-500">Free : {a.free} People </p>
                  </div>
                }
              />
            )
        )}
      </div>
    </div>
  );
};

export default HostAvaliabilityPage;
