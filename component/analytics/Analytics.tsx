import { BarChartReturn } from "./BarChartReturn";
import { BarChartRevenue } from "./BarChartRevenue";
import { PieChartStatus } from "./PieChartStatus";
import { RevenueLeaderBoard } from "./RevenueLeaderBoard";

export const Analytics = () => {
  return (
    <div className="flex flex-col gap-4 w-full my-4 md:my-6 lg:my-8 px-2 sm:px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full" >
        <div className="w-full bg-white rounded-lg">
          <BarChartReturn />
        </div>
        <div className="w-full bg-white rounded-lg">
          <PieChartStatus />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="md:w-[65%] rounded-lg">
          <BarChartRevenue />
        </div>
        <div className="md:w-[35%] rounded-lg">
            <RevenueLeaderBoard />
        </div>
      </div>
    </div>
  );
};