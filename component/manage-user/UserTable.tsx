"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo, useState } from "react";
import Image from "next/image";
import { Delete, Block, CheckCircle, Chevron, ChevronNext } from "@/svg/Action";

interface UserTable {
  image: string;
  name: string;
  status: "Inactive" | "Active";
  subscription: "Free" | "Premium" | "Expired";
  email: string;
  lastactive: string;
}

const generateDummyData = (count: number): UserTable[] => {
  const images = [
    "/table 1.png",
    "/table 2.png",
    "/table 3.png",
    "/table 4.png",
    "/table 5.png",
    "/table 6.png",
    "/table 7.png",
  ];
  const names = [
    "Sujon",
    "Shihab",
    "Farhan",
    "Shaon",
    "Chailau",
    "Atik",
    "Mijan",
    "Hossain",
    "Jubayer",
    "Alamin",
    "Ankan",
    "Ayon",
  ];
  const emails = [
    "sujon@email.com",
    "shihab@email.com",
    "farhan@email.com",
    "shaon@email.com",
    "chailau@email.com",
    "atik@email.com",
    "mijan@email.com",
    "hossain@email.com",
    "sujon123@email.com",
    "shihab.dev@email.com",
    "farhan.ai@email.com",
    "shaon.tourist@email.com",
    "chailau2024@email.com",
    "atik.tour@email.com",
    "mijan.hasan@email.com",
    "hossain.tai@email.com",
    "sujon.tester@email.com",
    "shihab.user@email.com",
    "farhan.tourist@email.com",
    "shaon.active@email.com",
  ];

  const subscription: Array<"Free" | "Premium" | "Expired"> = [
    "Free",
    "Premium",
    "Expired",
    "Free",
    "Premium",
    "Expired",
    "Free",
    "Premium",
    "Expired",
    "Free",
    "Premium",
    "Expired",
    "Free",
    "Premium",
    "Expired",
    "Free",
    "Premium",
    "Expired",
    "Free",
    "Premium",
  ];
  const statuses: Array<"Inactive" | "Active"> = [
    "Active",
    "Inactive",
    "Active",
    "Inactive",
    "Active",
    "Inactive",
    "Active",
    "Inactive",
    "Active",
    "Inactive",
    "Active",
    "Inactive",
    "Active",
    "Inactive",
    "Active",
    "Inactive",
    "Active",
    "Inactive",
    "Active",
    "Inactive",
  ];

  const getRandomTimeAgo = () => {
    const now = new Date();
    const random = Math.random();

    if (random < 0.33) {
      const minutes = Math.floor(Math.random() * 120);
      if (minutes === 0) return "just now";
      if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
      const hours = Math.floor(minutes / 60);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (random < 0.66) {
      const hour = Math.floor(Math.random() * 24);
      const minute = Math.floor(Math.random() * 60);
      const ampm = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 === 0 ? 12 : hour % 12;
      const minStr = minute.toString().padStart(2, "0");
      return `Today, ${hour12}.${minStr} ${ampm}`;
    } else {
      const hour = Math.floor(Math.random() * 24);
      const minute = Math.floor(Math.random() * 60);
      const ampm = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 === 0 ? 12 : hour % 12;
      const minStr = minute.toString().padStart(2, "0");
      return `Yesterday, ${hour12}.${minStr} ${ampm}`;
    }
  };

  return Array.from({ length: count }, (_, i) => ({
    image: images[i % images.length],
    name: names[i % names.length],
    status: statuses[i % statuses.length],
    subscription: subscription[i % subscription.length],
    email: emails[i % emails.length],
    lastactive: getRandomTimeAgo(),
  }));
};
function getPagination(current: number, total: number) {
  const delta = 2;
  const range = [];
  const rangeWithDots: (number | string)[] = [];
  let l: number = 0;

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }
  return rangeWithDots;
}
export const UserTable = () => {
  const data = useMemo(() => generateDummyData(80), []);
  const [blocked, setBlocked] = useState<{ [key: number]: boolean }>({});
  const [page, setPage] = useState(1);
  const rowsPerPage = 7;

  const handleBlockToggle = (idx: number) => {
    setBlocked((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleUnblock = (idx: number) => {
    setBlocked((prev) => ({
      ...prev,
      [idx]: false,
    }));
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const paginationNumbers = getPagination(page, totalPages);

  return (
    <div className="flex flex-col gap-3 bg-white p-4 rounded-lg">
      <h3 className="text-2xl tracking-wider">Manage Users</h3>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs text-[#969696]">User</TableHead>
            <TableHead className="text-xs text-[#969696] text-center">
              Status
            </TableHead>
            <TableHead className="text-xs text-[#969696] text-center">
              Subscription
            </TableHead>
            <TableHead className="text-xs text-[#969696]">Email</TableHead>
            <TableHead className="text-xs text-[#969696]">
              Last Active
            </TableHead>
            <TableHead className="text-xs text-[#969696]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="tracking-wider">
          {paginatedData.map((item, idx) => {
            const globalIdx = (page - 1) * rowsPerPage + idx;
            const isBlocked = blocked[globalIdx];
            return (
              <TableRow
                key={globalIdx}
                className="border-none transition-opacity"
              >
                {/* User */}
                <TableCell className={isBlocked ? "opacity-50" : "opacity-100"}>
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.image}
                      alt={item.name}
                      height={32}
                      width={32}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="font-medium">{item.name}</div>
                  </div>
                </TableCell>
                {/* Status */}
                <TableCell
                  className={
                    isBlocked ? "opacity-50" : "opacity-100 " + "align-middle"
                  }
                >
                  <div className="flex justify-center items-center">
                    <div
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full  max-w-20 w-fit ${
                        item.status === "Active"
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {item.status}
                    </div>
                  </div>
                </TableCell>
                {/* Subscription */}
                <TableCell className={isBlocked ? "opacity-50" : "opacity-100"}>
            <div className="flex justify-center items-center">
                     <div
                       className={`px-3 py-1 rounded-full text-xs font-semibold ${
                         item.subscription === "Expired"
                          ? "bg-[#FF7A00] text-white"
                            : item.subscription === "Premium"
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {item.subscription}
                    </div>
                  </div>
                </TableCell>
                {/* Email */}
                <TableCell className={isBlocked ? "opacity-50" : "opacity-100"}>
                  {item.email}
                </TableCell>
                {/* Last Active */}
                <TableCell className={isBlocked ? "opacity-50" : "opacity-100"}>
                  {item.lastactive}
                </TableCell>
                {/* Action */}
                <TableCell>
                  <div className="flex gap-2">
                    <button
                      className="p-2 hover:bg-gray-100 rounded opacity-100"
                      title={isBlocked ? "Unblock" : "Block"}
                      onClick={() =>
                        isBlocked
                          ? handleUnblock(globalIdx)
                          : handleBlockToggle(globalIdx)
                      }
                    >
                      {isBlocked ? <CheckCircle /> : <Block />}
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 rounded"
                      title="Delete"
                    >
                      <Delete />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">
          Showing {(page - 1) * rowsPerPage + 1} to{" "}
          {Math.min(page * rowsPerPage, data.length)} from {data.length} records
        </div>
        <div className="flex items-center gap-1">
          <button
            className="p-3 rounded disabled:opacity-50 border border-[#4C5363] flex justify-center items-center"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <Chevron />
          </button>
          {paginationNumbers.map((num, idx) =>
            typeof num === "number" ? (
              <button
                key={idx}
                className={`p-2 rounded px-3 ${
                  num === page
                    ? " text-green-600 border-2 border-[#F7C56B]"
                    : "bg-gray-200 text-gray-700"
                }`}
                style={{
                  backgroundColor:
                    num === page ? "rgba(247, 197, 107, 0.3)" : "",
                }}
                onClick={() => setPage(num)}
              >
                {num}
              </button>
            ) : (
              <span key={idx} className="px-2">
                ...
              </span>
            )
          )}
          <button
            className="p-3 rounded disabled:opacity-50 border border-[#4C5363] flex justify-center items-center"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            <ChevronNext />
          </button>
        </div>
      </div>
    </div>
  );
};
