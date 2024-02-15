"use client";

import Link from "next/link";
import { UserButton } from "@/components/auth/user-button";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useState } from "react";
import Image from "next/image";

export const Nav = () => {
  const role = useCurrentRole();

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative container   ">
      <div className="flex items-center justify-between ">
        <div className="pt-2 text-5xl">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={70} height={70} />
          </Link>
        </div>
        <div className="hidden space-x-6 md:flex">
          <Link href="/shoppingCard" className="text-xl">
            Shopping Card
          </Link>

          {role && (
            <Link href="/bookings" className="text-xl">
              Bookings
            </Link>
          )}

          <div className="pl-32">
            <UserButton />
          </div>
        </div>

        {/* hamburger icon */}
        <div className="md:hidden">
          <button
            id="menu-btn"
            className={` block hamburger  focus:outline-none ${
              isMenuOpen ? "open" : ""
            }`}
            onClick={toggleMenu}
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        </div>
      </div>
      <div
        className={`md:hidden z-50 sticky  ${isMenuOpen ? "block " : "hidden"}`}
      >
        <div
          id="menu"
          className={`absolute flex-col items-center  self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md ${
            isMenuOpen ? "flex" : "hidden"
          }`}
        >
          <Link onClick={toggleMenu} href="/shoppingCard">
            Shopping Card
          </Link>

          {role && (
            <Link onClick={toggleMenu} href="/bookings">
              Bookings
            </Link>
          )}

          <UserButton toggleMenu={toggleMenu} />
        </div>
      </div>
    </nav>

    // <nav className="bg-secondary flex justify-between items-center p-4  w-full shadow-sm">
    //   <div className="flex gap-x-2">
    //     <Button asChild variant={pathname === "/" ? "default" : "outline"}>
    //       <Link href="/">Home</Link>
    //     </Button>
    //     <Button
    //       asChild
    //       variant={pathname === "/shoppingCard" ? "default" : "outline"}
    //     >
    //       <Link href="/shoppingCard">Shopping Card</Link>
    //     </Button>

    //     {role && (
    //       <>
    //         <Button
    //           asChild
    //           variant={pathname === "/bookings" ? "default" : "outline"}
    //         >
    //           <Link href="/bookings">Bookings</Link>
    //         </Button>

    //         <Button
    //           asChild
    //           variant={pathname === "/settings" ? "default" : "outline"}
    //         >
    //           <Link href="/settings">Settings</Link>
    //         </Button>
    //       </>
    //     )}
    //   </div>
    //   <div>
    //     {!role && <LoginButtonDropDown />}
    //     <UserButton />
    //   </div>
    // </nav>
  );
};
