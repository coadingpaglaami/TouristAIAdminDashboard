"use client";
import { Camera } from "@/svg/Account";
import Image from "next/image";
import { useState } from "react";

export const Security = () => {
  // Set default values for profile photo, name, and email
  const [profileName, setProfileName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfilePhoto(e.target.files && e.target.files[0]);
  };
  console.log(handleFileChange);

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
        <div className="flex items-center mb-6 gap-4">
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
              </>
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
              id="profile-name"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
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
              id="password"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            id="new-input"
            // Add state and handlers as needed
            placeholder="Confirm Password"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none "
          />
        </div>
        <button
          type="submit"
          className="w-fit p-2 float-right rounded-lg text-white text-sm orange tracking-wider"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};
