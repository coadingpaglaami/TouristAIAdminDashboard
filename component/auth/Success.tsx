"use client";

import { useRouter } from "next/navigation";

export const Success = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-2xl font-bold text-white text-center">
        Congratulation!
      </h4>
      {/* Submit */}
      <p className="text-white text-sm font-light tracking-wider text-center">
        You have successfully reset your password
      </p>
      <button
        type="submit"
        className="w-full p-2 text-white orange rounded-md hover:bg-orange-600 font-bold mt-4"
        onClick={() => router.push("/admin/dashboard")}
      >
        Go to Dashboard
      </button>
    </div>
  );
};
