"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import Image from "next/image"; // Example action icon
import { Chevron, ChevronNext, Delete } from "@/svg/Action";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ActivityResult } from "@/interface/UserActivity";
import { useDeleteContenMutation } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";

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
    )
      range.push(i);
  }

  for (const i of range) {
    if (l) {
      if (i - l === 2) rangeWithDots.push(l + 1);
      else if (i - l !== 1) rangeWithDots.push("...");
    }
    rangeWithDots.push(i);
    l = i;
  }
  return rangeWithDots;
}
interface ActivityTableProps {
  data: ActivityResult[];
  count: number;
  isLoading: boolean;
  page: number;
  setPage: (page: number) => void;
  perPage: number;
}
export const ActivityTable = ({
  data,
  isLoading,
  page,
  setPage,
  perPage,
  count,
}: ActivityTableProps) => {
  const [deleteUser, setDeleteUser] = useState<ActivityResult | null>(null);
  // RTK Query mutation
  const [deleteConten, { isLoading: isDeleting }] = useDeleteContenMutation();
  // const [blocked, setBlocked] = useState<{ [key: number]: boolean }>({});
  const handleDelete = async (id?: number) => {
    console.log("Deleting user with id:", id);
    if (!id) return;
    try {
      await deleteConten(id).unwrap(); // call API
      setDeleteUser(null); // close dialog
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  const totalPages = Math.ceil(count / perPage);

  const paginationNumbers = getPagination(page, totalPages);

  return (
    <div className="flex flex-col gap-3 bg-white p-4 rounded-lg">
      <h3 className="text-2xl tracking-wider">User Activity</h3>
      <div className="overflow-x-auto max-w-screen">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs text-[#969696]">User</TableHead>
              <TableHead className="text-xs text-[#969696]">
                Activity Type
              </TableHead>
              {/* <TableHead className="text-xs text-[#969696]">Details</TableHead> */}
              <TableHead className="text-xs text-[#969696]">Time</TableHead>
              <TableHead className="text-xs text-[#969696] text-center">
                Status
              </TableHead>
              <TableHead className="text-xs text-[#969696]">Photo</TableHead>
              <TableHead className="text-xs text-[#969696]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="tracking-wider overflow-x-scroll">
            {isLoading
              ? Array.from({ length: perPage }).map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Skeleton className="h-6 w-24 rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-16 rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-12 rounded" />
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <Skeleton className="h-6 w-14 rounded" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-6 rounded" />
                    </TableCell>
                  </TableRow>
                ))
              : data.map((item, index) => {
                  return (
                    <TableRow key={index} className="border-none">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="relative w-8 h-8 rounded-full p-2">
                            <Image
                              src={
                                item.user.profile_picture_url || "/avatar.png"
                              }
                              alt={item.user.username}
                              fill
                              className="  border border-gray-200 object-cover rounded-full"
                            />
                          </div>
                          <span className="font-medium">
                            {item.user.username}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.activity_type === "Upload"
                              ? "bg-green-500 text-white"
                              : "bg-gray-300 text-gray-700"
                          }`}
                        >
                          {item.activity_type}
                        </span>
                      </TableCell>

                      {/* <TableCell>
                {item.Details}
                </TableCell> */}

                      <TableCell>{item.time}</TableCell>

                      <TableCell>
                        <div className="flex justify-center items-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              item.status === "Premium"
                                ? "bg-green-500 text-white"
                                : "bg-gray-300 text-gray-700"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="p-0 border-0 bg-transparent hover:bg-transparent focus:ring-0 ">
                              <Image
                                src={item.photo}
                                alt="photo"
                                height={32}
                                width={32}
                                className="w-8 h-8 rounded object-cover"
                              />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="lg:max-w-2xl flex justify-center items-center p-0">
                            <DialogTitle className="sr-only">
                              <VisuallyHidden>Profile photo</VisuallyHidden>
                            </DialogTitle>
                            <Image
                              src={item.photo}
                              alt="photo"
                              height={400}
                              width={400}
                              className="rounded object-cover max-h-[60vh] w-full  max-w-full"
                            />
                          </DialogContent>
                        </Dialog>
                      </TableCell>

                      <TableCell>
                        <Dialog
                          open={!!deleteUser && deleteUser.id === item.id}
                          onOpenChange={(open) => {
                            if (!open) setDeleteUser(null);
                          }}
                        >
                          <button
                            className="p-2 hover:bg-gray-100 rounded"
                            title="Delete"
                            onClick={() => setDeleteUser(item)}
                          >
                            <Delete />
                          </button>

                          <DialogContent>
                            <div className="p-4">
                              <h3 className="text-lg font-semibold mb-2">
                                Delete Confirmation
                              </h3>
                              <p className="text-sm text-gray-700 mb-4">
                                Are you sure you want to delete{" "}
                                <span className="font-semibold text-red-600">
                                  {deleteUser?.user.username}
                                </span>
                                ?
                                <br />
                                This action cannot be undone.
                              </p>
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  onClick={() => setDeleteUser(null)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  className="bg-orange-500 text-white"
                                  onClick={() => handleDelete(deleteUser?.id)}
                                  disabled={isDeleting}
                                >
                                  {isDeleting ? "Deleting..." : "Delete"}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex md:items-center md:flex-row md:justify-between flex-col mt-4">
        <div className="text-sm text-gray-600">
          Showing {(page - 1) * perPage + 1} to{" "}
          {Math.min(page * perPage, count)} from {count} records
        </div>
        <div className="flex items-center gap-1">
          <button
            className="p-3.5 rounded disabled:opacity-50 border border-[#4C5363] flex justify-center items-center"
            onClick={() => setPage(Math.max(1, page - 1))}
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
                    ? "text-green-600 border-2 border-[#F7C56B]"
                    : "border border-black text-gray-700"
                }`}
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
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >
            <ChevronNext />
          </button>
        </div>
      </div>
    </div>
  );
};
