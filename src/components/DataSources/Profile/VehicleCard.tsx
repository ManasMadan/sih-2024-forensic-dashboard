import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Vehicle } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { getSignedImageUrl } from "@/lib/s3";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default async function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const thumbnailUrl = vehicle.thumbnail
    ? await getSignedImageUrl(vehicle.thumbnail)
    : null;

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>
          {vehicle.make} {vehicle.model}
        </CardTitle>
        <CardDescription>
          {vehicle.color}, {vehicle.year}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="h-[150px]">
          <AspectRatio ratio={16 / 9}>
            {thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
                alt={`${vehicle.make} ${vehicle.model}`}
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
        <CardDescription>{vehicle.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button asChild variant="outline">
          <Link href={`/vehicle/${vehicle.id}`}>View Vehicle</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
