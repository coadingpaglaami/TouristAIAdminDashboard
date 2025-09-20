"use client";
import { useChangeInfoMutation, useGetProfileQuery } from "@/services/api";
import { Camera } from "@/svg/Account";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { stringToColor } from "@/lib/stringToColor"; // Your helper
import { toast } from "sonner";

export const Profile = () => {
  const { data: profileData, isLoading, refetch } = useGetProfileQuery();
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profileName, setProfileName] = useState(profileData?.username || "");
  const [changeInfo, { isLoading: isChanging }] = useChangeInfoMutation();

  const previewUrl = useMemo(() => {
    if (profilePhoto) return URL.createObjectURL(profilePhoto);
    return null;
  }, [profilePhoto]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (profileData?.username) setProfileName(profileData.username);
  }, [profileData?.username]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setProfilePhoto(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (profileName) formData.append("username", profileName);
    if (profilePhoto) formData.append("profile_picture_input", profilePhoto);
    console.log("Form Data:", formData);
    try {
      await changeInfo(formData).unwrap();
      toast.success("Profile updated successfully!", {
        richColors: true,
      });
      await refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile", {
        richColors: true,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 animate-pulse">
        <div className="flex items-center mb-6 gap-3">
          <div className="w-24 h-24 bg-gray-300 rounded-full" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-gray-300 rounded" />
            <div className="h-3 w-48 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-6 gap-3">
          <label
            htmlFor="profile-photo"
            className="flex justify-center items-center w-24 h-24 border-2 rounded-full cursor-pointer relative overflow-hidden"
          >
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover rounded-full"
              />
            ) : profileData?.profile_picture_url ? (
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
                  backgroundColor: stringToColor(profileName || "A"),
                }}
              >
                {(profileName || "A")[0].toUpperCase()}
              </div>
            )}
            <div className="absolute top-1/2">
              <Camera />
            </div>
          </label>

          <input
            type="file"
            id="profile-photo"
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />

          <div className="flex flex-col gap-3">
            <span className="text-lg font-semibold">Profile Photo</span>
            <span className="text-sm text-[#1C1B1F]">
              Upload a new photo or change your existing one
            </span>
          </div>
        </div>

        <div className="flex md:justify-between md:flex-row flex-col gap-4">
          <div className="mb-4 flex-1">
            <label
              htmlFor="profile-name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Profile Name
            </label>
            <input
              type="text"
              id="profile-name"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              placeholder="Enter your profile name"
              className="w-full p-2 border border-[#D9D9D9] rounded-md"
            />
          </div>

          <div className="mb-6 flex-1">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={profileData?.email || ""}
              readOnly
              disabled
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-fit p-2 float-right rounded-lg text-white text-sm orange tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isChanging}
        >
          {isChanging ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
};
