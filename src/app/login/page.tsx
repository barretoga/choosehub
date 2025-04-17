import { Metadata } from "next";
import { LoginForm } from "~/components/login-form";

export const metadata: Metadata = {
  title: "Choosehub - Sign in",
  description:
    "Cultural content recommendation platform based on genre. Find new movies, music, and books that match your tastes.",
  keywords: [
    "cultural recommendations",
    "discover movies",
    "find music",
    "book suggestions",
    "cultural platform",
  ],
  openGraph: {
    images: ["/favicon.ico"],
  },
  icons: {
    icon: "/favicon-32x32.png",
  },
};

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
