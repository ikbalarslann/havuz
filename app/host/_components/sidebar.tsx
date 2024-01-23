"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-gray-400 h-full w-[250px] p-4  shadow-sm flex flex-col items-center ">
      <Link href="/host">Home</Link>
      <Link href="/host/bookings">Bookings</Link>
      <Link href="/host/avaliability">Avaliability</Link>
      <Link href="/host/analytics">Analytics</Link>
    </aside>
  );
};
