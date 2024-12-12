import axios from "axios";
import React from "react";
import { HostInfoCard } from "./HostInfoCard";

export default async function page({
  params,
}: {
  params: { caseId: string; imageId: string };
}) {
  // const response = await fetch(
  //   `http://4.213.138.110:5000/get/${params.imageId}`,
  //   { cache: "no-cache" }
  // );
  // const data = await response.json();
  const data = {
    hostInfo: {
      localHostName: "desktop-uo05n3b",
      productName: "Windows 10 Pro",
      installDate: "2020-10-22T13:28:39.0000000Z",
      installVersion: "10.0",
    },
    menuData: [],
  };
  return (
    <div className="space-y-6">
      <HostInfoCard data={data.hostInfo} />
    </div>
  );
}
