"use client";
import {
  Dashboard,
  Message,
  DashboardWhite,
  MetaBolism,
  MetaBolismWhite,
  MangeAccounts,
  MangeAccountsWhite,
  PieChart,
  PieChartWhite,
  Paid,
  PaidWhite,
  CardMemberShip,
  CardMemberShipWhite,
  MessageSmall,
  Settings,
} from "@/svg/Sidebaar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebaar = () => {
  const pathname = usePathname();
  const menus = [
    {
      path: "/admin/dashboard",
      label: "Overview",
      inactiveIcon: <Dashboard />,
      activeIcon: <DashboardWhite />,
    },
    {
      path: "/admin/useractivity",
      label: "User Activity",
      inactiveIcon: <MetaBolism />,
      activeIcon: <MetaBolismWhite />,
    },
    {
      path: "/admin/manage-user",
      label: "Manage User",
      inactiveIcon: <MangeAccounts />,
      activeIcon: <MangeAccountsWhite />,
    },
    {
      path: "/admin/analytics",
      label: "Analytics",
      inactiveIcon: <PieChart />,
      activeIcon: <PieChartWhite />,
    },
    {
      path: "/admin/payment",
      label: "Payment Record",
      inactiveIcon: <Paid />,
      activeIcon: <PaidWhite />,
    },
    {
      path: "/admin/subscription",
      label: "Subscription",
      inactiveIcon: <CardMemberShip />,
      activeIcon: <CardMemberShipWhite />,
    },
  ];

  return (
    <div className="lg:w-64 md:w-14  pt-4 sticky top-0 flex flex-col justify-between gap-4 h-screen overflow-y-hidden">
      <div className="flex flex-col gap-2 ">
        <div className="flex flex-col rounded-lg justify-center items-center gap-2">
          <div className="orange p-4 rounded-lg max-lg:hidden">
            <Message />
          </div>
          <div className="orange p-3 rounded-lg lg:hidden">
            <MessageSmall />
          </div>
          <h4 className="text-2xl font-bold tracking-[0.3em] text-[#854C3A] max-lg:hidden">
            TRIPMATE
          </h4>
        </div>
        <div className="flex flex-col gap-4 mt-12">
          {menus.map(({ path, label, inactiveIcon, activeIcon }) => {
            const isActive =
              pathname === path || pathname.startsWith(`${path}/`);
            return (
              <Link
                key={path}
                href={path}
                className={`px-2 py-3 flex items-center gap-2  rounded text-[16px] font-semibold tracking-[0.1em] mx-2 truncate ${
                  isActive ? "orange text-white  " : "text-[#854C3A]"
                }`}
              >
                {isActive ? activeIcon : inactiveIcon}
                <span className="max-lg:hidden">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex gap-2 mx-2 items-center justify-between">
        <Image
          src="/user.png"
          alt="user"
          height={100}
          width={100}
          className="rounded-full h-14 w-14 "
        />

        <div className="flex flex-col gap-1 text-[#854C3A] max-lg:hidden">
          <span className="text-lg font-medium">Ostain Alex</span>
          <span className="font-thin">TRIPMATE</span>
        </div>
        <div className="max-lg:hidden">
          <Settings />
        </div>
      </div>
    </div>
  );
};
