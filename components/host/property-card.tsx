interface Property {
  id: number;
  title: string;
  description: string;
}

const PropertyCard = ({ property }: { property: Property }) => {
  return (
    <div className="bg-red-200 rounded-md text-center" key={property.id}>
      <h3 className="text-red-600">{property.title}</h3>
      <p>{property.description}</p>
    </div>
  );
};

export default PropertyCard;
