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
import {
  Delete,
  Chevron,
  ChevronNext,
  Instruction,
  Play,
  Pause,
} from "@/svg/Action";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface UserTable {
  image: string;
  name: string;
  subscription: "1 hour" | "2 days" | "3 days" | "5 days" | "7 days" | "9 days";
  amount: number;
  lastactive: string;
  duration: string;
}

interface Filter {
  search: string;
  duration: string | undefined;
}

// Short date + time for Activate/Expired columns
function formatShortDateTime(date: Date) {
  return date.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// Relative time for Last Active column
function formatRelativeTime(date: Date) {
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000; // in seconds

  if (diff < 60) return `${Math.floor(diff)} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 345600) return `${Math.floor(diff / 86400)} days ago`; // < 4 days

  // fallback for older than 4 days
  return date.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
const generateDummyData = (count: number): UserTable[] => {
  const images = [
    "/table 1.jpg",
    "/table 2.jpg",
    "/table 3.jpg",
    "/table 4.jpg",
    "/table 5.jpg",
    "/table 6.jpg",
    "/table 7.jpg",
    "/table 8.jpg",
    "/table 9.jpg",
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
  const subscriptions: Array<
    "1 hour" | "2 days" | "3 days" | "5 days" | "7 days" | "9 days"
  > = ["1 hour", "2 days", "3 days", "5 days", "7 days", "9 days"];
  const amounts = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

  return Array.from({ length: count }, (_, i) => {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - Math.floor(Math.random() * 10));
    const subscription = subscriptions[i % subscriptions.length];
    return {
      image: images[i % images.length],
      name: names[i % names.length],
      subscription,
      amount: amounts[i % amounts.length],
      lastactive: baseDate.toISOString(),
      duration: "",
    };
  });
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
export const PaymentTable = ({ search, duration }: Filter) => {
  const [data, setData] = useState<UserTable[]>(generateDummyData(80));
  const [blocked, setBlocked] = useState<{ [key: number]: boolean }>({});
  const [page, setPage] = useState(1);
  const [deleteUser, setDeleteUser] = useState<UserTable | null>(null);
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

  const handleDelete = () => {
    if (!deleteUser) return;

    // Update the data state by removing the user
    setData((prevData) =>
      prevData.filter((user) => user.name !== deleteUser.name)
    );

    console.log("Deleted user:", deleteUser.name);
    setDeleteUser(null); // Close the delete dialog
  };

  // Filter Data based on search and duration
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Filter by search (user name)
      const isSearchMatch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.amount.toString().includes(search.toLowerCase()) ||
        item.lastactive.toString().includes(search.toLowerCase()) ||
        item.duration.toString().includes(search.toLowerCase());

      // Filter by duration (subscription)
      const isDurationMatch =
        duration === "all" || !duration ? true : item.subscription === duration;

      return isSearchMatch && isDurationMatch;
    });
  }, [data, search, duration]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const paginationNumbers = getPagination(page, totalPages);

  return (
    <div className="flex flex-col gap-5 bg-white p-6 rounded-xl shadow border border-gray-100">
      <h3 className="text-2xl tracking-wider mb-2 ">Booster purchase record</h3>
      <div className="overflow-x-auto max-md:max-w-[85vw]">
        <Table className="border-b border-gray-300 pb-8">
          <TableHeader>
            <TableRow className="">
              <TableHead className="text-xs font-semibold text-gray-500  py-3">
                User
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-500  text-center py-3">
                Subscription
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 text-center py-3">
                Activate Time
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-500 text-center py-3">
                Expired Time
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-500  py-3 text-center">
                Amount
              </TableHead>
              <TableHead className="text-xs font-semibold text-gray-500  py-3 text-center">
                Last Active
              </TableHead>
              <TableHead className="text-xs text-[#969696] px-6">
                <div className="flex items-center gap-2 justify-center text-xs">
                  <span className="text-xs">Action</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="border-none ">
                        <Instruction />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-2">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span>
                            {" "}
                            <Pause />
                          </span>
                          <span className="pb-1 text-sm">
                            Block Subscription
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="pl-1">
                            <Delete />
                          </span>
                          <span className="pb-1 text-sm">
                            Delete Subscription
                          </span>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="tracking-wider">
            {paginatedData.map((item, idx) => {
              const globalIdx = (page - 1) * rowsPerPage + idx;
              const isBlocked = blocked[globalIdx];

              return (
                <TableRow
                  key={globalIdx}
                  className="transition hover:bg-gray-50 border-none"
                >
                  {/* User */}
                  <TableCell
                    className={`py-4 ${isBlocked ? "opacity-30" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full p-2">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="  border border-gray-200 object-cover rounded-full"
                        />
                      </div>
                      <div className="font-medium text-gray-800">
                        {item.name}
                      </div>
                    </div>
                  </TableCell>
                  {/* Status */}
                  <TableCell
                    className={`py-4 text-center ${
                      isBlocked ? "opacity-30" : ""
                    }`}
                  >
                    <div className="flex justify-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold mb-1 bg-[#BDBDBD]`}
                      >
                        {item.subscription}
                      </span>
                    </div>
                  </TableCell>
                  {/* Duration */}
                  {/* Activate Time */}
                  <TableCell
                    className={`py-4 text-center ${
                      isBlocked ? "opacity-30" : ""
                    }`}
                  >
                    <span className="text-sm">
                      {formatShortDateTime(new Date(item.lastactive))}
                    </span>
                  </TableCell>

                  {/* Expired Time */}
                  <TableCell
                    className={`py-4 text-center ${
                      isBlocked ? "opacity-30" : ""
                    }`}
                  >
                    <span className="text-sm">
                      {(() => {
                        const start = new Date(item.lastactive);
                        const end = new Date(start);

                        if (item.subscription === "1 hour") {
                          end.setHours(start.getHours() + 1);
                        } else {
                          const days = parseInt(item.subscription);
                          end.setDate(start.getDate() + days);
                        }

                        return formatShortDateTime(end);
                      })()}
                    </span>
                  </TableCell>
                  {/* Amount */}
                  <TableCell
                    className={`py-4 text-center ${
                      isBlocked ? "opacity-30" : ""
                    }`}
                  >
                    <span className="font-semibold text-gray-700">
                      ${item.amount}
                    </span>
                  </TableCell>
                  {/* Last Active */}
                  <TableCell
                    className={`py-4 text-center ${
                      isBlocked ? "opacity-30" : ""
                    }`}
                  >
                    <span className="text-sm">
                      {formatRelativeTime(new Date(item.lastactive))}
                    </span>
                  </TableCell>
                  {/* Action */}
                  <TableCell className="py-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        className="p-2 hover:bg-gray-100 rounded transition"
                        title={isBlocked ? "Unblock" : "Block"}
                        onClick={() =>
                          isBlocked
                            ? handleUnblock(globalIdx)
                            : handleBlockToggle(globalIdx)
                        }
                      >
                        {isBlocked ? <Play /> : <Pause />}
                      </button>
                      <button
                        className="p-2 hover:bg-gray-100 rounded transition"
                        title="Delete"
                        onClick={() => setDeleteUser(item)}
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
      </div>
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteUser}
        onOpenChange={(open) => !open && setDeleteUser(null)}
      >
        <DialogTrigger asChild>
          <button className="p-2 hover:bg-gray-100 rounded" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Confirmation</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-red-600">
                {deleteUser?.name}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteUser(null)}>
              Cancel
            </Button>
            <Button
              className="p-2 rounded-md orange text-white"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Pagination Controls */}
      <div className="flex md:items-center md:justify-between md:flex-row flex-col mt-4">
        <div className="text-sm text-gray-600">
          Showing {(page - 1) * rowsPerPage + 1} to{" "}
          {Math.min(page * rowsPerPage, filteredData.length)} from{" "}
          {filteredData.length} records
        </div>
        <div className="flex items-center gap-1">
          <button
            className="p-3.5 rounded disabled:opacity-50 border border-[#4C5363] flex justify-center items-center"
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
                    : "border border-black text-gray-700"
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
            className="p-3.5 rounded disabled:opacity-50 border border-[#4C5363] flex justify-center items-center"
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
