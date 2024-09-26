import { UserProfile } from "@clerk/nextjs";
import React from "react";

export default function page() {
  return (
    <main className="grid place-items-center h-full">
      <UserProfile />
    </main>
  );
}
