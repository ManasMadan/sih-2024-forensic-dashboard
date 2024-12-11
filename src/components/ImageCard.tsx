"use client";
import React, { useState } from "react";
import { Card, CardFooter, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";

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
      const response = await axios.post("http://4.213.138.110:5000/process", {
        id: image.id,
        imageName: image.name,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      } else {
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
    <Card>
      <CardTitle>{image.name}</CardTitle>
      <CardFooter>
        <Button onClick={handleProcess} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Start Processing"}
        </Button>
      </CardFooter>
    </Card>
  );
}
