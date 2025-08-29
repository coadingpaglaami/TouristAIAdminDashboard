import { ReactNode } from "react";
import AdminLayOut from "./AdminLayOut";



export default function DashboardLayOut({ children }: { children: ReactNode }) {
  return <AdminLayOut>{children}</AdminLayOut>;
}
