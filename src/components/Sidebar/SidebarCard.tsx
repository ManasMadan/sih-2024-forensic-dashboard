import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBarCard({
  link,
}: {
  link: { title: string; icon: React.ReactNode; link: string };
}) {
  const path = usePathname();

  const isActive = () => {
    if (link.link === "/") {
      return path === "/";
    }

    const linkParts = link.link.split("/");
    const pathParts = path.split("/");

    if (pathParts[1] === "case") {
      return link.link === path;
    }

    return linkParts.some((part, index) => part && part === pathParts[index]);
  };

  return (
    <Link
      href={link.link}
      className={cn("flex gap-4 py-4 px-6 rounded-lg", {
        "bg-secondary": isActive(),
      })}
    >
      {link.icon}
      {link.title}
    </Link>
  );
}
