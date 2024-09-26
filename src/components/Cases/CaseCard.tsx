import { Case, CaseStatus } from "@prisma/client";
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

export default function CaseCard({ caseItem }: { caseItem: Case }) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex flex-col gap-2">
          <Badge
            variant={
              caseItem.status === CaseStatus.ACTIVE ? "default" : "destructive"
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
  );
}
