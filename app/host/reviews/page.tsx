import { getPropertyById } from "@/data/property";
import { currentUser } from "@/lib/auth";
import ApproveButton from "@/components/host/approve-button";

const HostReviewsPage = async () => {
  const user = await currentUser();
  const property = await getPropertyById(user.propertyIds[0]);
  const reviews = property?.reviews;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Customer Reviews</h1>

      {reviews?.map((review) => (
        <div
          key={review.id}
          className="mb-8 p-6 w-[500px] bg-white rounded-md shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">{review.userName}</h1>
            <span
              className={`text-${
                review.rating >= 4 ? "green" : "red"
              }-500 font-semibold`}
            >
              {review.rating}/5
            </span>
          </div>
          <h3 className="text-lg font-bold mb-2">{review.title}</h3>
          <p className="text-gray-700">{review.description}</p>
        </div>
      ))}
    </div>
  );
};

export default HostReviewsPage;
