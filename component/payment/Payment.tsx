import { SearchIcon } from "@/svg/Action"
import { PaymentTable } from "./PaymentTable"

export const PaymentRecord=()=>{
    return(
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
               <option value="all">1 hour</option>
               <option value="active">2 hours</option>
               <option value="inactive">5 hours</option>
               <option value="inactive">2 days</option>
             </select>
           </div>
         </div>
         <PaymentTable />
       </div>
    )
}