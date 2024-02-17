import { getPropertyById } from "@/data/property";
import { currentUser } from "@/lib/auth";

const HostReviewsPage = async () => {
  const user = await currentUser();
  const property = user && (await getPropertyById(user.propertyIds[0]));
  const reviews = property?.reviews;
  const stringArray = reviews?.map((r) => JSON.stringify(r));
  const reviewsArray = stringArray?.map((r) => JSON.parse(r));

  return (
    <div className="flex flex-col">
      <h1 className="text-xl text-cyan-950 font-bold mb-4 mt-4">
        Customer Reviews
      </h1>

      {reviewsArray && reviewsArray?.length < 1 ? (
        <div className="text-center">No reviews yet</div>
      ) : (
        reviewsArray?.map((review) => (
          <div key={review.id} className="mb-8 p-6 w-[360px] bg-white ">
            <h3 className="text-lg font-bold mb-2">{review.title}</h3>

            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-2 items-center">
                <p className="text-sm">{review.date}</p>
                <h1 className=" ">{review.userName}</h1>
              </div>

              <span className="text-gray-100 p-2 bg-gray-500 rounded">
                {review.rating.toFixed(1)}
              </span>
            </div>

            <p className="text-gray-700">{review.description}</p>
            <hr className="my-2" />
          </div>
        ))
      )}
    </div>
  );
};

export default HostReviewsPage;
