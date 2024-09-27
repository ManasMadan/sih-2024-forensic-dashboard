"use server";

import { clerkClient } from "@clerk/nextjs/server";

export async function searchUsers(email: string) {
  try {
    const users = await clerkClient.users.getUserList({
      emailAddress: [email],
    });
    if (users.totalCount === 0) {
      return null;
    }

    return JSON.stringify(users.data[0]);
  } catch (error) {
    console.error("Error searching for users:", error);
    throw new Error("Failed to search for users");
  }
}
