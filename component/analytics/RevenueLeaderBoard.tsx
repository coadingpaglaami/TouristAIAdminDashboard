"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
type LeaderboardEntry = {
  rank: number;
  name: string;
  amount: number;
  avatarUrl: string; // Assuming you have URL for avatars or a placeholder for now
};

type LeaderboardData = {
  weekly: LeaderboardEntry[];
  monthly: LeaderboardEntry[];
};

const leaderboardData: LeaderboardData = {
  weekly: [
    {
      rank: 1,
      name: "Mostopha Mokless",
      amount: 1200,
      avatarUrl: "/table 1.png",
    },
    {
      rank: 2,
      name: "Lara Lopez",
      amount: 950,
      avatarUrl: "/table 2.png",
    },
    {
      rank: 3,
      name: "Urmila Iokez",
      amount: 880,
      avatarUrl: "/table 3.png",
    },
    {
      rank: 4,
      name: "Myth Siraz",
      amount: 700,
      avatarUrl: "/table 4.png",
    },
  ],
  monthly: [
    {
      rank: 1,
      name: "Mostopha Mokless",
      amount: 4850,
      avatarUrl: "/table 1.png",
    },
    {
      rank: 2,
      name: "Lara Lopez",
      amount: 1952,
      avatarUrl: "/table 2.png",
    },
    {
      rank: 3,
      name: "Urmila Iokez",
      amount: 1882,
      avatarUrl: "/table 3.png",
    },
    {
      rank: 4,
      name: "Myth Siraz",
      amount: 1742,
      avatarUrl: "/table 4.png",
    },
  ],
};
export const RevenueLeaderBoard = () => {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly">("weekly");

  return (
    <div className="bg-white flex flex-col gap-8 p-4 rounded-lg text-xl tracking-wider">
      <h2 className="font-semibold text-xl ">Revenue Leaderboard</h2>
      <div className="flex space-x-4">
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
      </div>
      <div className="flex flex-col gap-2">
        <span className="tracking-wider text-sm font-semibold">
          Average Revenue Per User
        </span>
        <div className="flex items-center gap-2">
          <span className="text-3xl font-bold tracking-wider leading-10">
            $42
          </span>
          <div className="text-sm">
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              {" "}
              <p className="text-green-500 flex items-center gap-1">
                <ArrowUp /> 24%{" "}
              </p>
              <p>from last month</p>
            </span>{" "}
          </div>
        </div>
      </div>
      <Table className=" w-full border-t border-gray-300">
        <TableBody className="w-full">
          {leaderboardData[timeframe].map((entry) => (
            <TableRow key={entry.rank} className="border-none">
              <TableCell className="border-none">
                <div className="flex flex-row gap-2 items-center">
                  <span>{entry.rank}</span>
                  <Image
                    src={entry.avatarUrl}
                    alt={`${entry.name}'s avatar`}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span>{entry.name}</span>
                </div>
              </TableCell>
              <TableCell className="border-none">{entry.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
