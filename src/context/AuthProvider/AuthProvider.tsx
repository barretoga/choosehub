"use client";

import { redirect } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useAppSelector } from "~/hooks";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authenticated = useAppSelector((state) => state.auth.authenticated);

  useEffect(() => {
    if (!authenticated) {
      redirect("/login");
    }
  }, [authenticated]);

  if (authenticated === null) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
