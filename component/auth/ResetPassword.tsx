"use client";

import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FormData {
  newpassword: string;
  password: string;
}

export const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    newpassword: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    // Dummy redirect (no API)
    router.push("/admin/success");
  };

  return (
    <div>
      <h4 className="text-2xl font-bold text-white text-center">
        Reset Password
      </h4>

      <form onSubmit={handleSubmit} className="grid gap-2">
        {/* New Password */}
        <div>
          <label
            htmlFor="newpassword"
            className="text-sm font-medium text-white"
          >
            New Password
          </label>
          <div className="relative mt-1">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newpassword"
              name="newpassword"
              placeholder="*******"
              onChange={handleChange}
              className="block w-full p-2 rounded-md bg-white text-black focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
            >
              {showNewPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>



        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white"
          >
            Password
          </label>

          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="*******"
              onChange={handleChange}
              className="block w-full p-2 rounded-md bg-white text-black focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

    

        {/* Submit */}
        <button
          type="submit"
          className="w-full p-2 text-white orange rounded-md hover:bg-orange-600 font-bold mt-4"
        >
         Reset Password
        </button>
      </form>
    </div>
  );
};
