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

function formatTime(date: Date) {
  let hours = 0;
  hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  const minStr = minutes.toString().padStart(2, "0");
  return `${hour12}.${minStr}${ampm}`;
}

function formatDate(date: Date) {
  return `${date.getDate()} ${date.toLocaleString("default", {
    month: "long",
  })}, ${date.getFullYear()}`;
}

function formatDateRange(start: Date, end: Date) {
  const sameMonth = start.getMonth() === end.getMonth();
  let range = `${start.getDate()}${
    sameMonth ? "" : " " + start.toLocaleString("default", { month: "long" })
  }`;
  range += `-${end.getDate()} ${end.toLocaleString("default", {
    month: "long",
  })}`;
  range += `, ${end.getFullYear()}`;
  return range;
}

function getDurationJSX(
  subscription: UserTable["subscription"],
  baseDate: Date
) {
  if (subscription === "1 hour") {
    const start = new Date(baseDate);
    const end = new Date(baseDate);
    end.setHours(start.getHours() + 1);
    return (
      <div className="flex flex-col gap-0.5">
        <span className="font-medium text-sm">
          {formatTime(start)}-{formatTime(end)}
        </span>
        <span className="text-xs text-gray-400">{formatDate(start)}</span>
      </div>
    );
  } else {
    const days = parseInt(subscription);
    const start = new Date(baseDate);
    const end = new Date(baseDate);
    end.setDate(start.getDate() + days);
    return (
      <div className="flex flex-col gap-0.5">
        <span className="font-medium text-sm">
          {formatTime(start)}-{formatTime(end)}
        </span>
        <span className="text-xs text-gray-400">
          {formatDateRange(start, end)}
        </span>
      </div>
    );
  }
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
              <TableHead className="text-xs font-semibold text-gray-500  text-center py-3">
                Duration
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
                      <div className="w-8 h-8">
                        <Image
                          src={item.image}
                          alt={item.name}
                          height={36}
                          width={36}
                          className=" rounded-full border border-gray-200"
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
                  <TableCell
                    className={`py-4 text-center ${
                      isBlocked ? "opacity-30" : ""
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      {getDurationJSX(
                        item.subscription,
                        new Date(item.lastactive)
                      )}
                    </div>
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
                      {formatDate(new Date(item.lastactive))}
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
