"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { LoginButton } from "@/components/auth/login-button";
import { RegisterButton } from "@/components/auth/register-button";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { LoginButtonDropDown } from "@/components/user/login-button";

export const Nav = () => {
  const pathname = usePathname();
  const role = useCurrentRole();

  return (
    <nav className="bg-secondary flex justify-between items-center p-4  w-full shadow-sm">
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
        {!role && <LoginButtonDropDown />}
      </div>
      <UserButton />
    </nav>
  );
};
