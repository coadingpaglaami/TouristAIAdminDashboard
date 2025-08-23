import { UserActivity } from "@/lib/data";
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

interface UserActivitiesCardProps {
  data: UserActivity[];
}

export const UserActivitiesCard = ({ data }: UserActivitiesCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 ">Search Frequency</h2>
      <div className="space-y-4">
        {/* {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                {item.image ? (
                  <Image src={item.image} alt={item.name} height={50} width={50} className="w-10 h-10 rounded-full" />
                ) : (
                  <span className="text-sm">{item.name.charAt(0)}</span>
                )}
              </div>
              <div>
                <p className="font-medium">{item.name}</p>
                <span className={`text-sm ${item.status === 'premium' ? 'text-yellow-600' : 'text-gray-600'}`}>
                  {item.status}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">{item.numtimes} times</p>
            </div>
          </div>
        ))} */}
        <Table className="w-full" style={{ borderSpacing: "0 10px" }}>
          <TableHeader className="w-full">
            <TableRow className="w-full">
              <TableHead className="w-1/3">Name </TableHead>
              <TableHead className="w-1/3 text-center">Status</TableHead>
              <TableHead className="w-1/3 text-right tracking-wider">Search History</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* 
              <TableCell className="w-1/3">Paid</TableCell>
              <TableCell className="w-1/3 ">Credit Card</TableCell> */}
            {data.map((item, index) => (
              <React.Fragment key={index}>
           
                  <TableRow className="w-full border-none">
                    <TableCell className="w-1/3 font-medium py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center border-2 border-black">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              height={50}
                              width={50}
                              className="w-10 h-10 rounded-full"
                            />
                          ) : (
                            <span className="text-sm">
                              {item.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <p className="font-medium text-lg tracking-wider">{item.name}</p>
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
                        <p className="font-bold">{item.numtimes} times</p>
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
