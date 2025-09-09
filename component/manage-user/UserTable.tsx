"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Delete,
  Block,
  CheckCircle,
  Chevron,
  ChevronNext,
  Edit,
  Instruction,
} from "@/svg/Action";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface UserTable {
  id: number;
  image: string;
  name: string;
  status: "Inactive" | "Active";
  subscription: "Free" | "Premium" | "Expired";
  email: string;
  lastactive: string;
  duration?:
    | "1 Hour"
    | "6 Hours"
    | "12 Hours"
    | "1 Day"
    | "3 Days"
    | "7 Days"
    | "15 Days";
  isBanned: boolean;
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
  ];

  const durations: Array<UserTable["duration"]> = [
    "1 Hour",
    "6 Hours",
    "12 Hours",
    "1 Day",
    "3 Days",
    "7 Days",
    "15 Days",
  ];

  const getRandomTimeAgo = () => {
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
    id: i + 1,
    image: images[i % images.length],
    name: names[i % names.length],
    status: statuses[i % statuses.length],
    subscription: subscription[i % subscription.length],
    email: emails[i % emails.length],
    lastactive: getRandomTimeAgo(),
    duration: durations[Math.floor(Math.random() * durations.length)],
    isBanned: Math.random() < 0.2, // 20% chance to be banned
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

interface UserTableProps {
  search?: string;
  subscriptionFilter?: string;
  bannedFilter?: string;
}

export const UserTable = ({
  search = "",
  subscriptionFilter = "all",
  bannedFilter = "all",
}: UserTableProps) => {
  const [data, setData] = useState<UserTable[]>(generateDummyData(80));
  // const [blocked, setBlocked] = useState<{ [key: number]: boolean }>({});
  const [page, setPage] = useState(1);
  const [deleteUser, setDeleteUser] = useState<UserTable | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserTable | null>(null); // Added state for selected user in dialog
  const [bannedUser, setBannedUser] = useState<UserTable | null>(null);
const [banDuration, setBanDuration] = useState<UserTable["duration"]>("1 Hour"); 
  const rowsPerPage = 7;

  const handleDelete = () => {
    if (!deleteUser) return;
    // Remove the user from the data list
    setData((prevData) =>
      prevData.filter((user) => user.name !== deleteUser.name)
    );
    console.log("Deleting user:", deleteUser.name);
    setDeleteUser(null); // Close the delete dialog after deletion
  };

const handleToggleBanUser = () => {
  if (!bannedUser) return;

  // Ensure banDuration is one of the valid values in the UserTable type
  const validDuration: UserTable["duration"] = banDuration;

  // If the user is being banned, we set the ban duration
  const updatedUser = {
    ...bannedUser,
    isBanned: !bannedUser.isBanned,
    duration: bannedUser.isBanned ? undefined : validDuration, // Set duration only when banning
  };

  // Update the user data
  setData((prevData) =>
    prevData.map((user) =>
      user.id === bannedUser.id ? updatedUser : user
    )
  );

  console.log(bannedUser.isBanned ? "User unbanned:" : "User banned:", bannedUser.name, "for", bannedUser.isBanned ? "no duration" : validDuration);
  setBannedUser(null); // Close the banned/unbanned dialog after action
  setBanDuration("1 Hour"); // Reset the duration to default
};
  const filteredData = useMemo(() => {
    return data.filter((user) => {
      const matchesSearch =
        search === "" ||
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesSubscription =
        subscriptionFilter === "all" ||
        user.subscription === subscriptionFilter;

      const matchesBanned =
        bannedFilter === "all" ||
        (bannedFilter === "Banned" && user.isBanned) ||
        (bannedFilter === "Unbanned" && !user.isBanned);

      return matchesSearch && matchesSubscription && matchesBanned;
    });
  }, [data, search, subscriptionFilter, bannedFilter]);

  // Update pagination to use filteredData instead of data
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [search, subscriptionFilter, bannedFilter]);

  const paginationNumbers = getPagination(page, totalPages);

  return (
    <div className="flex flex-col gap-3 bg-white p-4 rounded-lg">
      <h3 className="text-2xl tracking-wider">Manage Users</h3>
      <div className="overflow-x-auto">
        <Table>
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
              <TableHead className="text-xs text-[#969696] px-6">
                <div className="flex items-center gap-2 ">
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
                            <Edit />
                          </span>
                          <span className="pb-1 text-sm">
                            Edit User Information
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>
                            {" "}
                            <Block />
                          </span>
                          <span className="pb-1 text-sm">Block User</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>
                            <Delete />
                          </span>
                          <span className="pb-1 text-sm">Delete User</span>
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
              const isBlocked = item.isBanned;
              return (
                <TableRow
                  key={globalIdx}
                  className="border-none transition-opacity"
                >
                  {/* User */}
                  <TableCell
                    className={isBlocked ? "opacity-50" : "opacity-100"}
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 rounded-full p-2">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="  border border-gray-200 object-cover rounded-full"
                        />
                      </div>
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
                  <TableCell
                    className={isBlocked ? "opacity-50" : "opacity-100"}
                  >
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
                  <TableCell
                    className={isBlocked ? "opacity-50" : "opacity-100"}
                  >
                    {item.email}
                  </TableCell>
                  {/* Last Active */}
                  <TableCell
                    className={isBlocked ? "opacity-50" : "opacity-100"}
                  >
                    {item.lastactive}
                  </TableCell>
                  {/* Action */}
                  <TableCell>
                    <div className="flex gap-2 items-center">
                      {/* Edit Dialog */}
                      <Dialog
                        open={!!selectedUser && selectedUser.name === item.name}
                        onOpenChange={(open) =>
                          !open ? setSelectedUser(null) : setSelectedUser(item)
                        }
                      >
                        <DialogTrigger asChild>
                          <button
                            className="p-2 hover:bg-gray-100 rounded"
                            title="Edit"
                            onClick={() => setSelectedUser(item)}
                          >
                            <Edit />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="p-0">
                          <DialogHeader className="border-b border-gray-300">
                            <DialogTitle className="p-4">
                              Change user subscription status
                            </DialogTitle>
                          </DialogHeader>
                          <div className="flex items-center gap-2 p-6">
                            <Image
                              src={item.image}
                              alt={item.name}
                              height={32}
                              width={32}
                              className="w-8 h-8 rounded-full"
                            />
                            <div className="font-medium">{item.name}</div>
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
                          <div className="px-6 pt-4 pb-6">
                            <form className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="status">Duration</Label>
                                <Select
                                  defaultValue={item.duration || "1 Hour"}
                                >
                                  <SelectTrigger id="status">
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1 Hour">
                                      1 Hour
                                    </SelectItem>
                                    <SelectItem value="2 Hours">
                                      2 Hours
                                    </SelectItem>
                                    <SelectItem value="6 Hours">
                                      6 Hours
                                    </SelectItem>
                                    <SelectItem value="12 Hours">
                                      12 Hours
                                    </SelectItem>
                                    <SelectItem value="1 Day">1 Day</SelectItem>
                                    <SelectItem value="3 Days">
                                      3 Days
                                    </SelectItem>
                                    <SelectItem value="7 Days">
                                      7 Days
                                    </SelectItem>
                                    <SelectItem value="15 Days">
                                      15 Days
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </form>
                          </div>
                          <DialogFooter className="p-4">
                            <Button
                              variant="outline"
                              onClick={() => setSelectedUser(null)}
                            >
                              Cancel
                            </Button>
                            <Button className="orange">Activate</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      {/* Block / Unblock */}
                      {/* <button
                        className="p-2 hover:bg-gray-100 rounded opacity-100"
                        title={isBlocked ? "Unblock" : "Block"}
                        onClick={() => {
                          if (!isBlocked) {
                            setBannedUser(item); // Open the dialog for unbanned users to confirm the block
                          } else {
                            handleToggleBanUser(); // Directly toggle for banned users
                          }
                        }}
                      >
                        {isBlocked ? <Block /> : <CheckCircle />}
                      </button> */}
      <Dialog
              open={!!bannedUser && bannedUser.name === item.name}
              onOpenChange={(open) =>
                !open ? setBannedUser(null) : setBannedUser(item)
              }
            >
              <DialogTrigger asChild>
                <button
                  className="p-2 hover:bg-gray-100 rounded"
                  title={isBlocked ? "Unblock" : "Block"}
                  onClick={() => setBannedUser(item)}
                >
                  {isBlocked ? <Block /> : <CheckCircle />}
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {isBlocked ? "Unban Confirmation" : "Ban Confirmation"}
                  </DialogTitle>
                  <DialogDescription>
                    Are you sure you want to{" "}
                    {isBlocked ? "unban" : "ban"}{" "}
                    <span className="font-semibold text-red-600">
                      {bannedUser?.name}
                    </span>
                    ? <br /> This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                {/* Show the duration input only when banning */}
                {!isBlocked && (
                  <div className="px-6 pt-4 pb-6">
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="duration">Ban Duration</Label>
                        <Select
                          value={banDuration}
                          onValueChange={(value) => setBanDuration(value as UserTable["duration"])}
                        >
                          <SelectTrigger id="duration">
                            <SelectValue placeholder="Select Duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1 Hour">1 Hour</SelectItem>
                            <SelectItem value="6 Hours">6 Hours</SelectItem>
                            <SelectItem value="12 Hours">12 Hours</SelectItem>
                            <SelectItem value="1 Day">1 Day</SelectItem>
                            <SelectItem value="3 Days">3 Days</SelectItem>
                            <SelectItem value="7 Days">7 Days</SelectItem>
                            <SelectItem value="15 Days">15 Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </form>
                  </div>
                )}
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setBannedUser(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="orange p-2 rounded-md"
                    onClick={handleToggleBanUser}
                  >
                    {isBlocked ? "Unban" : "Ban"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

                      {/* Delete Dialog */}
                      <Dialog
                        open={!!deleteUser && deleteUser.name === item.name}
                        onOpenChange={(open) =>
                          !open ? setDeleteUser(null) : setDeleteUser(item)
                        }
                      >
                        <DialogTrigger asChild>
                          <button
                            className="p-2 hover:bg-gray-100 rounded"
                            title="Delete"
                            onClick={() => setDeleteUser(item)}
                          >
                            <Delete />
                          </button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Confirmation</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete{" "}
                              <span className="font-semibold text-red-600">
                                {deleteUser?.name}
                              </span>
                              ? <br /> This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setDeleteUser(null)}
                            >
                              Cancel
                            </Button>
                            <Button
                              className="orange p-2 rounded-md"
                              onClick={handleDelete}
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {/* Pagination Controls */}
      <div className="flex items-center md:justify-between md:flex-row flex-col mt-4">
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
