import { PlatformStats } from "@/lib/data";

interface PlatformStatsCardProps {
  data: PlatformStats[];
}

export const PlatformStatsCard = ({ data }: PlatformStatsCardProps) => {
  return (
    <div className="">
      <div className="grid lg:grid-cols-3 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col p-3 border rounded-lg  bg-white gap-3"
          >
            <span className=" text-xl font-semibold tracking-wider text-[#1C1B1F]">{item.name}</span>
            <div className="flex items-center">
              <span className="mr-3">{item.icon}</span>
              <p className="font-bold text-2xl">
                {item.numuser.toLocaleString()}
              </p>
            </div>
            <div className="flex justify-between ">
              <span>{item.rate}</span>
              <p className="text-sm text-gray-600">{item.percentage} %</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
