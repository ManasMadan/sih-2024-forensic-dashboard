"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createPerson(personData: any, caseId: string) {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const createdPerson = await prisma.person.create({
      data: {
        ...personData,
        dateOfBirth: new Date(personData.dateOfBirth),
        caseId: parseInt(caseId),
      },
    });

    return createdPerson;
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function createVehicle(vehicleData: any, caseId: string) {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const createdVehicle = await prisma.vehicle.create({
      data: {
        ...vehicleData,
        caseId: parseInt(caseId),
      },
    });

    return createdVehicle;
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function createLocation(locationData: any, caseId: string) {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const createdLocation = await prisma.location.create({
      data: {
        ...locationData,
        caseId: parseInt(caseId),
      },
    });

    return createdLocation;
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
