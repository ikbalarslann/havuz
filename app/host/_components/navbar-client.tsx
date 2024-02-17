"use client";

import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@/components/auth/user-button";
import { LogoutButton } from "@/components/auth/logout-button";
import { useState } from "react";

export const NavbarClient = ({ property, className }: any) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`relative container m-0 p-0  ${className} `}>
      <div className="flex items-center justify-between mx-3 ">
        <div className="pt-2 text-5xl">
          <Link href="/host">
            <Image src="/logo.png" alt="logo" width={70} height={70} />
          </Link>
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
        className={`md:hidden z-50 sticky   ${
          isMenuOpen ? "block " : "hidden"
        }`}
      >
        <div
          id="menu"
          className={` absolute flex-col items-center pb-5  w-full    bg-gray-100 ${
            isMenuOpen ? "flex" : "hidden"
          }`}
        >
          <Link
            href="/host/bookings"
            className=" my-2 p-2 hover:bg-gray-300 rounded transition duration-300 w-full text-center mt-8"
            onClick={toggleMenu}
          >
            Bookings
          </Link>

          <Link
            href="/host/reviews"
            className="my-2 p-2 hover:bg-gray-300 rounded transition duration-300 w-full text-center"
            onClick={toggleMenu}
          >
            Reviews
          </Link>

          <Link
            href="/host/availability"
            className="my-2 p-2 hover:bg-gray-300 rounded transition duration-300 w-full text-center"
            onClick={toggleMenu}
          >
            Availability
          </Link>

          <LogoutButton>Logout</LogoutButton>
        </div>
      </div>
    </nav>
  );
};

export default NavbarClient;
