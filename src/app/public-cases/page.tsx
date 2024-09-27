import Cases from "@/components/Cases";
import prisma from "@/lib/prisma";
import React from "react";

export default async function page() {
  const cases = await prisma.case.findMany({
    where: { status: "PUBLIC" },
  });

  return <Cases cases={cases} />;
}
