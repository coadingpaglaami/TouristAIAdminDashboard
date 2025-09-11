import { ReactNode } from "react";
import { Group, PersonAdd, PersonRemove, Productivity } from "@/svg/OverView";
import { Skeleton } from "@/components/ui/skeleton";

interface Overview {
  new_users?: number;
  total_users?: number;
  premium_users?: number;
  inactive_users?: number;
  new_users_change?: string;
  total_users_change?: string;
  premium_users_change?: string;
  inactive_users_change?: string;
  is_new_users_increase?: boolean;
  is_total_users_increase?: boolean;
  is_premium_users_increase?: boolean;
  is_inactive_users_increase?: boolean;
}

interface UserTypesCardProps {
  overview: Overview;
  period: string;
  loading: boolean;
}

interface CardItem {
  typeuser: string;
  numuser: number;
  icon: ReactNode;
  isIncrease: boolean;
  increasepercentage: string;
}

export const UserTypesCard = ({
  overview,
  period,
  loading,
}: UserTypesCardProps) => {
  const {
    new_users: newuser,
    total_users: totaluser,
    premium_users: premiumuser,
    inactive_users: inactiveuser,
    new_users_change: newuserChange,
    total_users_change: totaluserChange,
    premium_users_change: premiumuserChange,
    inactive_users_change: inactiveuserChange,
    is_new_users_increase: isNewUserIncrease,
    is_total_users_increase: isTotalUserIncrease,
    is_premium_users_increase: isPremiumUserIncrease,
    is_inactive_users_increase: isInactiveUserIncrease,
  } = overview || {};
  const data: CardItem[] = [
    {
      typeuser: "New Users",
      numuser: newuser || 0,
      icon: <Group />,
      isIncrease: isNewUserIncrease || false,
      increasepercentage: newuserChange || "",
    },
    {
      typeuser: "Total Users",
      numuser: totaluser || 0,
      icon: <PersonAdd />,
      isIncrease: isTotalUserIncrease || false,
      increasepercentage: totaluserChange || "",
    },
    {
      typeuser: "Premium Users",
      numuser: premiumuser || 0,
      icon: <Productivity />,
      isIncrease: isPremiumUserIncrease || false,
      increasepercentage: premiumuserChange || "",
    },
    {
      typeuser: "Inactive Users",
      numuser: inactiveuser || 0,
      icon: <PersonRemove />,
      isIncrease: isInactiveUserIncrease || false,
      increasepercentage: inactiveuserChange || "",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-md:w-full">
      {data.map((item, index) => (
        <div key={index} className="border rounded-lg p-4 bg-white">
          <div className="flex flex-col gap-4">
            <span className="text-xl font-semibold tracking-wider text-[#1C1B1F] ">
              {loading ? <Skeleton className="w-32 h-8" /> : item.typeuser}
            </span>
            <div className="flex items-center font-bold text-2xl">
              <span className="mr-2">
                {loading ? <Skeleton className="w-8 h-8" /> : item.icon}
              </span>
              <span>
                {loading ? (
                  <Skeleton className="w- h-8" />
                ) : (
                  item.numuser.toLocaleString()
                )}
              </span>
            </div>
            <span
              className={`text-sm ${
                item.isIncrease ? "text-green-600" : "text-red-600"
              }`}
            >
              <span className="tracking-[0.1em] text-sm truncate">
                {loading ? (
                  <Skeleton className="w-full h-4" />
                ) : (
                  ` ${item.increasepercentage} from last ${
                    period === "Weekly"
                      ? "week"
                      : period === "Monthly"
                      ? "month"
                      : "year"
                  }`
                )}
              </span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
