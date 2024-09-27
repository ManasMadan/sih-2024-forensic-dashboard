"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function TagItem({ tag }: { tag: string }) {
  return (
    <Link href={`/tag/${tag}`}>
      <Badge onClick={(e) => e.stopPropagation()}>{tag}</Badge>
    </Link>
  );
}
