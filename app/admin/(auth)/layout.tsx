import { ReactNode } from "react";
import Image from "next/image";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayOut({ children }: AuthLayoutProps) {
  return (
    <div className="grid font-inter">
      <Image
        src="/authbg.jpg"
        alt="loading"
        height={900}
        width={900}
        className="absolute w-full h-full z-0 object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute z-10 h-full w-full bg-black/20 backdrop-blur-[7px]" />

      {/* Content */}
      <div className="grid w-full min-h-screen place-items-center p-5">
        <div className="p-10 px-5 md:px-20 relative z-20 bg-white/5 max-w-[800px]  mx-auto text-white rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
}
