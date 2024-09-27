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
import Link from "next/link";

export default function CaseCard({ caseItem }: { caseItem: Case }) {
  return (
    <Link href={`/case/${caseItem.id}`}>
      <Card className="w-[350px] h-full min-h-[175px]">
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
        <CardFooter className="flex gap-4">
          {caseItem.tags.map((tag, index) => (
            <Badge key={index}>{tag}</Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
}
