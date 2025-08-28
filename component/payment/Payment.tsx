import { SearchIcon } from "@/svg/Action";
import { PaymentTable } from "./PaymentTable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export const PaymentRecord = () => {
  return (
    <div className="flex flex-col gap-8 py-10 px-4 max-md:max-w-screen overflow-hidden">
      <div className="flex md:justify-between items-center md:flex-row flex-col gap-4">
        <div className="*:not-first:mt-2">
          <div className="relative max-w-[400px]">
            <Input
              className="peer ps-9 pe-9 focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-1 focus:border-gray-300"
              placeholder="Search..."
              type="search"
              
            />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <SearchIcon />
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center max-w-[320px] w-full ">
          <Select>
            <SelectTrigger className="w-[350px]">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Duration</SelectLabel>
                <SelectItem value="1h">1 hour</SelectItem>
                <SelectItem value="2h">2 hours</SelectItem>
                <SelectItem value="5h">5 hours</SelectItem>
                <SelectItem value="2d">2 days</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <PaymentTable />
    </div>
  );
};
