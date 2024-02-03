"use client";
import Link from "next/link";
import { useEffect } from "react";

const Header = ({ property }: any) => {
  useEffect(() => {
    const prop = JSON.stringify(property);

    localStorage.setItem("HostProperty", prop);
  }, []);

  return property ? (
    <Link href="/host">
      <p className="text-4xl text-blue-800">{property.title}</p>
    </Link>
  ) : (
    <p className="text-4xl text-blue-800">Havuz</p>
  );
};

export default Header;
