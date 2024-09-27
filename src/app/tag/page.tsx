import TagItem from "@/components/Cases/TagItem";
import tagsData from "@/lib/tags";
import React from "react";

export default function page() {
  return (
    <main className="flex gap-x-6 gap-y-3 flex-wrap px-4 py-8">
      {tagsData.map((tag: string) => (
        <TagItem tag={tag} />
      ))}
    </main>
  );
}
