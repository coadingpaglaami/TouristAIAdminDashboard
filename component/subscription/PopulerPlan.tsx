import { Calendar } from "@/svg/Chart";

export const PopularPlan = () => {
  return (
    <div className="p-6 tracking-wider mx-auto bg-white rounded-lg h-full">
      <h1 className="text-2xl font-semibold mb-8">Most popular plan</h1>

      <div className="mb-8">
        <h2 className="text-lg font-medium flex items-center">
          <span className="mr-2">
            <Calendar />
          </span>{" "}
          Lifetime
        </h2>
        <p className="text-sm text-gray-600 mt-2 mb-4">
          Chosen by almost all long-term users. Most subscribers rely on this
          plan for long-term access. It consistently drives the highest adoption
          rate.
        </p>
        <div className="w-full h-2 bg-gray-300 rounded-full mb-2">
          <div
            className="h-full rounded-full bg-blue-500"
            style={{ width: "98%" }}
          ></div>
        </div>
        <p className="text-sm font-medium text-gray-800">
          98% of total subscriber
        </p>
      </div>

      <div>
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
      </div>
    </div>
  );
};
