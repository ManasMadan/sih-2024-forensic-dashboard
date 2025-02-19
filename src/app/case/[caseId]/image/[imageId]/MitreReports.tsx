"use client";

import { Input } from "@/components/ui/input";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  TableHeader,
} from "@/components/ui/table";
import { useState, useEffect } from "react";

interface MitreReport {
  [key: string]: {
    summary: string;
    details: string;
    possible_ttps: string[];
  };
}

const MitreReportsTable = ({ imageId }: { imageId: string }) => {
  const [reports, setReports] = useState<MitreReport | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReports, setFilteredReports] = useState<MitreReport | null>(
    null
  );

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(
          `http://4.213.138.110:8000/get-mitre-reports/${imageId}`,
          { cache: "no-cache" }
        );
        const data = await response.json();
        console.log(data);
        setReports(data);
        setFilteredReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, [imageId]);

  useEffect(() => {
    if (reports) {
      const filtered = Object.fromEntries(
        Object.entries(reports).filter(
          ([fileName, { summary, details }]) =>
            fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
            details.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredReports(filtered);
    }
  }, [searchTerm, reports]);

  return (
    <div className="p-6">
      <Input
        placeholder="Search MITRE reports..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>File Name</TableHead>
            <TableHead>Summary</TableHead>
            <TableHead>Possible TTPs</TableHead> {/* New column for TTPs */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredReports &&
            Object.entries(filteredReports).map(([fileName, report]) => (
              <TableRow key={fileName}>
                <TableCell>{fileName}</TableCell>
                <TableCell>{report.summary}</TableCell>
                <TableCell>
                  {/* Render Possible TTPs */}
                  {report.possible_ttps.length > 0 ? (
                    report.possible_ttps.join(", ")
                  ) : (
                    <span>No TTPs available</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MitreReportsTable;
