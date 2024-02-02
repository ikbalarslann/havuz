import { getPropertyById } from "@/data/property";
import { currentUser } from "@/lib/auth";
import ApproveButton from "@/components/host/approve-button";

const HostReviewsPage = async () => {
  const user = await currentUser();
  const property = await getPropertyById(user.propertyIds[0]);
  const reviews = property?.reviews;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reviews</h1>

      {reviews?.map((review) => (
        <div key={review.id} className="mb-4 p-4 bg-white rounded-md shadow-md">
          <h1>{review.userName}</h1>
          <h2> rating: {review.rating}</h2>
          <h3 className="text-lg font-bold mb-2">{review.title}</h3>
          <p className="text-gray-600"> {review.description}</p>
        </div>
      ))}
    </div>
  );
};

export default HostReviewsPage;
