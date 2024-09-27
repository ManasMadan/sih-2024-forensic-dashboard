// app/actions.js
"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createCase(caseData: any) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const createdCase = await prisma.case.create({
    data: {
      ...caseData,
      userId: {
        set: caseData.userId,
      },
    },
  });

  return createdCase;
}
