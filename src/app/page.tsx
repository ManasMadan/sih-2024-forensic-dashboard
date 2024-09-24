import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { CaseStatus } from "@prisma/client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  const { userId } = auth();
  const cases = await prisma.case.findMany({
    where: { userId: { has: userId } },
  });

  return (
    <main className="grid grid-cols-4 gap-12 px-12 py-6">
      {[
        ...cases,
        ...cases,
        ...cases,
        ...cases,
        ...cases,
        ...cases,
        ...cases,
        ...cases,
        ...cases,
        ...cases,
        ...cases,
        ...cases,
        ...cases,
        ...cases,
        ...cases,
        ...cases,
        ...cases,
        ...cases,
        ...cases,
        ...cases,
        ...cases,
        ...cases,
        ...cases,
        ...cases,
      ].map((caseItem) => (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="flex flex-col gap-2">
              <Badge
                variant={
                  caseItem.status === CaseStatus.ACTIVE
                    ? "default"
                    : "destructive"
                }
                className="w-fit"
              >
                {caseItem.status}
              </Badge>
              <p>{caseItem.name}</p>
            </CardTitle>
            <CardDescription className="text-gray-400">
              {caseItem.description}
            </CardDescription>
          </CardHeader>
          <CardContent>Tags</CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      ))}
    </main>
  );
}
