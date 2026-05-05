"use client";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { hydrateAuth } from "@/store/slices/authSlice";
import { User } from "@/features/auth/auth";

function HydrationWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    store.dispatch(
      hydrateAuth({
        user: user ? JSON.parse(user) : null,
        token: token || null,
      }),
    );
  }, []);

  return <>{children}</>;
}

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <HydrationWrapper>{children}</HydrationWrapper>
    </Provider>
  );
}
