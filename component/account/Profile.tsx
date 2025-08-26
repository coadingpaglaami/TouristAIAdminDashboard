"use client";
import { Camera } from "@/svg/Account";
import Image from "next/image";
import { useState } from "react";

export const Profile = () => {
  // Set default values for profile photo, name, and email
  const [profileName, setProfileName] = useState("Jason Wanchs");
  const [email, setEmail] = useState("jasonwanchs@mail.com");
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfilePhoto(e.target.files && e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., upload photo, save name, and email)
    console.log("Updated Profile Name:", profileName);
    console.log("Updated Email:", email);
    console.log("Updated Profile Photo:", profilePhoto);
  };

  return (
    <div className=" p-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-6 gap-3">
          <label
            htmlFor="profile-photo"
            className="flex justify-center items-center w-24 h-24 border-2  rounded-full cursor-pointer relative"
          >
            {profilePhoto ? (
              <>
                <Image
                  src={URL.createObjectURL(profilePhoto)}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                  fill // Set image size to match the container
                />
                <div className="relative z-10">
                  <Camera />
                </div>
              </>
            ) : (
              <>
                <Image
                  src="/adminphoto.jpg" // Default image path
                  alt="Default Profile"
                  className="w-full h-full object-cover rounded-full"
                  fill
                />
                <div className="relative z-10">
                  <Camera />
                </div>
              </>
            )}
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
              required
              className="w-full p-2 border border-[#D9D9D9] rounded-md "
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
              value={email}
              readOnly
              disabled
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-fit p-2 float-right rounded-lg text-white text-sm orange tracking-wider"
        >
          Save changes
        </button>
      </form>
    </div>
  );
};
