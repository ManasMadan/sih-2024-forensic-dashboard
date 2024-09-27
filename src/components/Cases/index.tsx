import { Case } from "@prisma/client";
import React from "react";
import CaseCard from "./CaseCard";

export default function Cases({ cases }: { cases: Case[] }) {
  return (
    <main className="grid grid-cols-3 gap-12 px-12 py-6">
      {cases.map((caseItem) => (
        <CaseCard key={caseItem.id} caseItem={caseItem} />
      ))}
    </main>
  );
}
