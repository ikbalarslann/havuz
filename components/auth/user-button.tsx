"use client";

import { ExitIcon } from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import Link from "next/link";
import { UserRole } from "@prisma/client";
import { LoginButton } from "@/components/auth/login-button";
import { RegisterButton } from "@/components/auth/register-button";
import { useEffect, useState } from "react";

export const UserButton = ({ toggleMenu }: any) => {
  const user = useCurrentUser();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onClick = () => {
    if (!isDesktop) {
      toggleMenu();
    }
  };

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-lg text-gray-700">
        {user?.name}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-screen" align="end">
        <Link href="/settings">
          <DropdownMenuItem onClick={onClick}>Settings</DropdownMenuItem>
        </Link>
        <LogoutButton>
          <DropdownMenuItem onClick={onClick}>
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger>Login</DropdownMenuTrigger>
      <DropdownMenuContent className="w-screen">
        <DropdownMenuGroup>
          <LoginButton asChild>
            <DropdownMenuItem onClick={onClick}>Login</DropdownMenuItem>
          </LoginButton>
          <RegisterButton role={UserRole.USER} asChild>
            <DropdownMenuItem onClick={onClick}>Register</DropdownMenuItem>
          </RegisterButton>
          <RegisterButton role={UserRole.ADMIN} asChild>
            <DropdownMenuItem onClick={onClick}>Host Register</DropdownMenuItem>
          </RegisterButton>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
