"use server";

import prisma from "@/lib/prisma";
import { uploadImageToS3 } from "@/lib/s3";
import { auth } from "@clerk/nextjs/server";

export async function createPerson(personData: any, caseId: string) {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    if (personData.thumbnail && personData.thumbnail.startsWith("data:image")) {
      const key = `thumbnails/${Date.now()}-${personData.firstName}-${
        personData.lastName
      }`;
      const res = await uploadImageToS3(personData.thumbnail, key);
      personData.thumbnail = res;
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

    if (
      vehicleData.thumbnail &&
      vehicleData.thumbnail.startsWith("data:image")
    ) {
      const key = `thumbnails/${Date.now()}-${vehicleData.model}-${
        vehicleData.make
      }`;
      const res = await uploadImageToS3(vehicleData.thumbnail, key);
      vehicleData.thumbnail = res;
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

    if (
      locationData.thumbnail &&
      locationData.thumbnail.startsWith("data:image")
    ) {
      const key = `thumbnails/${Date.now()}-${locationData.name}-${
        locationData.latitude
      }-${locationData.longitude}`;
      const res = await uploadImageToS3(locationData.thumbnail, key);
      locationData.thumbnail = res;
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

export async function listLocations(caseId: number) {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const locations = await prisma.location.findMany({
      where: {
        caseId: caseId,
      },
    });

    return locations;
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function listVehicles(caseId: number) {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const vehicles = await prisma.vehicle.findMany({
      where: {
        caseId: caseId,
      },
    });

    return vehicles;
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function listPeople(caseId: number) {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const people = await prisma.person.findMany({
      where: {
        caseId: caseId,
      },
    });

    return people;
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
