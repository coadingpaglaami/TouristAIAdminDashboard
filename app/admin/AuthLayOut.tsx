"use client";

import store from "@/store/store";
import { Provider } from "react-redux";
import AdminLayOut from "./AdminLayOut";
import { Toaster } from "@/components/ui/sonner";

export default function AuthLayOut({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AdminLayOut>
        {children}
        <Toaster />
      </AdminLayOut>
    </Provider>
  );
}
