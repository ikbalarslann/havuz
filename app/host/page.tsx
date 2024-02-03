"use client";

import { CreatePropertyForm } from "@/components/host/create-property-form";
import { EditPropertyForm } from "@/components/host/edit-property-form";
import { useEffect, useState } from "react";

const HostHomePage = () => {
  const [property, setProperty] = useState();

  useEffect(() => {
    const propertyHostString = localStorage.getItem("HostProperty");
    const propertyHost = propertyHostString && JSON.parse(propertyHostString);
    setProperty(propertyHost);
  }, []);

  return (
    <div className="text-center">
      {property ? <EditPropertyForm /> : <CreatePropertyForm />}
    </div>
  );
};

export default HostHomePage;
