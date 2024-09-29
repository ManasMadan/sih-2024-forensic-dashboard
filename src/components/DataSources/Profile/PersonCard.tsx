import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Person } from "@prisma/client";
import React from "react";

export default function PersonCard({ person }: { person: Person }) {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>
            {person.firstName} {person.lastName}
          </span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
