"use client";
import Link from "next/link";
import { useEffect } from "react";

const Header = ({ property }: any) => {
  useEffect(() => {
    const prop = JSON.stringify(property);

    localStorage.setItem("HostProperty", prop);
  }, [property]);

  return property ? (
    <p className="text-4xl text-cyan-900 text-center">{property.title}</p>
  ) : (
    <p className="text-4xl text-cyan-900">Havuz</p>
  );
};

export default Header;
