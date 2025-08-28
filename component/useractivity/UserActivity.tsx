import { SearchIcon } from "@/svg/Action";
import { ActivityTable } from "./ActivityTable";

export const UserActivity = () => {
  return (
    <div className="w-full overflow-hidden max-md:max-w-screen ">
    <div className="flex flex-col gap-3 py-10 px-4">
      <div className="flex md:justify-between md:items-center gap-4 flex-col md:flex-row w-full">
        <div className="flex items-center gap-2 rounded-md border border-gray-300 px-4 w-full md:max-w-[400px]">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search"
            className="p-2  focus:outline-none"
          />
        </div>
        <div className="flex gap-2 md:flex-row flex-col  md:max-w-[350px] w-full ">
          <select className="border border-gray-300 rounded-md p-3 w-1/2">
            <option value="all">All Activity</option>
            <option value="active">Upload</option>
            <option value="inactive">Clicked</option>
          </select>
          <select className="border border-gray-300 rounded-md p-3 w-1/2">
            <option value="all">All Status</option>
            <option value="active">Free</option>
            <option value="inactive">Premium</option>
          </select>
        </div>
      </div>
      <ActivityTable />
    </div>
    </div>
  );
};
