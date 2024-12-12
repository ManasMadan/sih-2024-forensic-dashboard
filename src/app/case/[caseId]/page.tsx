import ImageCard from "@/components/ImageCard";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import React from "react";

export default async function page({ params }: { params: { caseId: string } }) {
  const caseId = parseInt(params.caseId);

  const images = await prisma.image.findMany({
    where: {
      caseId: caseId,
    },
  });

  return (
    <div>
      <Button asChild className="mb-5">
        <Link href={`/case/${caseId}/upload`}>Upload Image</Link>
      </Button>

      <div className="flex flex-wrap gap-6">
        {images.map((image) => (
          <ImageCard image={image} key={image.id} />
        ))}
      </div>
    </div>
  );
}
