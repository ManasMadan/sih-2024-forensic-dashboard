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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import TagItem from "./TagItem";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRightCircleIcon } from "lucide-react";

export default function CaseCard({ caseItem }: { caseItem: Case }) {
  return (
    <Card className="w-[350px] h-full min-h-[175px]">
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
        <CardDescription className="text-gray-400 ">
          {caseItem.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2 flex-wrap">
        {caseItem.tags.slice(0, 2).map((tag, index) => (
          <TagItem key={index} tag={tag} />
        ))}
        {caseItem.tags.length > 2 && (
          <HoverCard>
            <HoverCardTrigger asChild>
              <Badge variant="secondary">+{caseItem.tags.length - 2}</Badge>
            </HoverCardTrigger>
            <HoverCardContent className="flex gap-2 flex-wrap">
              {caseItem.tags.slice(2).map((tag, index) => (
                <TagItem key={index} tag={tag} />
              ))}
            </HoverCardContent>
          </HoverCard>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button asChild variant="outline">
          <Link className="flex gap-2" href={`/case/${caseItem.id}`}>
            View Case
            <ArrowRightCircleIcon />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
