"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";

export const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[400px] shadow-sm">
      <div className="flex gap-x-2">
        <Button asChild variant={pathname === "/host" ? "default" : "outline"}>
          <Link href="/host">Home</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/host/about" ? "default" : "outline"}
        >
          <Link href="/host/about">About</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
