"use client";

import { useForgotPasswordMutation } from "@/services/api";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";

export const ForgetPassword: React.FC = () => {
  const [forgotPassword,{isLoading}] = useForgotPasswordMutation();
  const [formData, setFormData] = useState<{ email: string }>({
    email: "",
  });
  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await forgotPassword(formData.email).unwrap();
      console.log("✅ Inside TRY, success body:", res);
      console.log("👉 Redirecting now...");
      sessionStorage.setItem("userMail", formData.email);
      console.log(sessionStorage.getItem("userMail"));
      console.log(formData.email);
      router.push("/admin/verifyotp");
    } catch (error: unknown) {
      // Handle error
      if (typeof error === "object" && error !== null) {
        console.log("❌ Inside CATCH, error object:", error);
        // @ts-expect-error: error may have status and data properties
        console.log("Status:", error.status);
        // @ts-expect-error: error may have status and data properties
        console.log("Error data:", error.data);
      } else {
        console.log("❌ Inside CATCH, error value:", error);
      }
    }
  };

  return (
    <div className="md:min-w-[400px] w-full">
      <h4 className="text-2xl font-semibold text-white text-center w-full">
        Forget Password
      </h4>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label htmlFor="email" className="text-sm font-medium text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email for password reset"
            onChange={handleChange}
            className="mt-1 block w-full p-3 rounded-md bg-white text-black focus:outline-none focus:border-none"
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 text-white defaultbutton rounded-md orange font-bold disabled:opacity-50"
          disabled={isLoading}
        >
          Get OTP
        </button>
      </form>
    </div>
  );
};
