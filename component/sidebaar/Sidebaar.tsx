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
  LogOut,
} from "@/svg/Sidebaar";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
interface SidebaarProps {
  isProfile?: boolean;
}

export const Sidebaar = ({ isProfile }: SidebaarProps) => {
  const pathname = usePathname();
  const [profile, openprofile] = useState(isProfile || false);
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
  const adminpage = [
    {
      path: "/admin/profile",
      label: "Profile",
      inactiveIcon: <CardMemberShip />,
      activeIcon: <CardMemberShipWhite />,
    },
    {
      path: "/admin/security",
      label: "Security",
      inactiveIcon: <Dashboard />,
      activeIcon: <DashboardWhite />,
    },
  ];

  return (
    <div className="xl:w-64 lg:w-16  pt-4 sticky top-0 flex flex-col justify-between gap-4 md:h-screen h-full overflow-y-hidden ">
      <div className="flex flex-col gap-2">
        {/* Logo + Text */}
        <Link
          href="/admin/dashboard"
          onClick={() => openprofile(false)}
          className="flex flex-col rounded-lg justify-center items-center gap-2"
        >
          {/* Large Logo - Desktop */}
          <div className="orange p-4 rounded-lg hidden xl:block">
            <Message />
          </div>

          {/* Small Logo - Tablet */}
          <div className="orange p-2 rounded-lg hidden md:block xl:hidden">
            <MessageSmall />
          </div>

          {/* Brand Text - Desktop only */}
          <h4 className="text-2xl font-bold tracking-[0.3em] text-[#854C3A] hidden xl:block">
            TRIPMATE
          </h4>
        </Link>

        {/* Menu Items */}
        {profile ? (
          <div className="flex flex-col gap-2 mt-12">
            {adminpage.map(({ path, label, inactiveIcon, activeIcon }) => {
              const isActive =
                pathname === path || pathname.startsWith(`${path}/`);
              return (
                <Link
                  key={path}
                  href={path}
                  className={`p-2 flex items-center gap-2 rounded text-[16px] font-semibold tracking-[0.1em] mx-2 truncate ${
                    isActive ? "orange text-white" : "text-[#854C3A]"
                  }`}
                >
                  {isActive ? activeIcon : inactiveIcon}
                  <span className="hidden xl:inline">{label}</span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-2 mt-12">
            {menus.map(({ path, label, inactiveIcon, activeIcon }) => {
              const isActive =
                pathname === path || pathname.startsWith(`${path}/`);
              return (
                <Link
                  key={path}
                  href={path}
                  className={`p-2 flex items-center gap-2 rounded text-[16px] font-semibold tracking-[0.1em] mx-2 truncate ${
                    isActive ? "orange text-white" : "text-[#854C3A]"
                  }`}
                >
                  {isActive ? activeIcon : inactiveIcon}
                  <span className="hidden xl:inline">{label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Profile Section */}
      {!profile ? (
        <Link
          href="/admin/profile"
          onClick={() => openprofile(!profile)}
          className="flex gap-2 mx-2 items-center justify-between py-2"
        >
          <Image
            src="/user.png"
            alt="user"
            height={100}
            width={100}
            className="rounded-full h-14 w-14"
          />

          {/* Profile details - Desktop only */}
          <div className=" flex-col gap-1 text-[#854C3A] hidden xl:flex">
            <span className="text-lg font-medium">Ostain Alex</span>
            <span className="font-thin">TRIPMATE</span>
          </div>

          <div className="hidden xl:block">
            <Settings />
          </div>
        </Link>
      ):(
        <Link href={'/'} className="flex items-center justify-center mb-4 gap-2 font-semibold text-lg border-t border-gray-300 pt-2">
        <LogOut/> <span className="text-[#854C3A] tracking-wider">Log Out</span>
        </Link>
      )}
    </div>
  );
};
