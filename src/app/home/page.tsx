import { Metadata } from "next";
import { Graph } from "~/components";

export const metadata: Metadata = {
  title: "Choosehub - Dashboard",
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
  return <Graph />;
}
