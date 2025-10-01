"use client";

import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAdminResetPasswordMutation } from "@/services/api";

interface FormData {
  new_password: string;
  confirm_password: string;
  email: string | null;
}

export const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    new_password: "",
    confirm_password: "",
    email: "",
  });
  const [data, { isLoading }] = useAdminResetPasswordMutation();

  useEffect(() => {
    const userMail = sessionStorage.getItem("userMail");
    if (userMail) {
      setFormData((prev) => ({ ...prev, email: userMail }));
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await data(formData).unwrap();
      // Dummy redirect (no API)
      router.push("/admin/success");
    } catch (err) {
      console.error("Error resetting password:", err);
    }
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
              name="new_password"
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
            Confirm Password
          </label>

          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="confirm_password"
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
          className="w-full p-2 text-white orange rounded-md hover:bg-orange-600 font-bold mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};
