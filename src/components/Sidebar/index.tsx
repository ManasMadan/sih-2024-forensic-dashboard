import { BellIcon, LockIcon, UnlockIcon, UserIcon } from "lucide-react";
import React from "react";
import SideBarCard from "./SidebarCard";

const links = [
  {
    title: "Open Cases",
    icon: <UnlockIcon />,
    link: "/",
  },
  {
    title: "Closed Cases",
    icon: <LockIcon />,
    link: "/closed-cases",
  },
  {
    title: "Alerts",
    icon: <BellIcon />,
    link: "/alerts",
  },
  {
    title: "User Profile",
    icon: <UserIcon />,
    link: "/profile",
  },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-y-4 py-6 px-6">
      {links.map((link) => (
        <SideBarCard link={link} key={link.link} />
      ))}
    </div>
  );
}
