import { stringToColor } from "@/lib/stringToColor";
import Image from "next/image";

interface UserAvatarProps {
  index?: number; // optional, in case you don't always need it
  username: string;
  avatar_url?: string | null;
  // function to generate background color
}

export const AvatarAndImage: React.FC<UserAvatarProps> = ({
  index,
  username,
  avatar_url,
}) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      {index !== undefined && <span>{index + 1}</span>}

      {avatar_url ? (
        <div className="relative w-8 h-8 rounded-full p-2">
          <Image
            src={avatar_url}
            alt={username}
            fill
            className="  border border-gray-200 object-cover rounded-full"
          />
        </div>
      ) : (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
          style={{ backgroundColor: stringToColor(username) }}
        >
          {username.charAt(0).toUpperCase()}
        </div>
      )}

      <span className="text-sm tracking-wider">
        {username.slice(0, 1).toUpperCase() + username.slice(1).toLowerCase()}
      </span>
    </div>
  );
};
