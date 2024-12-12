"use client";
import React, { useState, useEffect } from "react";

// Define the structure of each Loki log
interface LokiLog {
  timestamp: string;
  log_level: string;
  source: string;
  message: string;
  event_id: string;
}

interface LokiReportTableProps {
  imageId: string; // The imageId prop passed to the component
}

const LokiReportTable: React.FC<LokiReportTableProps> = ({ imageId }) => {
  const [logs, setLogs] = useState<LokiLog[]>([]); // Store the logs
  const [page, setPage] = useState(1); // Current page
  const [pageSize] = useState(10); // Number of logs per page

  // Fetch the Loki logs on component mount
  useEffect(() => {
    const fetchLokiLogs = async () => {
      try {
        const response = await fetch(
          `http://4.213.138.110:8000/get-loki/${imageId}`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          setLogs(data);
        }
      } catch (error) {
        console.error("Error fetching Loki logs:", error);
      }
    };

    fetchLokiLogs();
  }, [imageId]);

  // Handle the pagination logic
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentLogs = logs.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(logs.length / pageSize);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <h1>Loki Report for Image {imageId}</h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Adding shadow to the table
        }}
      >
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Log Level</th>
            <th>Source</th>
            <th>Message</th>
            <th>Event ID</th>
          </tr>
        </thead>
        <tbody>
          {currentLogs.length > 0 ? (
            currentLogs.map((log, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                <td>{log.timestamp}</td>
                <td>{log.log_level}</td>
                <td>{log.source}</td>
                <td>{log.message}</td>
                <td>{log.event_id}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                No logs available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
          style={{
            marginRight: "5px",
            padding: "5px 10px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: page === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
          style={{
            marginLeft: "5px",
            padding: "5px 10px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: page === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LokiReportTable;
