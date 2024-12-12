"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import axios from "axios";
import React from "react";

export default function DownloadBulkExtractorCard({
  imageId,
}: {
  imageId: string;
}) {
  const handleDownload = async () => {
    try {
      const response = await fetch(
        `http://4.213.138.110:5000/download_folder/${imageId}`,
        { cache: "no-cache" }
      );

      if (!response.ok) {
        throw new Error("Failed to download the folder");
      }

      const blob = await response.blob();

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `folder_${imageId}.zip`; // Set the name of the downloaded file
      link.click(); // Trigger the download

      // Clean up the created URL object after download
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the folder:", error);
    }
  };

  return (
    <Card className="w-fit">
      <CardHeader>
        Download Bulk Extractor
        <CardDescription>
          You can Open this Folder in BE Viewer Software for low level analysis
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={handleDownload}>Download Folder</Button>
      </CardFooter>
    </Card>
  );
}
