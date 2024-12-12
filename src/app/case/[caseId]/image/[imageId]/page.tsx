import React from "react";
import { HostInfoCard } from "./HostInfoCard";
import DownloadBulkExtractorCard from "./DownloadBulkExtractorCard";
import MitreReportsTable from "./MitreReports";

export default async function page({
  params,
}: {
  params: { caseId: string; imageId: string };
}) {
  const response = await fetch(
    `http://4.213.138.110:5000/get/${params.imageId}`,
    { cache: "no-cache" }
  );
  const data = await response.json();

  return (
    <div className="space-y-6">
      <HostInfoCard data={data} />
      <DownloadBulkExtractorCard imageId={params.imageId} />
      <MitreReportsTable imageId={params.imageId} />
    </div>
  );
}
