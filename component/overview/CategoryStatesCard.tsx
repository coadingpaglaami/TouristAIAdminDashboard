import { CategoryStats } from "@/lib/data";

interface CategoryStatsCardProps {
  data: CategoryStats[];
}

export const CategoryStatsCard = ({ data }: CategoryStatsCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow h-full">
      <div className="text-xl font-semibold mb-4 border-b border-gray-300 pb-3">
        <p className="p-4 tracking-wider">Premium user insights</p>
      </div>
      <div className="flex flex-col gap-5 p-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="font-medium tracking-wider">{item.name}</span>
              <span className="font-bold">{item.percentage}%</span>
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
