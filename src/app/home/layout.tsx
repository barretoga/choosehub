import { ReactNode } from "react";
import { DashboardLayout } from "~/components";
import { AuthProvider } from "~/context";

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <AuthProvider>
      <div className="relative">
        {children}
        <DashboardLayout />
      </div>
    </AuthProvider>
  );
}
