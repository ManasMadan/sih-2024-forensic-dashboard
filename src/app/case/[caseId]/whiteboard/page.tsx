"use client";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
export default function page({ params }: { params: { caseId: string } }) {
  // TODO: Collaboaration
  return (
    <main style={{ height: "100%" }}>
      <Tldraw persistenceKey={params.caseId} />
    </main>
  );
}
