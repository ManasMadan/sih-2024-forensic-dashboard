import Cases from "@/components/Cases";
import prisma from "@/lib/prisma";
import React from "react";

export default async function Home({ params }: { params: { tag: string } }) {
  const cases = await prisma.case.findMany({
    where: { tags: { has: params.tag } },
  });

  return <Cases cases={cases} />;
}
