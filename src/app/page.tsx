import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Choosehub - Discover New Content by Genre",
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

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <nav className="flex items-center justify-between p-6">
        <Image src="/logo.png" alt="Choosehub Logo" width={90} height={40} />

        <a href="/login">
          <Button variant="default" size="lg">
            Access Platform
          </Button>
        </a>
      </nav>

      <main className="container px-4 py-20 mx-auto text-center">
        <Card className="p-8 mb-16 space-y-8 backdrop-blur-sm bg-background/80">
          <h1 className="text-5xl font-bold tracking-tight">
            Discover Amazing Content
            <span className="block mt-4 text-primary">Based on Your Taste</span>
          </h1>

          <p className="text-xl text-muted-foreground">
            Enter your favorite movies, music, and books and receive
            personalized recommendations
          </p>

          <div className="flex justify-center gap-4">
            <a href="/register">
              <Button size="lg">Get Started Now</Button>
            </a>
          </div>
        </Card>

        <section className="grid gap-8 md:grid-cols-3">
          <Card className="p-6">
            <h3 className="mb-4 text-2xl font-semibold">Multi-genre</h3>
            <p className="text-muted-foreground">
              Supports various types of content: movies, music, literature, and
              more
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 text-2xl font-semibold">
              Smart Recommendations
            </h3>
            <p className="text-muted-foreground">
              Algorithm that learns from your preferences to suggest new items
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4 text-2xl font-semibold">Community</h3>
            <p className="text-muted-foreground">
              Share discoveries and see what others are consuming
            </p>
          </Card>
        </section>
      </main>

      <footer className="w-full py-8 text-center border-t">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Choosehub - All rights reserved
        </p>
      </footer>
    </div>
  );
}
