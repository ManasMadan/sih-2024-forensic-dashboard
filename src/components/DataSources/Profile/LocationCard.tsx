import { Location } from "@prisma/client";
import React from "react";

export default function LocationCard({ location }: { location: Location }) {
  return <div>{location.id}</div>;
}
