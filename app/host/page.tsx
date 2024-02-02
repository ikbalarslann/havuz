"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { CreatePropertyForm } from "@/components/host/create-property-form";

const HostHomePage = () => {
  const role = useCurrentRole();

  return (
    <div className="text-center">
      <CreatePropertyForm />
    </div>
  );
};

export default HostHomePage;
