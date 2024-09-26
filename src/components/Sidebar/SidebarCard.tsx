"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBarCard({
  link,
}: {
  link: { title: string; icon: React.ReactNode; link: string };
}) {
  const path = usePathname();
  const active = path.split("/")[1] === link.link.split("/")[1];

  return (
    <Link
      href={link.link}
      className={cn("flex gap-4 py-4 px-6 rounded-lg", {
        "bg-secondary": active,
      })}
    >
      {link.icon}
      {link.title}
    </Link>
  );
}
