"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function TagItem({ tag }: { tag: string }) {
  return (
    <Link href={`/tag/${tag}`} onClick={(e) => e.stopPropagation()}>
      <Badge>{tag}</Badge>
    </Link>
  );
}
