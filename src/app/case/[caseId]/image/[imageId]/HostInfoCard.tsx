import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type HostInfoProps = {
  data: {
    localHostName: string;
    productName: string;
    installDate: string;
    installVersion: string;
  };
};

export const HostInfoCard: React.FC<HostInfoProps> = ({ data }) => (
  <Card className="w-fit">
    <CardHeader>
      <CardTitle>Host Information</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <p>
        <strong>Local Host Name:</strong> {data.localHostName}
      </p>
      <p>
        <strong>Product Name:</strong> {data.productName}
      </p>
      <p>
        <strong>Install Date:</strong>{" "}
        {new Date(data.installDate).toLocaleString()}
      </p>
      <p>
        <strong>Installed Version:</strong> {data.installVersion}
      </p>
    </CardContent>
  </Card>
);
