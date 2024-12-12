import React from "react";
import ForensicTimeline from "../ForensicReport";

export default function page({ params }: { params: { imageId: string } }) {
  return <ForensicTimeline imageId={params.imageId} />;
}
