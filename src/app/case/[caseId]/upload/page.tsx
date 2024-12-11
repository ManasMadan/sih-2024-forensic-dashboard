import ImageUploadForm from "@/components/UploadImage";
import React from "react";

// TODO Add Progress and upload from s3

export default function page({ params }: { params: { caseId: string } }) {
  const caseId = parseInt(params.caseId);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Upload Image for Case</h1>
      <ImageUploadForm caseId={caseId} />
    </div>
  );
}
