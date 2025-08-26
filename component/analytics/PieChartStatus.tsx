"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const description = (
  <div className="flex flex-col gap-2">
    <p className="tracking-wider text-[#1C1B1F]">Total User 12,478</p>
    <div className="flex items-center gap-4 text-black tracking-wider">
      <div className="flex items-center gap-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10" cy="10" r="10" fill="#D9D9D9" />
        </svg>

        <span>Free User {"(30%)"}</span>
      </div>
      <div className="flex items-center gap-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10" cy="10" r="10" fill="#FF7A00" />
        </svg>

        <span>Booster User {"(70%)"}</span>
      </div>
    </div>
  </div>
);

const chartData = [
  { browser: "Premium", visitors: 275, fill: "#FF7A00" },
  { browser: "Free", visitors: 200, fill: "#D9D9D9" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export const PieChartStatus = () => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-col py-1">
        <CardTitle className="tracking-wider text-lg font-medium text-[#1C1B1F]">
          User Status Distribution
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-56"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

// "use client";
// import React from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   Tooltip,
//   Legend,
// } from "recharts";

// const data = [
//   { name: "Booster user", value: 70 },
//   { name: "Free user", value: 30 },
// ];

// const COLORS = ["#FF8A00", "#D3D3D3"]; // orange for Booster user, gray for Free user

// export const PieChartStatus = () => {
//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <PieChart>
//              <Legend />
//         <Pie
//           data={data}
//           dataKey="value"
//           nameKey="name"
//           cx="50%"
//           cy="50%"
//           outerRadius={150}
//           innerRadius={120}
//           startAngle={90}
//           endAngle={-270}
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index]} />
//           ))}
//         </Pie>
//         <Tooltip />

//       </PieChart>
//     </ResponsiveContainer>
//   );
// };
