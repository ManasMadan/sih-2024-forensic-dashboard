import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Location } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { getSignedImageUrl } from "@/lib/s3";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default async function LocationCard({
  location,
}: {
  location: Location;
}) {
  const thumbnailUrl = location.thumbnail
    ? await getSignedImageUrl(location.thumbnail)
    : null;

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>{location.name}</CardTitle>
        <CardDescription>{location.address}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="h-[150px]">
          <AspectRatio ratio={16 / 9}>
            {thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
                alt={location.name}
                fill
                className="object-cover rounded-md"
              />
            ) : (
              <div className="border-2 text-secondary border-secondary rounded-md h-full w-full grid place-items-center">
                No Thumbnail
              </div>
            )}
          </AspectRatio>
        </div>
        <CardDescription>{location.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button asChild variant="outline">
          <Link
            href={`/case/${location.caseId}/profiles/location/${location.id}`}
          >
            View Location
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
