import { UserType } from "@/lib/data";

interface UserTypesCardProps {
  data: UserType[];
}

export const UserTypesCard = ({ data }: UserTypesCardProps) => {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-md:w-full">
        {data.map((item, index) => (
          <div key={index} className="border rounded-lg p-4 bg-white">
            <div className="flex flex-col gap-4">
              <span className="text-xl font-semibold tracking-wider text-[#1C1B1F]">{item.typeuser}</span>
              <div className="flex items-center font-bold text-2xl">
                <span className="mr-2">{item.icon}</span>

                <span>{item.numuser.toLocaleString()}</span>
              </div>

              <span
                className={`text-sm ${
                  item.isIncrease ? "text-green-600" : "text-red-600"
                }`}
              >
               <span className="tracking-[0.1em] text-sm"> {item.isIncrease ? "↑ " : "↓ "}
                {item.increasepercentage}%{" from last month"}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
  );
};
