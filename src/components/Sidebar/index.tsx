import {
  BellIcon,
  GroupIcon,
  LockIcon,
  PlusCircleIcon,
  TagsIcon,
  UnlockIcon,
  UserIcon,
} from "lucide-react";
import React from "react";
import SideBarCard from "./SidebarCard";
import { Button } from "../ui/button";
import Link from "next/link";

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
    title: "Public Cases",
    icon: <GroupIcon />,
    link: "/public-cases",
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
  {
    title: "Cases by tags",
    icon: <TagsIcon />,
    link: "/tag",
  },
];

export default function Sidebar() {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-y-4 py-6 px-6">
        {links.map((link) => (
          <SideBarCard link={link} key={link.link} />
        ))}
      </div>
      <Button asChild variant="secondary" className="flex gap-3 mx-6 py-3 my-6">
        <Link href="/case/new">
          <PlusCircleIcon />
          Create Case
        </Link>
      </Button>
    </div>
  );
}
