"use client";
import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
// TODO: Collaboaration
export default function page({ params }: { params: { caseId: string } }) {
  return (
    <main style={{ height: "100%" }}>
      <Tldraw persistenceKey={params.caseId} />
    </main>
  );
}
