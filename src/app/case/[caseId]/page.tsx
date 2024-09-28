import React from "react";
import AddDataSourceButton from "@/components/DataSources/AddDataSourceButton";

export default function Page({ params }: { params: { caseId: string } }) {
  return (
    <main className="p-6">
      <AddDataSourceButton caseId={params.caseId} />
    </main>
  );
}
