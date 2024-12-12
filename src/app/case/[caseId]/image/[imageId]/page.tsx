import React from "react";
import { HostInfoCard } from "./HostInfoCard";
import DownloadBulkExtractorCard from "./DownloadBulkExtractorCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: { caseId: string; imageId: string };
}) {
  const response = await fetch(
    `http://4.213.138.110:8000/get/${params.imageId}`,
    { cache: "no-cache" }
  );
  const data = await response.json();

  return (
    <div className="space-y-6">
      <HostInfoCard data={data} />
      <DownloadBulkExtractorCard imageId={params.imageId} />
      <div className="space-x-3">
        <Button asChild>
          <Link
            href={`/case/${params.caseId}/image/${params.imageId}/forensics`}
          >
            Timeline
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/case/${params.caseId}/image/${params.imageId}/loki`}>
            Loki
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/case/${params.caseId}/image/${params.imageId}/mitre`}>
            Mitre
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/case/${params.caseId}/image/${params.imageId}/yara`}>
            Yara
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/case/${params.caseId}/image/${params.imageId}/iocs`}>
            IOCs
          </Link>
        </Button>
      </div>
    </div>
  );
}
