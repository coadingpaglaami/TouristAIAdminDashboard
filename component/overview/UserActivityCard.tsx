import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface UserActivity {
  name: string;
  image?: string;
  status: string;
  search_history: number;
}
interface UserActivitiesCardProps {
  data: UserActivity[];
  loading?: boolean;
}

export const UserActivitiesCard = ({
  data,
  loading,
}: UserActivitiesCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 ">Search Frequency</h2>
      <div className="space-y-4">
        <Table className="w-full">
          <TableHeader className="w-full">
            <TableRow className="w-full">
              <TableHead className="w-1/3">Name </TableHead>
              <TableHead className="w-1/3 text-center">Status</TableHead>
              <TableHead className="w-1/3 text-right tracking-wider">
                Search History
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <TableRow key={index} className="w-full border-none">
                      <TableCell className="w-1/3 py-4">
                        <div className="flex items-center">
                          <Skeleton className="w-10 h-10 rounded-full mr-3" />
                          <Skeleton className="w-32 h-6" />
                        </div>
                      </TableCell>
                      <TableCell className="w-1/3 text-center py-4">
                        <Skeleton className="w-24 h-6 rounded-full mx-auto" />
                      </TableCell>
                      <TableCell className="py-4">
                        <Skeleton className="w-24 h-6 mx-auto" />
                      </TableCell>
                    </TableRow>
                  ))
              : data.map((item, index) => (
                  <React.Fragment key={index}>
                    <TableRow className="w-full border-none">
                      <TableCell className="w-1/3 font-medium py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full mr-3 flex items-center justify-center border-2 border-black">
                            <Image
                              src={item.image || "/avatar.png"}
                              alt={item.name}
                              height={50}
                              width={50}
                              className="w-10 h-10 rounded-full"
                            />
                          </div>
                          <p className="font-medium text-lg tracking-wider">
                            {item.name.charAt(0).toUpperCase()}
                            {item.name.slice(1)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="w-1/3 text-center py-4">
                        {" "}
                        <div className="w-full flex items-center justify-center">
                          <div>
                            <span
                              className={`text-sm text-center rounded-full p-2 tracking-[0.2em] ${
                                item.status === "premium"
                                  ? "green text-white font-medium "
                                  : "text-gray-600 bg-[#BDBDBD] font-medium"
                              }`}
                            >
                              {item.status.charAt(0).toUpperCase()}
                              {item.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        {" "}
                        <div className="text-right text-lg">
                          <p className=" tracking-wider">
                            {item.search_history} times
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
