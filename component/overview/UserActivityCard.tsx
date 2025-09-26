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
import { AvatarAndImage } from "../reusable";

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
  const sortedBySearchHistory = [...data].sort(
    (a: UserActivity, b: UserActivity) => b.search_history - a.search_history
  );
  return (
    <div className=" shadow p-6">
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
              : sortedBySearchHistory.slice(0, 4).map((item, index) => (
                  <React.Fragment key={index}>
                    <TableRow className="w-full border-none">
                      <TableCell className="w-1/3 font-medium py-4">
                        <AvatarAndImage
                          username={item.name}
                          avatar_url={item.image}
                        />
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
