import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Chevron } from "@/svg/Action";
import Image from "next/image";

interface UserEarning {
  name: string;
  image: string;
  email: string;
  totalSpent: number;
  purchasedate: string;
  subscription: number;
  subscriptionunit: "Hour" | "Day";
  card: "Visa" | "MasterCard";
  status: "Active" | "Inactive";
}

const userEarnings: UserEarning[] = [
  {
    name: "Alice Johnson",
    image: "/table 1.png",
    email: "alice.johnson@example.com",
    totalSpent: 120.5,
    purchasedate: "2024-05-01",
    subscription: 3,
    subscriptionunit: "Day",
    card: "Visa",
    status: "Active",
  },
  {
    name: "Bob Smith",
    image: "/table 2.png",
    email: "bob.smith@example.com",
    totalSpent: 89.99,
    purchasedate: "2024-04-15",
    subscription: 9,
    subscriptionunit: "Hour",
    card: "MasterCard",
    status: "Inactive",
  },
  {
    name: "Charlie Brown",
    image: "/table 3.png",
    email: "charlie.brown@example.com",
    totalSpent: 200.0,
    purchasedate: "2024-03-22",
    subscription: 7,
    subscriptionunit: "Day",
    card: "Visa",
    status: "Active",
  },
  {
    name: "Diana Prince",
    image: "/table 4.png",
    email: "diana.prince@example.com",
    totalSpent: 150.75,
    purchasedate: "2024-06-10",
    subscription: 9,
    subscriptionunit: "Hour",
    card: "MasterCard",
    status: "Active",
  },
  {
    name: "Ethan Hunt",
    image: "/table 5.png",
    email: "ethan.hunt@example.com",
    totalSpent: 99.5,
    purchasedate: "2024-05-30",
    subscription: 2,
    subscriptionunit: "Day",
    card: "Visa",
    status: "Inactive",
  },
  {
    name: "Fiona Gallagher",
    image: "/table 6.png",
    email: "fiona.gallagher@example.com",
    totalSpent: 175.2,
    purchasedate: "2024-04-28",
    subscription: 9,
    subscriptionunit: "Hour",
    card: "MasterCard",
    status: "Active",
  },
  {
    name: "George Miller",
    image: "/table 7.png",
    email: "george.miller@example.com",
    totalSpent: 110.0,
    purchasedate: "2024-03-18",
    subscription: 1,
    subscriptionunit: "Day",
    card: "Visa",
    status: "Inactive",
  },
  {
    name: "Hannah Lee",
    image: "/table 1.png",
    email: "hannah.lee@example.com",
    totalSpent: 210.3,
    purchasedate: "2024-06-01",
    subscription: 9,
    subscriptionunit: "Hour",
    card: "MasterCard",
    status: "Active",
  },
  {
    name: "Ian Curtis",
    image: "/table 2.png",
    email: "ian.curtis@example.com",
    totalSpent: 130.0,
    purchasedate: "2024-05-12",
    subscription: 5,
    subscriptionunit: "Day",
    card: "Visa",
    status: "Inactive",
  },
  {
    name: "Julia Roberts",
    image: "/table 3.png",
    email: "julia.roberts@example.com",
    totalSpent: 160.8,
    purchasedate: "2024-04-05",
    subscription: 9,
    subscriptionunit: "Hour",
    card: "MasterCard",
    status: "Active",
  },
];
export const UserEarning = () => {
  return (
    <div className="bg-white rounded-lg p-4  overflow-y-scroll my-4 ">
      <h2 className="font-semibold tracking-wider text-xl text-[#1C1B1F]">
        User-wise earnings
      </h2>
      <div className="max-w-screen w-full overflow-x-auto">
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
            {userEarnings.map((plan, idx) => (
              <TableRow key={idx} className="border-none">
                <TableCell className="text-sm text-[#1C1B1F] font-medium tracking-wider">
                  <div className="flex items-center gap-3">
                    <div>
                      <Image
                        src={plan.image}
                        alt={plan.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </div>
                    <span>{plan.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-[#1C1B1F] font-medium tracking-wider">
                  {plan.email}
                </TableCell>
                <TableCell className="text-sm text-[#1C1B1F] font-medium tracking-wider">
                  {plan.subscription} {plan.subscriptionunit}
                </TableCell>
                <TableCell className="text-sm text-[#1C1B1F] font-medium tracking-wider">
                  ${plan.totalSpent} HK
                </TableCell>
                <TableCell>{plan.purchasedate}</TableCell>
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
                      plan.status === "Active"
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {plan.status}
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
