import React from "react";
import LokiReportTable from "@/components/LokiReportTable";

export default function page({ params }: { params: { imageId: string } }) {
  return <LokiReportTable imageId={params.imageId} />;
}
