"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { LoginButton } from "@/components/auth/login-button";
import { RegisterButton } from "@/components/auth/register-button";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";

export const Nav = () => {
  const pathname = usePathname();
  const role = useCurrentRole();

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[800px] shadow-sm">
      <div className="flex gap-x-2">
        <Button asChild variant={pathname === "/" ? "default" : "outline"}>
          <Link href="/">Home</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/shoppingCard" ? "default" : "outline"}
        >
          <Link href="/shoppingCard">Shopping Card</Link>
        </Button>

        <Button
          asChild
          variant={pathname === "/bookings" ? "default" : "outline"}
        >
          <Link href="/bookings">Bookings</Link>
        </Button>

        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">Settings</Link>
        </Button>
        {role !== "USER" && (
          <div className="ml-20 flex gap-2">
            <LoginButton asChild>
              <Button variant="outline">Login</Button>
            </LoginButton>
            <RegisterButton role={UserRole.USER} asChild>
              <Button variant="outline">Register</Button>
            </RegisterButton>
            <div className="ml-10 flex gap-2">
              <RegisterButton role={UserRole.ADMIN} asChild>
                <Button variant="outline">Host Register</Button>
              </RegisterButton>
            </div>
          </div>
        )}
      </div>
      <UserButton />
    </nav>
  );
};
