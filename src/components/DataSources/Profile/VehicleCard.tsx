import { Vehicle } from "@prisma/client";
import React from "react";

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return <div>{vehicle.id}</div>;
}
