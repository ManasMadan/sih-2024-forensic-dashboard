import ImageCard from "@/components/ImageCard";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import axios from "axios";
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
      <Button asChild>
        <Link href={`/case/${caseId}/upload`}>Upload</Link>
      </Button>

      {images.map((image) => (
        <ImageCard image={image} key={image.id} />
      ))}
    </div>
  );
}
