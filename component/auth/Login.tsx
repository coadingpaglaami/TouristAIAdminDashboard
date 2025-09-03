"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "@/services/api";
import { setCookie } from "@/lib/cookies";
import { toast } from "sonner";

interface FormData {
  email: string;
  password: string;
}

export const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    try {
      const res = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();
      if (res?.access) {
        console.log("Login successful", res);
        setCookie("access_token", res.access, 7);
        setCookie("refresh_token", res.refresh, 7);
        router.push("/admin/dashboard");
        // Store login data in sessionStorage for immediate access
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("userMail", formData.email);
        toast.success("Login successful!");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again.");
    }
  };

  return (
    <div>
      <h4 className="text-2xl font-bold text-white text-center">
        Welcome Back!
      </h4>

      <form onSubmit={handleSubmit} className="grid gap-2">
        {/* Email */}
        <div>
          <label htmlFor="email" className="text-sm font-medium text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="mt-1 block w-full p-2 rounded-md bg-white text-black focus:outline-none"
          />
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

        <Link href="/admin/forget-password" className="w-full text-end text-sm">
          Forget Password?
        </Link>

        {/* Submit */}
        <button
          type="submit"
          className="w-full p-2 text-white orange rounded-md  font-semibold disabled:opacity-50"
          disabled={isLoading}
        >
          Log In
        </button>
      </form>
    </div>
  );
};
