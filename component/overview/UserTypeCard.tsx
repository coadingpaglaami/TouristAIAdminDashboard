

import { ReactNode } from "react";
import { Group, PersonAdd, PersonRemove, Productivity } from "@/svg/OverView";

interface userTypeCard {
  newuser: number;
  totaluser: number;
  premiumuser: number;
  inactiveuser: number;
  period: string;
}

interface CardItem {
  typeuser: string;
  numuser: number;
  icon: ReactNode;
  isIncrease: boolean;
  increasepercentage: number;
}

export const UserTypesCard = ({
  newuser,
  totaluser,
  premiumuser,
  inactiveuser,
  period,
}: userTypeCard) => {
  const data: CardItem[] = [
    {
      typeuser: "New Users",
      numuser: newuser,
      icon: <Group />,
      isIncrease: true,
      increasepercentage: 12,
    },
    {
      typeuser: "Total Users",
      numuser: totaluser,
      icon: <PersonAdd />,
      isIncrease: true,
      increasepercentage: 8,
    },
    {
      typeuser: "Premium Users",
      numuser: premiumuser,
      icon: <Productivity />,
      isIncrease: false,
      increasepercentage: 3,
    },
    {
      typeuser: "Inactive Users",
      numuser: inactiveuser,
      icon: <PersonRemove />,
      isIncrease: false,
      increasepercentage: 5,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-md:w-full">
      {data.map((item, index) => (
        <div key={index} className="border rounded-lg p-4 bg-white">
          <div className="flex flex-col gap-4">
            <span className="text-xl font-semibold tracking-wider text-[#1C1B1F]">
              {item.typeuser}
            </span>
            <div className="flex items-center font-bold text-2xl">
              <span className="mr-2">{item.icon}</span>
              <span>{item.numuser.toLocaleString()}</span>
            </div>
            <span
              className={`text-sm ${
                item.isIncrease ? "text-green-600" : "text-red-600"
              }`}
            >
              <span className="tracking-[0.1em] text-sm">
                {item.isIncrease ? "↑ " : "↓ "}
                {item.increasepercentage}% from last {' '}
                {period === "Weekly" ?'week': period === "Monthly" ? 'month' : 'year'}
              </span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};