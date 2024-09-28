import React from "react";

export default function page({ params }: { params: { caseId: string } }) {
  return (
    <div>
      <h1>Case {params.caseId}</h1>
    </div>
  );
}
