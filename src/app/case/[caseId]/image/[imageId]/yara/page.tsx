import React from "react";
import RunYaraScan from "@/components/Yara";

export default function page({ params }: { params: { imageId: string } }) {
  return <RunYaraScan imageId={params.imageId} />;
}
