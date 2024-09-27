"use client";

import {
  BellIcon,
  GroupIcon,
  HomeIcon,
  LockIcon,
  PlusCircleIcon,
  SettingsIcon,
  TagsIcon,
  UnlockIcon,
  UserIcon,
} from "lucide-react";
import React from "react";
import SideBarCard from "./SidebarCard";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Link {
  title: string;
  icon: React.ReactNode;
  link: string;
}

function generateLinks(path: string) {
  const casePathRegex = /^\/case\/(\d+)(\/.*)?$/;
  const match = path.match(casePathRegex);
  let links;

  if (match) {
    const caseId = match[1];
    links = [
      {
        title: "Home",
        icon: <HomeIcon />,
        link: `/case/${caseId}`,
      },
      {
        title: "Settings",
        icon: <SettingsIcon />,
        link: `/case/${caseId}/settings`,
      },
    ];
  } else {
    links = [
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
        title: "Cases by tags",
        icon: <TagsIcon />,
        link: "/tag",
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
  }

  return { isCaseRoute: match, links };
}

export default function Sidebar() {
  const path = usePathname();
  const { isCaseRoute, links } = generateLinks(path);

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-y-4 py-6 px-6">
        {links.map((link) => (
          <SideBarCard link={link} key={link.link} />
        ))}
      </div>
      {!isCaseRoute && (
        <Button
          asChild
          variant="secondary"
          className="flex gap-3 mx-6 py-3 my-6"
        >
          <Link href="/case/new">
            <PlusCircleIcon />
            Create Case
          </Link>
        </Button>
      )}
    </div>
  );
}
