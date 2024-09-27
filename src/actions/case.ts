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

export async function getCase(caseId: number) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const caseD = await prisma.case.findUnique({
    where: {
      id: caseId,
    },
  });

  return caseD;
}

export async function updateCase(caseId: number, caseData: any) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const caseD = await prisma.case.update({
    where: {
      id: caseId,
    },
    data: {
      ...caseData,
    },
  });

  return caseD;
}
