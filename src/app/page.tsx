import Cases from "@/components/Cases";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";

export default async function Home() {
  const { userId } = auth();
  const cases = await prisma.case.findMany({
    where: { AND: { userId: { has: userId }, status: "ACTIVE" } },
  });

  return <Cases cases={cases} />;
}
