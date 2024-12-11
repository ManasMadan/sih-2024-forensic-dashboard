"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

export async function createImage(imageData: any) {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const createdImage = await prisma.image.create({
      data: imageData,
    });

    return createdImage;
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
