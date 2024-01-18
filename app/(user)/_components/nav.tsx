"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { LoginButton } from "@/components/auth/login-button";
import { RegisterButton } from "@/components/auth/register-button";

export const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[800px] shadow-sm">
      <div className="flex gap-x-2">
        <Button asChild variant={pathname === "/" ? "default" : "outline"}>
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant={pathname === "/about" ? "default" : "outline"}>
          <Link href="/about">About</Link>
        </Button>

        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">Settings</Link>
        </Button>
        <div className="ml-20 flex gap-2">
          <LoginButton asChild>
            <Button variant="outline">Login</Button>
          </LoginButton>
          <RegisterButton asChild>
            <Button variant="outline">Register</Button>
          </RegisterButton>
        </div>
      </div>
      <UserButton />
    </nav>
  );
};
