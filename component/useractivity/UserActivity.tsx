import { SearchIcon } from "@/svg/Action";
import { ActivityTable } from "./ActivityTable";

export const UserActivity = () => {
  return (
    <div className="flex flex-col gap-8 py-10 px-4">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 w-full max-w-[400px]">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search"
            className="p-2  focus:outline-none"
          />
        </div>
        <div className="flex gap-2 items-center max-w-[350px] w-full ">
          <select className="border border-gray-300 rounded-md p-4 w-1/2">
            <option value="all">All Activity</option>
            <option value="active">Upload</option>
            <option value="inactive">Clicked</option>
          </select>
          <select className="border border-gray-300 rounded-md p-4 w-1/2">
            <option value="all">All Status</option>
            <option value="active">Free</option>
            <option value="inactive">Premium</option>
          </select>
        </div>
      </div>
      <ActivityTable />
    </div>
  );
};
