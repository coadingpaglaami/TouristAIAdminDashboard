// "use client";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   XAxis,
//   ResponsiveContainer,
//   YAxis,
// } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
// } from "@/components/ui/chart";
// import { Calendar } from "@/svg/Chart";

// const chartData = [
//   { month: "January", revenue: 186 },
//   { month: "February", revenue: 305 },
//   { month: "March", revenue: 237 },
//   { month: "April", revenue: 73 },
//   { month: "May", revenue: 209 },
//   { month: "June", revenue: 214 },
//   { month: "July", revenue: 180 },
//   { month: "August", revenue: 220 },
//   { month: "September", revenue: 195 },
//   { month: "October", revenue: 250 },
//   { month: "November", revenue: 270 },
//   { month: "December", revenue: 300 },
// ];

// const chartConfig = {
//   revenue: {
//     label: "Revenue",
//     color: "var(--chart-1)",
//   },
// } satisfies ChartConfig;

// const CustomChartTooltipContent = ({
//   active,
//   payload,
//   label,
// }: {
//   active?: boolean;
//   payload?: Array<{ value: number }>;
//   label?: string;
// }) => {
//   if (!active || !payload || !payload.length) return null;
//   const revenue = payload[0].value;
//   return (
//     <div className="rounded-md bg-background p-3 shadow-md border text-sm min-w-[120px]">
//       <div className="font-semibold mb-1">{label}</div>
//       <div className="flex items-center gap-2">
//         <span className="text-muted-foreground">Revenue:</span>
//         <span className="font-bold">{revenue}k</span>
//       </div>
//     </div>
//   );
// };

// export const BarChartRevenue = () => {
//   // Custom tick formatter: do not add 'k' for 0
//   const yAxisTickFormatter = (value: number) =>
//     value === 0 ? "0" : `${value}k`;
//   const description = () => (
//     <div className="flex items-center gap-2 tracking-wider">
//       <span className="font-semibold text-black">
//         Total {chartData.reduce((acc, item) => acc + item.revenue, 0)}k
//       </span>
//       <button className="text-muted-foreground">
//         {" "}
//         <Calendar />{" "}
//       </button>
//     </div>
//   );
//   return (
//     <Card className="flex justify-between">
//       <CardHeader className=" pb-2">
//         <div className="flex flex-row items-center justify-between">
//           <CardTitle className="tracking-wider">Revenue growth</CardTitle>
//           <CardDescription>{description()}</CardDescription>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig} className="max-h-60 min-w-full">
//           <ResponsiveContainer>
//             <BarChart data={chartData} className="max-h-36 min-w-full">
//               <CartesianGrid vertical={false} strokeDasharray="3 3" />
//               <XAxis
//                 dataKey="month"
//                 tickLine={false}
//                 tickMargin={10}
//                 axisLine={false}
//                 tickFormatter={(value: string) => value.slice(0, 3)}
//               />
//               <YAxis
//                 dataKey="revenue"
//                 tickLine={false}
//                 axisLine={false}
//                 tickMargin={10}
//                 width={50}
//                 tickFormatter={yAxisTickFormatter}
//               />
//               <ChartTooltip
//                 cursor={{ fill: "var(--muted)" }}
//                 content={<CustomChartTooltipContent />}
//               />
//               <Bar
//                 dataKey="revenue"
//                 fill="#28C86B"
//                 radius={[8, 8, 0, 0]}
//                 name="Revenue"
//                 maxBarSize={40}
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// };
"use client";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
  YAxis,
} from "recharts";
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
} from "@/components/ui/chart";
import { Calendar as CalendarIcon } from "@/svg/Chart";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";

const chartData = [
  { month: "January", revenue: 186 },
  { month: "February", revenue: 305 },
  { month: "March", revenue: 237 },
  { month: "April", revenue: 73 },
  { month: "May", revenue: 209 },
  { month: "June", revenue: 214 },
  { month: "July", revenue: 180 },
  { month: "August", revenue: 220 },
  { month: "September", revenue: 195 },
  { month: "October", revenue: 250 },
  { month: "November", revenue: 270 },
  { month: "December", revenue: 300 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const CustomChartTooltipContent = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) => {
  if (!active || !payload || !payload.length) return null;
  const revenue = payload[0].value;
  return (
    <div className="rounded-md bg-background p-3 shadow-md border text-sm min-w-[120px]">
      <div className="font-semibold mb-1">{label}</div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Revenue:</span>
        <span className="font-bold">{revenue}k</span>
      </div>
    </div>
  );
};

export const BarChartRevenue = () => {
  const today = new Date();
  const [date, setDate] = useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 25),
  });

  // Format total revenue text
  const description = () => (
    <div className="flex items-center gap-2 tracking-wider">
      <span className="font-semibold text-black">
        Total {chartData.reduce((acc, item) => acc + item.revenue, 0)}k
      </span>

      {/* Calendar Button with Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <button className="text-muted-foreground p-2 hover:bg-accent rounded-md">
            <CalendarIcon />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" align="end">
          <Calendar
            mode="range"
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            pagedNavigation
            showOutsideDays={false}
            className="rounded-md border"
          />
          <div className="text-xs text-muted-foreground mt-2 text-center">
            {date?.from && date?.to
              ? `${format(date.from, "LLL dd, y")} - ${format(
                  date.to,
                  "LLL dd, y"
                )}`
              : "Select a date range"}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );

  // Custom tick formatter: do not add 'k' for 0
  const yAxisTickFormatter = (value: number) =>
    value === 0 ? "0" : `${value}k`;

  return (
    <Card className=" h-full flex justify-between py-6">
      <CardHeader className="pb-2">
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="tracking-wider">Revenue growth</CardTitle>
          <CardDescription>{description()}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[24vh] min-w-full">
          <ResponsiveContainer>
            <BarChart data={chartData} className="max-h-[18vh] min-w-full">
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value: string) => value.slice(0, 3)}
              />
              <YAxis
                dataKey="revenue"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                width={50}
                tickFormatter={yAxisTickFormatter}
              />
              <ChartTooltip
                cursor={{ fill: "var(--muted)" }}
                content={<CustomChartTooltipContent />}
              />
              <Bar
                dataKey="revenue"
                fill="#28C86B"
                radius={[8, 8, 0, 0]}
                name="Revenue"
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
