import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Person } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { getSignedImageUrl } from "@/lib/s3";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default async function PersonCard({ person }: { person: Person }) {
  const thumbnailUrl = person.thumbnail
    ? await getSignedImageUrl(person.thumbnail)
    : null;

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>
          {person.firstName} {person.lastName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="h-[150px]">
          <AspectRatio ratio={16 / 9}>
            {thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
                alt={`${person.firstName} ${person.lastName}`}
                fill
                className="object-cover rounded-md"
              />
            ) : (
              <div className="border-2 text-secondary border-secondary rounded-md h-full w-full placeholder_image" />
            )}
          </AspectRatio>
        </div>
        <CardDescription>
          {person.description || "No Description"}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button asChild variant="outline">
          <Link href={`/case/${person.caseId}/person/${person.id}`}>
            View Person
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
