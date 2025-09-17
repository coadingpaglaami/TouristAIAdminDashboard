import { Skeleton } from "@/components/ui/skeleton";
import { usePopularPlanQuery } from "@/services/api";
import { Calendar } from "@/svg/Chart";

export const PopularPlan = () => {
  const { data, isLoading } = usePopularPlanQuery();
  return (
    <div className="p-6 tracking-wider mx-auto bg-white rounded-lg h-full">
      <h1 className="text-2xl font-semibold mb-8">Most popular plan</h1>

      {isLoading
        ? Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="mb-8">
              {/* Title + Icon */}
              <h2 className="text-lg font-medium flex items-center">
                <Skeleton className="h-5 w-5 rounded mr-2" />
                <Skeleton className="h-5 w-28" />
              </h2>

              {/* Description */}
              <Skeleton className="h-4 w-64 mt-2 mb-4" />

              {/* Progress Bar */}
              <div className="w-full h-2 bg-gray-200 rounded-full mb-2">
                <Skeleton className="h-full w-1/2 rounded-full" />
              </div>

              {/* Percentage */}
              <Skeleton className="h-4 w-40" />
            </div>
          ))
        : data?.most_popular.map((plan) => (
            <>
              <div className="mb-8">
                <h2 className="text-lg font-medium flex items-center">
                  <span className="mr-2">
                    <Calendar />
                  </span>{" "}
                  {plan.name}
                </h2>
                <p className="text-sm text-gray-600 mt-2 mb-4">
                  {plan.description}
                </p>
                <div className="w-full h-2 bg-gray-300 rounded-full mb-2">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{ width: plan.percentage }}
                  ></div>
                </div>
                <p className="text-sm font-medium text-gray-800">
                  {plan.percentage} of total subscriber
                </p>
              </div>
            </>
          ))}
      {/* <div>
        <h2 className="text-lg font-medium flex items-center">
          <span className="mr-2">
            <Calendar />
          </span>{" "}
          <span>10 days</span>
        </h2>
        <p className="text-sm text-gray-600 mt-2 mb-4">
          Users prefer this plan for quick and short-term needs. It remains the
          second most chosen option.
        </p>
        <div className="w-full h-2 bg-gray-300 rounded-full mb-2">
          <div
            className="h-full rounded-full bg-blue-500"
            style={{ width: "88%" }}
          ></div>
        </div>
        <p className="text-sm font-semibold text-gray-800">
          88% of total subscriber
        </p>
      </div> */}
    </div>
  );
};
