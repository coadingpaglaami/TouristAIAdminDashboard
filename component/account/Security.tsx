"use client";
import { stringToColor } from "@/lib/stringToColor";
import { useGetProfileQuery, usePasswordChangeMutation } from "@/services/api";
import Image from "next/image";
import { toast } from "sonner";

export const Security = () => {
  // Set default values for profile photo, name, and email

  const [changePassword, { isLoading }] = usePasswordChangeMutation();
  const { data: profileData } = useGetProfileQuery();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      await changePassword(formData).unwrap();
      e.currentTarget.reset();
      toast.success("Password changed successfully", {
        richColors: true,
      });
    } catch (error) {
      console.error("Password change error:", error);
      toast.error("Failed to change password", {
        richColors: true,
      });
    }
  };

  return (
    <div className=" p-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-6 gap-4">
          <label
            htmlFor="profile-photo"
            className="flex justify-center items-center w-24 h-24 border-2  rounded-full cursor-pointer relative"
          >
            {profileData?.profile_picture_url ? (
              <Image
                src={profileData.profile_picture_url}
                alt="Profile"
                fill
                className="object-cover rounded-full"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-white text-2xl font-semibold"
                style={{
                  backgroundColor: stringToColor(profileData?.username || ""),
                }}
              >
                {(profileData?.username || "A")[0].toUpperCase()}
              </div>
            )}
          </label>
          <div className="flex flex-col gap-3">
            <span className="text-lg font-semibold">Security</span>
            <span className="text-sm text-[#1C1B1F]">
              Keep your account secure by updating your password and enabling
              extra security measures.
            </span>
          </div>
        </div>
        <div className="flex md:justify-between md:flex-row flex-col md:gap-8 tracking-wider">
          <div className="md:mb-4 mb-2 flex-1">
            <label htmlFor="profile-name" className="block text-sm mb-2">
              Current Password
            </label>
            <input
              type="password"
              name="current_password"
              placeholder="Enter your profile name"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none "
            />
          </div>

          <div className="md:mb-6 mb-2 flex-1">
            <label htmlFor="password" className="block text-sm mb-2">
              New Password
            </label>
            <input
              type="password"
              name="new_password"
              placeholder="Enter your email"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
        </div>
        {/* Third input at the bottom, 50% width */}
        <div className="mb-6 w-full md:w-1/2">
          <label htmlFor="new-input" className="block text-sm mb-2">
            {/* Change label as needed */}
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none "
            required
          />
        </div>
        <button
          type="submit"
          className="w-fit p-2 float-right rounded-lg text-white text-sm orange tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};
