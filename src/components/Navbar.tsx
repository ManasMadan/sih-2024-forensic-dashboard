import { UserButton } from "@clerk/nextjs";
import React from "react";
import DarkModeToggle from "./Theme/DarkModeToggle";
import { Input } from "./ui/input";
import { BellIcon, SearchIcon } from "lucide-react";
import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Badge } from "./ui/badge";

export default async function Navbar() {
  const { userId } = auth();
  const notificationsCount = await prisma.userNotification.count({
    where: { userId: { equals: userId! } },
  });
  const user = await currentUser();
  return (
    <nav className="flex justify-between items-center p-4 border-b border-b-slate-200 dark:border-b-slate-700">
      <h1 className="text-lg sm:text-2xl">Forensics Dashboard</h1>
      <div className="flex items-center border-2 border-secondary rounded-full px-4">
        <SearchIcon />
        <Input
          className="w-[650px] rounded-full border-none"
          placeholder="Search Cases"
        />
      </div>
      <div className="flex gap-4 items-center">
        <div className="rounded-full w-[2.6rem] relative h-[2.6rem] flex justify-center items-center">
          <BellIcon />
          <Badge className="absolute top-0 right-0 rounded-full w-2 aspect-square flex justify-center items-center">
            {notificationsCount}
          </Badge>
        </div>
        <DarkModeToggle />
        <div className="flex gap-2 items-center">
          <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
          {user?.fullName}
        </div>
      </div>
    </nav>
  );
}
