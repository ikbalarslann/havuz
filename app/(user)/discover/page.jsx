import { getAllProperties } from "@/data/property";
import PropertyCard from "@/components/user/property-card";

const DiscoverPage = async () => {
  const properties = await getAllProperties();

  const LinkMap =
    "https://www.google.com/maps/place/Hilton+Waikoloa+Village/@19.9239292,-155.8871765,17z/data=!3m1!4b1!4m9!3m8!1s0x7954778ec6a99dc5:0x65cec723a9eaa336!5m2!4m1!1i2!8m2!3d19.9239292!4d-155.8871765!16s%2Fg%2F113dnw4n8?entry=ttu";

  return (
    <div className="flex flex-col sm:flex-row gap-4  justify-center">
      {properties?.map((property) => (
        <div key={property.id}>
          <PropertyCard property={property} />
        </div>
      ))}
    </div>
  );
};

export default DiscoverPage;
