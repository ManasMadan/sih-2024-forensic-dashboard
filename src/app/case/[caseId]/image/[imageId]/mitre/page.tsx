import React from "react";
import MitreReportsTable from "../MitreReports";

export default function page({ params }: { params: { imageId: string } }) {
  return <MitreReportsTable imageId={params.imageId} />;
}
