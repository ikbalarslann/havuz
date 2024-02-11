import Settings from "@/components/user/settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "This is where you can update your account settings.",
};

const SettingsPage = () => {
  return <Settings />;
};

export default SettingsPage;
