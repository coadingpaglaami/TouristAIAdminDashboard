import { BarChartReturn } from "./BarChartReturn";
import { BarChartRevenue } from "./BarChartRevenue";
import { PieChartStatus } from "./PieChartStatus";
import { RevenueLeaderBoard } from "./RevenueLeaderBoard";

export const Analytics = () => {
  return (
    <div className="flex flex-col gap-8 w-full my-8 px-4">
      <div className="grid md:grid-cols-2 gap-4 w-full">
        <div className="w-full">
          <BarChartReturn />
        </div>
        <div className="w-full">
          {/* <PieChartStatus /> */}
          <PieChartStatus />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full md:flex-row">
        <div className="lg:w-[65%]">
          <BarChartRevenue />
        </div>
        <div className=" lg:w-[35%]">
            <RevenueLeaderBoard />
        </div>
      </div>
    </div>
  );
};

