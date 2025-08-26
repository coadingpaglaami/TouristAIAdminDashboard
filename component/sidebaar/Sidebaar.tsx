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
import { useState } from "react";

export const Sidebaar = () => {
  const pathname = usePathname();
  const [profile, openprofile] = useState(false);
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
    // <div className="lg:w-64 md:w-14  pt-4 sticky top-0 flex flex-col justify-between gap-4  md:h-screen h-full overflow-y-hidden">
    //   <div className="flex flex-col gap-2 ">
    //     <div className="flex flex-col rounded-lg justify-center items-center gap-2">
    //       <div className="orange p-4 rounded-lg max-lg:hidden">
    //         <Message />
    //       </div>
    //       <div className="orange p-2 rounded-lg lg:hidden md:block max-md:hidden">
    //         <MessageSmall />
    //       </div>
    //       <h4 className="text-2xl font-bold tracking-[0.3em] text-[#854C3A] max-lg:hidden">
    //         TRIPMATE
    //       </h4>
    //     </div>
    //     {profile && (
    //       <div className="flex flex-col gap-4 mt-12">
    //         {adminpage.map(({ path, label, inactiveIcon, activeIcon }) => {
    //           const isActive =
    //             pathname === path || pathname.startsWith(`${path}/`);
    //           return (
    //             <Link
    //               key={path}
    //               href={path}
    //               className={`px-2 py-3 flex items-center gap-2  rounded text-[16px] font-semibold tracking-[0.1em] mx-2 truncate ${
    //                 isActive ? "orange text-white  " : "text-[#854C3A]"
    //               }`}
    //             >
    //               {isActive ? activeIcon : inactiveIcon}
    //               <span className="max-lg:hidden">{label}</span>
    //             </Link>
    //           );
    //         })}
    //       </div>
    //     )}

    //     {!profile && (
    //       <div className="flex flex-col gap-4 mt-12">
    //         {menus.map(({ path, label, inactiveIcon, activeIcon }) => {
    //           const isActive =
    //             pathname === path || pathname.startsWith(`${path}/`);
    //           return (
    //             <Link
    //               key={path}
    //               href={path}
    //               className={`px-2 py-3 flex items-center gap-2  rounded text-[16px] font-semibold tracking-[0.1em] mx-2 truncate ${
    //                 isActive ? "orange text-white  " : "text-[#854C3A]"
    //               }`}
    //             >
    //               {isActive ? activeIcon : inactiveIcon}
    //               <span className="max-lg:hidden">{label}</span>
    //             </Link>
    //           );
    //         })}
    //       </div>
    //     )}
    //   </div>

    //   {!profile && (
    //     <Link
    //       href="/admin/profile"
    //       onClick={() => openprofile(!profile)}
    //       className="flex gap-2 mx-2 items-center justify-between"
    //     >
    //       <Image
    //         src="/user.png"
    //         alt="user"
    //         height={100}
    //         width={100}
    //         className="rounded-full h-14 w-14 "
    //       />

    //       <div className="flex flex-col gap-1 text-[#854C3A] max-lg:hidden">
    //         <span className="text-lg font-medium">Ostain Alex</span>
    //         <span className="font-thin">TRIPMATE</span>
    //       </div>
    //       <div className="max-lg:hidden">
    //         <Settings />
    //       </div>
    //     </Link>
    //   )}
    // </div>
    <div className="lg:w-64 md:w-20 w-16 pt-4 sticky top-0 flex flex-col justify-between gap-4 md:h-screen h-full overflow-y-hidden">
      <div className="flex flex-col gap-2">
        {/* Logo + Text */}
        <Link
          href="/admin/dashboard" onClick={() => openprofile(false)}
          className="flex flex-col rounded-lg justify-center items-center gap-2"
        >
          {/* Large Logo - Desktop */}
          <div className="orange p-4 rounded-lg hidden lg:block">
            <Message />
          </div>

          {/* Small Logo - Tablet */}
          <div className="orange p-2 rounded-lg hidden md:block lg:hidden">
            <MessageSmall />
          </div>

          {/* Brand Text - Desktop only */}
          <h4 className="text-2xl font-bold tracking-[0.3em] text-[#854C3A] hidden lg:block">
            TRIPMATE
          </h4>
        </Link>

        {/* Menu Items */}
        {profile ? (
          <div className="flex flex-col gap-4 mt-12">
            {adminpage.map(({ path, label, inactiveIcon, activeIcon }) => {
              const isActive =
                pathname === path || pathname.startsWith(`${path}/`);
              return (
                <Link
                  key={path}
                  href={path}
                  className={`px-2 py-3 flex items-center gap-2 rounded text-[16px] font-semibold tracking-[0.1em] mx-2 truncate ${
                    isActive ? "orange text-white" : "text-[#854C3A]"
                  }`}
                >
                  {isActive ? activeIcon : inactiveIcon}
                  <span className="hidden lg:inline">{label}</span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-12">
            {menus.map(({ path, label, inactiveIcon, activeIcon }) => {
              const isActive =
                pathname === path || pathname.startsWith(`${path}/`);
              return (
                <Link
                  key={path}
                  href={path}
                  className={`px-2 py-3 flex items-center gap-2 rounded text-[16px] font-semibold tracking-[0.1em] mx-2 truncate ${
                    isActive ? "orange text-white" : "text-[#854C3A]"
                  }`}
                >
                  {isActive ? activeIcon : inactiveIcon}
                  <span className="hidden lg:inline">{label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Profile Section */}
      {!profile && (
        <Link
          href="/admin/profile"
          onClick={() => openprofile(!profile)}
          className="flex gap-2 mx-2 items-center justify-between"
        >
          <Image
            src="/user.png"
            alt="user"
            height={100}
            width={100}
            className="rounded-full h-14 w-14"
          />

          {/* Profile details - Desktop only */}
          <div className=" flex-col gap-1 text-[#854C3A] hidden lg:flex">
            <span className="text-lg font-medium">Ostain Alex</span>
            <span className="font-thin">TRIPMATE</span>
          </div>

          <div className="hidden lg:block">
            <Settings />
          </div>
        </Link>
      )}
    </div>
  );
};
