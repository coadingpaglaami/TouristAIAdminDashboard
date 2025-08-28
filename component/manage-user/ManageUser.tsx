import { SearchIcon } from "@/svg/Action"
import { UserTable } from "./UserTable"

export const ManageUser=()=>{
    return(
       <div className="flex flex-col gap-8 py-10 px-4 max-md:max-w-screen overflow-hidden">
         <div className="flex md:flex-row flex-col justify-between items-center gap-4">
           <div className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 w-full md:max-w-[400px]">
             <SearchIcon />
             <input
               type="text"
               placeholder="Search"
               className="p-2  focus:outline-none"
             />
           </div>
           <div className="flex gap-2 items-center max-w-[350px] w-full ">
             <select className="border border-gray-300 rounded-md p-4 w-1/2">
               <option value="all">All Subscription</option>
               <option value="active">Free</option>
               <option value="inactive">Premium</option>
               <option value="inactive">Expired</option>
             </select>
             <select className="border border-gray-300 rounded-md p-4 w-1/2">
               <option value="all">All Status</option>
               <option value="active">Free</option>
               <option value="inactive">Premium</option>
             </select>
           </div>
         </div>
         <UserTable />
       </div>
    )
}