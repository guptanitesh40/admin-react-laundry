import { useEffect, useState } from "react";
import { useGetCustomerRatingData } from "../../hooks";

const CustomerRatingReport: React.FC = () => {
  const { customerRatingData, fetchCustomerRatingData } =
    useGetCustomerRatingData();
  const [ratings, setRatings] = useState([
    { label: "5", count: 0 },
    { label: "4", count: 0 },
    { label: "3", count: 0 },
    { label: "2", count: 0 },
    { label: "1", count: 0 },
  ]);
  const [averageRating, setAverageRating] = useState(0);
  const [totolRating, setTotalRating] = useState(0);

  useEffect(() => {
    fetchCustomerRatingData();
  }, []);

  useEffect(() => {
    if (customerRatingData) {
      const fetchedRatings = ratings.map((rating) => {
        const data = customerRatingData.find(
          (item: { rating: { toString: () => string } }) =>
            item.rating.toString() === rating.label
        );
        return data ? { ...rating, count: data.count } : rating;
      });

      setRatings(fetchedRatings);

      const totalRating = customerRatingData.reduce(
        (acc: number, data: { rating: number; count: number }) =>
          acc + data.rating * data.count,
        0
      );
      const totalCount = customerRatingData.reduce(
        (acc: any, data: { count: any }) => acc + data.count,
        0
      );
      const avgRating = totalRating / totalCount;
      setAverageRating(avgRating);
      setTotalRating(totalCount);
    }
  }, [customerRatingData]);

  const maxCount = Math.max(...ratings.map((rating) => rating.count));

  return (
    <div className="col-span-3">
      <div className="card w-full">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-700">
            Customer Rating
          </h3>
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-4 ml-3">
            <div>
              <img
                className="default-logo h-[55px] max-w-none"
                src="/media/app/review.png"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl text-gray-700 font-bold">
                {averageRating.toFixed(2)}
              </h2>
              <p className="text-base font-semibold text-gray-700">
                ─ of {totolRating} reviews
              </p>
            </div>
          </div>

          <div className="card-body flex flex-col gap-2 custom-body">
            {ratings.map((rating, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex justify-between text-sm font-medium text-gray-600">
                  <div className="flex gap-2 items-center justify-center">
                    <span>{rating.label}</span>
                    <div
                      key={index}
                      className="rating-label custom-rating checked"
                    >
                      <i className="custom-rating-on rating-on ki-solid ki-star text-base leading-none"></i>
                    </div>
                  </div>
                  
                </div>
                <div className="w-full h-[8px] bg-gray-200 rounded overflow-hidden">
                  <div
                    className="progressbar h-full transition-all duration-500"
                    style={{ width: `${(rating.count / maxCount) * 100}%` }}
                  ></div>
                </div>
                <span className="font-medium text-sm text-gray-600">{rating.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerRatingReport;
