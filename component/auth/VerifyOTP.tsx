"use client";

import { useVerifyOtpMutation } from "@/services/api";
import { useRouter } from "next/navigation";
import React, {
  useRef,
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from "react";

export const Verify: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]); // 6 digits
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [buttonText, setButtonText] = useState<string>("Verify OTP");
  const [wrongOtp, setWrongOtp] = useState<boolean>(false);
  const router = useRouter();
  const [verifyOtp] = useVerifyOtpMutation();

  // ✅ Enable/disable verify button based on input
  useEffect(() => {
    const allFilled = otp.every((digit) => digit.length === 1);
    setIsButtonDisabled(!allFilled);
  }, [otp]);

  const handleInputChange = (index: number, value: string) => {
    setWrongOtp(false);
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // only 1 digit
    setOtp(newOtp);

    // auto move to next
    if (value.length === 1 && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // ✅ Verify with backend
  const handleVerify = async () => {
    const otpCode = otp.join("");

    try {
      const verify = await verifyOtp({ otp: otpCode }).unwrap();

      if (verify) {
        setWrongOtp(false);
        sessionStorage.removeItem("userMail"); // clear email after success
        router.push("/admin/reset-password");
      }
    } catch (err) {
      console.log("OTP verification failed", err);
      setWrongOtp(true);
    }
  };

  // Resend OTP logic
  const countdownDuration = 30; // usually 30 or 60 seconds
  const handleResend = () => {
    setIsDisabled(true);
    setCountdown(countdownDuration);
    // 🔔 You can also trigger backend resend OTP here
    // resendOtp({ email: sessionStorage.getItem("userMail") })
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isDisabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
        setButtonText(`Resend OTP in ${countdown - 1}s`);
      }, 1000);
    } else if (countdown === 0 && isDisabled) {
      setIsDisabled(false);
      setButtonText("Resend OTP");
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isDisabled, countdown]);

  return (
    <div>
      <h4 className="text-2xl font-semibold text-white text-center">
        Forget Password
      </h4>
      <p className="text-lg text-white text-center">
        Please input the verification code sent to your email{" "}
        {sessionStorage.getItem("userMail")}
      </p>
      <div className="grid gap-4 w-full">
        <div className="flex justify-center w-full gap-3">
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputs.current[index] = el;
                }}
                type="text"
                value={otp[index]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(index, e.target.value)
                }
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`otp-input w-12 h-12 text-center text-xl font-bold ${
                  otp[index]
                    ? "border-2 border-[#F7C56B]"
                    : "border-2 border-white"
                } rounded-md text-white focus:outline-none focus:border-[#F7C56B]`}
                maxLength={1}
              />
            ))}
        </div>

        {wrongOtp && (
          <p className="text-red-500 text-center">Invalid code! Try again.</p>
        )}

        <button
          onClick={handleVerify}
          className="w-full p-2 disabled:!opacity-50 disabled:!bg-white disabled:!text-black disabled:!cursor-not-allowed text-white defaultbutton rounded-md orange font-bold"
          disabled={isButtonDisabled}
        >
          Verify OTP
        </button>

        <button
          onClick={handleResend}
          className={`w-full p-2 rounded-md border transition-colors duration-300 ${
            isDisabled
              ? "bg-[#BDBDBD] cursor-not-allowed text-white font-bold"
              : "text-[#F7C56B]"
          }`}
          disabled={isDisabled}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
