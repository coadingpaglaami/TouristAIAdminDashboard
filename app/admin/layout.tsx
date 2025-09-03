import { ReactNode } from "react";
import AuthLayOut from "./AuthLayOut";

export default function DashboardLayOut({ children }: { children: ReactNode }) {
  return <AuthLayOut>{children}</AuthLayOut>;
}
