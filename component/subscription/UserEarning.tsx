"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserEarningsQuery } from "@/services/api";
import Image from "next/image";
import { AvatarAndImage } from "../reusable";
import { Skeleton } from "@/components/ui/skeleton";

export const UserEarning = () => {
  const { data, isLoading } = useUserEarningsQuery();
  return (
    <div className="bg-white rounded-lg p-4  my-4 ">
      <h2 className="font-semibold tracking-wider text-xl text-[#1C1B1F]">
        User-wise earnings
      </h2>
      <div className=" overflow-x-auto">
        {/* <p>{isOverflowing ? "Content is overflowing" : "Content fits"}</p> */}
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="text-sm text-[#969696]">User</TableHead>
              <TableHead className="text-sm text-[#969696]">Email</TableHead>
              <TableHead className="text-sm text-[#969696]">
                Subscription
              </TableHead>
              <TableHead className="text-sm text-[#969696]">
                Total Spent
              </TableHead>
              <TableHead className="text-sm text-[#969696]">
                Purchase Date
              </TableHead>
              <TableHead className="text-sm text-[#969696]">Card</TableHead>
              <TableHead className="text-sm text-[#969696]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {isLoading
              ? Array.from({ length: 5 }).map((_, idx) => (
                  <TableRow key={`skeleton-${idx}`} className="border-none">
                    {/* Avatar + Name */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </TableCell>

                    {/* Email */}
                    <TableCell>
                      <Skeleton className="h-4 w-36" />
                    </TableCell>

                    {/* Subscription */}
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>

                    {/* Total Spent */}
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>

                    {/* Purchase Date */}
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>

                    {/* Card Logo */}
                    <TableCell>
                      <Skeleton className="h-6 w-10 rounded" />
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell>
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </TableCell>
                  </TableRow>
                ))
              : data?.results.slice(0, 10).map((plan, idx) => (
                  <TableRow key={idx} className="border-none">
                    <TableCell className="text-sm text-[#1C1B1F] font-medium tracking-wider">
                      <AvatarAndImage
                        username={plan.user.name}
                        avatar_url={plan.user.avatar}
                      />
                    </TableCell>
                    <TableCell className="text-sm text-[#1C1B1F] font-medium tracking-wider">
                      {plan.email}
                    </TableCell>
                    <TableCell className="text-sm text-[#1C1B1F] font-medium tracking-wider">
                      {plan.subscription}
                    </TableCell>
                    <TableCell className="text-sm text-[#1C1B1F] font-medium tracking-wider">
                      {plan.total_spent}
                    </TableCell>
                    <TableCell>{plan.purchase_date}</TableCell>
                    <TableCell className=" tracking-wider ">
                      <div className="float-left">
                        {plan.card == "Visa" ? (
                          <Image
                            src="/visa.png"
                            alt="Visa"
                            width={25}
                            height={25}
                            className="object-center"
                          />
                        ) : (
                          <Image
                            src="/mastercard.png"
                            alt="MasterCard"
                            width={25}
                            height={25}
                            className="object-center"
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-[#1C1B1F] font-medium tracking-wider">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold  ${
                          plan.status.text === "Active"
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-gray-700"
                        }`}
                      >
                        {plan.status.text}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
