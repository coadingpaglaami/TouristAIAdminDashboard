import { BarChartReturn } from "./BarChartReturn";
import { BarChartRevenue } from "./BarChartRevenue";
import { PieChartStatus } from "./PieChartStatus";
import { RevenueLeaderBoard } from "./RevenueLeaderBoard";

export const Analytics = () => {
  return (
    <div className="flex flex-col gap-8 w-full lg:h-[78vh] my-8 px-4">
      <div className="grid md:grid-cols-2 gap-4 w-full h-1/2" >
        <div className="w-full ">
          <BarChartReturn />
        </div>
        <div className="w-full">
          {/* <PieChartStatus /> */}
          <PieChartStatus />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full md:flex-row lg:h-1/2 lg:my-8">
        <div className="lg:w-[65%] h-full ">
          <BarChartRevenue />
        </div>
        <div className=" lg:w-[35%] h-full">
            <RevenueLeaderBoard />
        </div>
      </div>
    </div>
  );
};

