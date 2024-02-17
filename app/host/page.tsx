"use client";

import { CreatePropertyForm } from "@/components/host/create-property-form";
import { useEffect, useState } from "react";

const HostHomePage = () => {
  const [property, setProperty] = useState();

  useEffect(() => {
    const propertyHostString = localStorage.getItem("HostProperty");
    const propertyHost = propertyHostString && JSON.parse(propertyHostString);
    setProperty(propertyHost);
  }, []);

  if (property) {
    window.location.href = "/host/bookings";
  }

  return (
    <div className="text-center">
      {property ? "property already exists" : <CreatePropertyForm />}
    </div>
  );
};

export default HostHomePage;
