import { UserButton } from "@clerk/nextjs";
import React from "react";
import DarkModeToggle from "./Theme/DarkModeToggle";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 border-b border-b-slate-200 dark:border-b-slate-700">
      <h1 className="text-lg sm:text-2xl">Forensics Dashboard</h1>
      <div className="flex gap-4 items-center">
        <DarkModeToggle />
        <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
      </div>
    </nav>
  );
}
