"use client";

import { set } from "date-fns";
import { useRouter } from "next/navigation";
import React, {
  useRef,
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from "react";

export const Verify: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [buttonText, setButtonText] = useState<string>("Verify OTP");
  const [wrongOtp, setWrongOtp] = useState<boolean>(false);
  const router = useRouter();

  // enable/disable verify button
  useEffect(() => {
    const allFilled = otp.every((digit) => digit.length === 1);
    setIsButtonDisabled(!allFilled);
  }, [otp]);

  const handleInputChange = (index: number, value: string) => {
    setWrongOtp(false);
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Limit to 1 char
    setOtp(newOtp);

    // Move focus to next
    if (value.length === 1 && index < 4) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    const demoCode = "12345";
    if (otpCode === demoCode) {
      router.push("/admin/reset-password");
      setWrongOtp(false);
    } else {
      setWrongOtp(true);
    }
  };

  const countdownDuration = 5;

  const handleVerifyButton = () => {
    setIsDisabled(true);
    setCountdown(countdownDuration);
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
      setButtonText("Resend");
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
        Please input the verification code sent to your email jerry73@aol.com
      </p>
      <div className="grid gap-4 w-full">
        <div className="flex justify-center w-full gap-6">
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <input
                key={index}
                ref={(el) => { inputs.current[index] = el; }}
                type="text"
                value={otp[index]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(index, e.target.value)
                }
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`otp-input w-15 h-15 text-center ${
                  otp[index]
                    ? "border-2 border-[#F7C56B]"
                    : "border-2 border-white"
                } rounded-md text-white focus:outline-none focus:border-[#F7C56B]`}
                maxLength={1}
              />
            ))}
        </div>
        {wrongOtp && (
          <p className="text-red-500 text-center">Invalid code!</p>
        )}

        <button
          onClick={handleVerify}
          className="w-full p-2 disabled:!opacity-50 disabled:!bg-white disabled:!text-black disabled:!cursor-not-allowed text-white defaultbutton rounded-md orange font-bold"
          disabled={isButtonDisabled}
        >
          Verify OTP
        </button>

        <button
          onClick={handleVerifyButton}
          className={`w-full p-2 rounded-md border  bg
          ${
            isDisabled
              ? " bg-[#BDBDBD] cursor-not-allowed text-white font-bold"
              : "text-[#F7C56B]"
          }
          transition-colors duration-300`}
          disabled={isDisabled}
        >
          {buttonText}
        </button>

      </div>
    </div>
  );
};
