import { PlatformStats } from "@/lib/data";
import { ArrowUp } from "lucide-react";
import React from "react";
interface PlatformStatsCardProps {
  data: PlatformStats[];
  period: string;
}

export const PlatformStatsCard = ({ data, period }: PlatformStatsCardProps) => {
  return (
    <div className="grid lg:grid-cols-3 gap-4 max-md:max-w-[90vw] tracking-wider">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex flex-col p-3 border rounded-lg  bg-white gap-3"
        >
          <span className=" text-xl font-semibold tracking-wider text-[#1C1B1F]">
            {item.name}
          </span>
          {item.isGraph ? (
            <div>
              <div className="flex items-center">
                <span className="mr-3">{item.icon}</span>
                <p className="font-bold text-2xl">
                  {(item.numuser ?? 0).toLocaleString()}
                </p>
              </div>
              {Array.isArray(item.rate) &&
                item.rate.map((rateItem, rateIndex) => (
                  <React.Fragment key={rateIndex}>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex justify-between p-1">
                        <span>{rateItem.name}</span>
                        <p className="text-sm text-gray-600">
                          {rateItem.somenum} %
                        </p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${rateItem.somenum}%` }}
                        ></div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-4 mb-4">
                {item.icon}
                <span className="flex items-center gap-2">
                  <ArrowUp className="text-green-500 w-4 h-4" />
                  <span className="text-xs text-green-500 flex flex-row gap-2">
                    {item.comppercentage}%{" "}
                    <p className="text-gray-300">from last {' '}
                {period === "Weekly" ?'week': period === "Monthly" ? 'month' : 'year'}</p>
                  </span>
                </span>
              </div>
              {Array.isArray(item.rate) &&
                item.rate.map((rateItem, rateIndex) => (
                  <React.Fragment key={rateIndex}>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">{rateItem.name}</span>
                      <p className=" text-sm">
                        {(rateItem.somenum ?? 0).toLocaleString()}{" "}
                        {rateItem.suffix}
                      </p>
                    </div>
                  </React.Fragment>
                ))}
            </div>
          )}
          {/* {Array.isArray(item.rate) &&
              item.rate.map((rateItem, rateIndex) => (
                <div key={rateIndex}>
                  <div className="flex justify-between p-1">
                    <div className="flex items-center">
                      <span>{rateItem.name}</span>
                      {rateItem.rating !== 0 && (
                        <span className="ml-2 text-sm text-gray-600 flex items-center gap-1">
                          {"("}
                          {rateItem.rating}
                          {")"} <StarIcon />
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{rateItem.percentage} %</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${rateItem.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))} */}
        </div>
      ))}
    </div>
  );
};
