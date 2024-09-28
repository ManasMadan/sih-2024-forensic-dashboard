"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createCase(caseData: any) {
  try {
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
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getCase(caseId: number) {
  try {
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
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function updateCase(caseId: number, caseData: any) {
  try {
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
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
