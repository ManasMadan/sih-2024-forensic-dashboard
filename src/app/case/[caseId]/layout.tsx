import React from "react";
import { getCase } from "@/actions/case";
import { auth } from "@clerk/nextjs/server";

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { caseId: string };
}) {
  const { userId } = auth();
  if (!userId) {
    return <div>You must be logged in to view this page</div>;
  }
  const caseData = await getCase(parseInt(params.caseId));
  if (!caseData) {
    return <div>Case not found</div>;
  }

  if (caseData.status === "PUBLIC" || caseData.userId.includes(userId)) {
    return children;
  } else {
    // TODO: Request Access to Case
    return <div>You are not authorized to view this page</div>;
  }
}
