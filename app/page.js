'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push("/dashboard");
  }, [session, router]);

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <nav className="w-full flex justify-between items-center px-8 py-4 border-b bg-background">
        <div className="font-bold text-xl rounded-full px-3 py-1 border bg-gradient-to-tr from-blue-500 to-purple-600 text-white shadow-lg">
          ByteSend
        </div>
        <div className="flex gap-3">
          <Button className="text-lg px-5 py-5 rounded-xl shadow-md" variant="outline" asChild>
            <Link href="/api/auth/signin">Sign Up</Link>
          </Button>
          <Button className="text-lg px-5 py-3 rounded-xl shadow-md"
          size="lg" onClick={() => signIn("google") }>Login</Button>
        </div>
      </nav>
      <main className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-700 text-transparent bg-clip-text py-5">
          Your Secure Cloud File Sharing Platform
        </h1>
        <p className="text-muted-foreground text-lg md:text-2xl max-w-2xl mb-10">
          Effortlessly upload, manage, and share your files.<br />
          Fast. Private. Reliable.
        </p>
        <Button
          className="text-lg px-8 py-3 rounded-xl shadow-md"
          size="lg"
          onClick={() => signIn("google")}
        >
          Get Started
        </Button>
      </main>
    </div>
  );
}