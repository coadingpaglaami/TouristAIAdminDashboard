import { UserType } from "@/lib/data";

interface UserTypesCardProps {
  data: UserType[];
}

export const UserTypesCard = ({ data }: UserTypesCardProps) => {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <div key={index} className="border rounded-lg p-4 bg-white">
            <div className="flex flex-col gap-4">
              <span className="font-semibold text-xl">{item.typeuser}</span>
              <div className="flex items-center font-bold text-xl">
                <span className="mr-2">{item.icon}</span>

                <span>{item.numuser.toLocaleString()}</span>
              </div>

              <span
                className={`text-sm ${
                  item.isIncrease ? "text-green-600" : "text-red-600"
                }`}
              >
               <span className="tracking-[0.1em] text-sm"> {item.isIncrease ? "↑ " : "↓ "}{" from last month"}
                {item.increasepercentage}%</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
