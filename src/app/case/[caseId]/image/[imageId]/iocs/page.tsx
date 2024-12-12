"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";

const IocAndIsolationForest: React.FC = () => {
  const [iocs, setIocs] = useState<any>(null);
  const [isolationForestResult, setIsolationForestResult] = useState<any>(null);

  useEffect(() => {
    const fetchIocs = async () => {
      try {
        const response = await fetch(`http://4.213.138.110:8000/check-iocs`);
        const data = await response.json();
        setIocs(data);
      } catch (error) {
        console.error("Error fetching IOC data:", error);
      }
    };

    const fetchIsolationForestResult = async () => {
      try {
        const response = await fetch(
          `http://4.213.138.110:8000/run-isolation-forest`
        );
        const data = await response.json();
        setIsolationForestResult(data);
      } catch (error) {
        console.error("Error fetching Isolation Forest result:", error);
      }
    };

    fetchIocs();
    fetchIsolationForestResult();
  }, []);

  return (
    <div className="p-6">
      {/* IOC Table */}
      <h3 className="text-xl font-semibold mb-4">
        Indicators of Compromise (IOC)
      </h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Source Path</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>IOC</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {iocs && (
            <>
              {/* File Hashes */}
              {Object.entries(iocs.file_hashes).map(
                ([fileHash, isDetected]) => (
                  <TableRow key={fileHash}>
                    <TableCell>File Hashes</TableCell>
                    <TableCell>{fileHash}</TableCell>
                    <TableCell>{isDetected ? "Yes" : "No"}</TableCell>
                  </TableRow>
                )
              )}

              {/* IPs */}
              {Object.entries(iocs.ips).map(([ip, isDetected]) => (
                <TableRow key={ip}>
                  <TableCell>IP</TableCell>
                  <TableCell>{ip}</TableCell>
                  <TableCell>{isDetected ? "Yes" : "No"}</TableCell>
                </TableRow>
              ))}

              {/* URLs */}
              {Object.entries(iocs.urls).map(([url, isDetected]) => (
                <TableRow key={url}>
                  <TableCell>URL</TableCell>
                  <TableCell>{url}</TableCell>
                  <TableCell>{isDetected ? "Yes" : "No"}</TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>

      {/* Isolation Forest Results */}
      {isolationForestResult && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">
            Isolation Forest Prediction
          </h3>
          <div>
            <p>
              <strong>Input Features:</strong>{" "}
              {isolationForestResult.input_features.join(", ")}
            </p>
            <p>
              <strong>Prediction:</strong> {isolationForestResult.prediction}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IocAndIsolationForest;
