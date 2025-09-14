"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

interface BarChartReturnProps {
  range: "weekly" | "monthly" | "yearly";
  setRange: (range: "weekly" | "monthly" | "yearly") => void;
  returningUsers: {
    weekly: { label: string; count: number }[];
    monthly: { label: string; count: number }[];
    yearly: { label: string; count: number }[];
  };
}

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend);





// const xAxisKeyMap: Record<ChartRange, string> = {
//   week: "day",
//   month: "week",
//   year: "month",
// };

export const BarChartReturn = ({ range, setRange, returningUsers }: BarChartReturnProps) => {
  // const [range, setRange] = useState<ChartRange>("year");
  // const chartData = chartDataMap[range];
    const chartData =
    range === "weekly"
      ? returningUsers.weekly
      : range === "monthly"
      ? returningUsers.monthly
      : returningUsers.yearly;
  // const xAxisKey = xAxisKeyMap[range];

  // Prepare data for Chart.js
   const labels = chartData.map((item) => item.label);
  // const labels = chartData.map((item) => {
  //   if (range === "week") {
  //     return (item as WeekData).day;
  //   } else if (range === "month") {
  //     return (item as MonthData).week;
  //   } else {
  //     return (item as YearData).month;
  //   }
  // });
  // const dataValues = chartData.map((item) => item.returningUser);
    const dataValues = chartData.map((item) => item.count);

  const data = {
    labels,
    datasets: [
      {
        label: "Returning Users",
        data: dataValues,
        backgroundColor: "#FF7A00",
        borderRadius: 8,
        barPercentage: 0.6,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "white",
        titleColor: "black",
        bodyColor: "black",
        borderColor: "#ddd",
        borderWidth: 1,
        displayColors: false,
        padding: 12,
        callbacks: {
          title: (tooltipItems) => {
            return tooltipItems[0].label;
          },
          label: (context) => {
            return `Users: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#1C1B1F",
        },
      },
      y: {
        grid: {
          color: "#E5E5E5",
        },
        ticks: {
          color: "#1C1B1F",
        },
      },
    },
  };

  return (
    <div className="h-full">
      <Card className="rounded-lg h-full flex flex-col">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="tracking-wider text-base md:text-lg">
            Returning Users
          </CardTitle>
          <CardTitle className="flex justify-end mt-2">
            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={() => setRange("weekly")}
                className={`p-1 md:p-2 text-xs md:text-sm rounded-full tracking-wider font-light ${
                  range === "weekly"
                    ? "bg-[#F7C56B] text-white"
                    : "border border-[#1C1B1F]"
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setRange("monthly")}
                className={`p-1 md:p-2 text-xs md:text-sm rounded-full tracking-wider font-light ${
                  range === "monthly"
                    ? "bg-[#F7C56B] text-white"
                    : "border border-[#1C1B1F]"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setRange("yearly")}
                className={`p-1 md:p-2 text-xs md:text-sm rounded-full tracking-wider font-light ${
                  range === "yearly"
                    ? "bg-[#F7C56B] text-white"
                    : "border border-[#1C1B1F]"
                }`}
              >
                Yearly
              </button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="rounded-lg p-2 md:p-4 pt-0 flex-1">
          <div className="h-full min-w-full">
            <Bar data={data} options={options} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
