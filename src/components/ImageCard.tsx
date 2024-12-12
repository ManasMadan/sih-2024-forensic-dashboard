"use client";
import React, { useState } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { processedImage } from "@/actions/image";
import Link from "next/link";

export default function ImageCard({
  image,
}: {
  image: {
    name: string;
    id: number;
    caseId: number;
    createdAt: Date;
    updatedAt: Date;
  };
}) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.post("http://4.213.138.110:8000/process", {
        id: image.id,
        imageName: image.name,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      } else {
        await processedImage(image.id);
        toast.success("Image processed successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to process image");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="max-w-fit">
      <CardHeader>{image.name}</CardHeader>
      <CardFooter className="space-x-4">
        <Button onClick={handleProcess} disabled={isProcessing}>
          {isProcessing
            ? "Processing..."
            : !image.processed
            ? "Start Processing"
            : "Process Image Again"}
        </Button>
        <Button asChild disabled={!image.processed}>
          <Link href={`/case/${image.caseId}/image/${image.id}`}>
            See Analytics
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
