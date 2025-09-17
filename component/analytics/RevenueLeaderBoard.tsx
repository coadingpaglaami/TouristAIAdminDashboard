"use client";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useAnalyticsRevenueLeaderBoardQuery } from "@/services/api";
import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { AvatarAndImage } from "../reusable";

export const RevenueLeaderBoard = () => {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "yearly">(
    "weekly"
  );
  const { data } = useAnalyticsRevenueLeaderBoardQuery({ period: timeframe });

  return (
    <div className="bg-white flex flex-col gap-4 p-2 rounded-lg text-xl tracking-wider md:max-h-[40vh]">
      <h2 className="font-semibold text-lg">Revenue Leaderboard</h2>
      <div className="flex gap-2">
        <button
          onClick={() => setTimeframe("weekly")}
          className={
            timeframe === "weekly"
              ? "bg-[#F7C56B] text-white p-2 text-sm rounded-full"
              : "border border-[#1C1B1F] " +
                "p-2 text-sm rounded-full tracking-wider font-light"
          }
        >
          Weekly
        </button>
        <button
          onClick={() => setTimeframe("monthly")}
          className={
            timeframe === "monthly"
              ? "bg-[#F7C56B] text-white p-2 text-sm rounded-full"
              : "border border-[#1C1B1F] " +
                "p-2 text-sm rounded-full tracking-wider font-light"
          }
        >
          Monthly
        </button>
        <button
          onClick={() => setTimeframe("yearly")}
          className={
            timeframe === "yearly"
              ? "bg-[#F7C56B] text-white p-2 text-sm rounded-full"
              : "border border-[#1C1B1F] " +
                "p-2 text-sm rounded-full tracking-wider font-light"
          }
        >
          Yearly
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <span className="tracking-wider text-sm font-semibold">
          Average Revenue Per User
        </span>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-wider leading-10">
            {data?.average_revenue_per_user}$
          </span>
          <div className="text-sm">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              {" "}
              <p className="text-green-500 flex items-center gap-1">
                <ArrowUp /> {data?.growth_percentage}%
              </p>
              <p>
                from last{" "}
                {timeframe === "monthly"
                  ? "month"
                  : timeframe === "weekly"
                  ? "week"
                  : "year"}
              </p>
            </span>{" "}
          </div>
        </div>
      </div>
      <div className="md:max-w-[35vw] overflow-x-auto">
        <Table className=" w-full border-t border-gray-300 overflow-y-scroll">
          <TableBody className="w-full">
            {data?.top_users.slice(0, 5).map((entry, index) => (
              <TableRow key={index} className="border-none">
                <TableCell className="border-none">
                  <AvatarAndImage
                    index={index}
                    username={entry.username}
                    avatar_url={entry.avatar_url}
                  />
                </TableCell>
                <TableCell className="border-none">${entry.revenue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
