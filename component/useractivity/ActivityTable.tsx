"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactNode, useMemo, useState } from "react";
import Image from "next/image"; // Example action icon
import { Chevron, ChevronNext, RemoveIcon } from "@/svg/Action";
import { Visible } from "@/svg/OverView";

interface ActivityTable {
  image: string;
  name: string;
  activity: "Upload" | "Clicked";
  Details: ReactNode;
  time: string;
  status: "Free" | "Premium";
  photo: string;
}

const generateDummyData = (count: number): ActivityTable[] => {
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
  ];
  const details = [
    <span key="detail-0" className="text-sm">
      Uploaded photo of {'"'}
      <span className="text-[#FF7A00] font-semibold">Sunset Beach</span>
      {'"'}
    </span>,
    <span key="detail-1" className="text-sm">
      Clicked on {'"'}
      <span className="text-[#FF7A00] font-semibold">recommended place</span>
      {'"'}
    </span>,
    <span key="detail-2" className="text-sm">
      Uploaded {'"'}
      <span className="text-[#FF7A00] font-semibold">travel documents</span>
      {'"'}
    </span>,
    <span key="detail-3" className="text-sm">
      Clicked on {'"'}
      <span className="text-[#FF7A00] font-semibold">premium feature</span>
      {'"'}
    </span>,
    <span key="detail-4" className="text-sm">
      Uploaded {'"'}
      <span className="text-[#FF7A00] font-semibold">profile picture</span>
      {'"'}
    </span>,
    <span key="detail-5" className="text-sm">
      Clicked on {'"'}
      <span className="text-[#FF7A00] font-semibold">itinerary details</span>
      {'"'}
    </span>,
    <span key="detail-6" className="text-sm">
      Uploaded {'"'}
      <span className="text-[#FF7A00] font-semibold">review for a place</span>
      {'"'}
    </span>,
    <span key="detail-7" className="text-sm">
      Clicked on {'"'}
      <span className="text-[#FF7A00] font-semibold">user dashboard</span>
      {'"'}
    </span>,
  ];
  const photos = [
    "/photo 1.png",
    "/photo 2.png",
    "/photo 3.png",
    "/photo 4.png",
    "/photo 5.png",
    "/photo 6.png",
    "/photo 7.png",
  ];
  const activities: Array<"Upload" | "Clicked"> = [
    "Upload",
    "Clicked",
    "Upload",
    "Clicked",
    "Upload",
    "Clicked",
    "Upload",
    "Clicked",
  ];
  const statuses: Array<"Free" | "Premium"> = [
    "Free",
    "Premium",
    "Free",
    "Premium",
    "Free",
    "Premium",
    "Free",
  ];

  // Helper to generate a random "time ago" string
  const getRandomTimeAgo = () => {
    const minutes = Math.floor(Math.random() * 120); // up to 2 hours
    if (minutes === 0) return "just now";
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  };

  return Array.from({ length: count }, (_, i) => ({
    image: images[i % images.length],
    name: names[i % names.length],
    activity: activities[i % activities.length],
    Details: details[i % details.length],
    time: getRandomTimeAgo(),
    status: statuses[i % statuses.length],
    photo: photos[i % photos.length],
  }));
};

// Helper for pagination numbers
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

export const ActivityTable = () => {
  const data = useMemo(() => generateDummyData(80), []);
  const [page, setPage] = useState(1);
  const perPage = 7;
  const [blocked, setBlocked] = useState<{ [key: number]: boolean }>({});
  const totalPages = Math.ceil(data.length / perPage);

  const paginatedData = useMemo(
    () => data.slice((page - 1) * perPage, page * perPage),
    [data, page]
  );
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
  const paginationNumbers = getPagination(page, totalPages);

  return (
    <div className="flex flex-col gap-3 bg-white p-4 rounded-lg overflow-hidden">
      <h3 className="text-2xl tracking-wider">User Activity</h3>
      <div className=" max-w-screen overflow-x-auto">
      <Table >
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs text-[#969696]">User</TableHead>
            <TableHead className="text-xs text-[#969696]">
              Activity Type
            </TableHead>
            <TableHead className="text-xs text-[#969696]">Details</TableHead>
            <TableHead className="text-xs text-[#969696]">Time</TableHead>
            <TableHead className="text-xs text-[#969696] text-center">
              Status
            </TableHead>
            <TableHead className="text-xs text-[#969696]">Photo</TableHead>
            <TableHead className="text-xs text-[#969696]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="tracking-wider overflow-x-scroll">
          {paginatedData.map((item, index) => {
            const globalIdx = (page - 1) * perPage + index;
            const isBlocked = blocked[globalIdx];
            return (
              <TableRow key={index} className="border-none">
                {/* User */}
                <TableCell className={isBlocked ? "opacity-30" : "opacity-100"}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8">
                    <Image
                      src={item.image}
                      alt={item.name}
                      height={32}
                      width={32}
                      className="rounded-full object-cover"
                    />
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                </TableCell>
                {/* Activity Type */}
                <TableCell className={isBlocked ? "opacity-30" : "opacity-100"}>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.activity === "Upload"
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {item.activity}
                  </span>
                </TableCell>
                {/* Details */}
                <TableCell className={isBlocked ? "opacity-30" : "opacity-100"}>
                  {item.Details}
                </TableCell>
                {/* Time */}
                <TableCell className={isBlocked ? "opacity-30" : "opacity-100"}>
                  {item.time}
                </TableCell>
                {/* Status */}
                <TableCell className={isBlocked ? "opacity-30" : "opacity-100"}>
                  <div className="flex justify-center items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold  ${
                        item.status === "Premium"
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </TableCell>
                {/* Photo */}
                <TableCell className={isBlocked ? "opacity-30" : "opacity-100"}>
                  <Image
                    src={item.photo}
                    alt="photo"
                    height={32}
                    width={32}
                    className="w-8 h-8 rounded"
                  />
                </TableCell>
                {/* Action */}
                <TableCell>
                  <button
                    className="p-2 hover:bg-gray-100 rounded"
                    onClick={() =>
                      isBlocked
                        ? handleUnblock(globalIdx)
                        : handleBlockToggle(globalIdx)
                    }
                  >
                    {isBlocked ? <Visible /> : <RemoveIcon />}
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
</div>
      {/* Pagination and total count */}
      <div className="flex md:items-center md:flex-row md:justify-between flex-col mt-4">
        <div className="text-sm text-gray-600">
          Showing {(page - 1) * perPage + 1} to{" "}
          {Math.min(page * perPage, data.length)} from {data.length} records
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
