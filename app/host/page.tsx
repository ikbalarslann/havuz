"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { CreatePropertyForm } from "@/components/host/create-property-form";

const HostHomePage = () => {
  const role = useCurrentRole();

  return (
    <div className="text-center">
      <h1 className="text-5xl">Host Home Page</h1>
      <h5 className="text-3xl"> users role is : {role}</h5>

      <CreatePropertyForm />
    </div>
  );
};

export default HostHomePage;
