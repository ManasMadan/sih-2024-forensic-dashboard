import { listLocations, listPeople, listVehicles } from "@/actions/profile";
import PersonCard from "@/components/DataSources/Profile/PersonCard";
import VehicleCard from "@/components/DataSources/Profile/VehicleCard";
import LocationCard from "@/components/DataSources/Profile/LocationCard";
import React from "react";
import { Separator } from "@/components/ui/separator";
import AddDataSourceButton from "@/components/DataSources/AddDataSourceButton";

export default async function page({ params }: { params: { caseId: string } }) {
  const { caseId: caseIdStr } = params;
  let caseId;
  try {
    caseId = parseInt(caseIdStr);
  } catch (e) {
    return <div>Invalid Case ID</div>;
  }

  const people = await listPeople(caseId);
  const vehicles = await listVehicles(caseId);
  const locations = await listLocations(caseId);
  if (!people || !vehicles || !locations) {
    throw new Error("Somehing went wrong");
  }

  return (
    <main className="space-y-8 p-6">
      <AddDataSourceButton caseId={params.caseId} />
      <section className="py-4">
        <h2 className="text-2xl font-bold mb-4">People</h2>
        <div className="flex flex-wrap gap-4">
          {people.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      </section>

      <Separator />

      <section className="py-4">
        <h2 className="text-2xl font-bold mb-4">Vehicles</h2>
        <div className="flex flex-wrap gap-4">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      <Separator />

      <section className="py-4">
        <h2 className="text-2xl font-bold mb-4">Locations</h2>
        <div className="flex flex-wrap gap-4">
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      </section>
    </main>
  );
}
