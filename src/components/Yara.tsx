"use client";

import React, { useState } from "react";
import axios from "axios";

interface RunYaraScanProps {
  imageId: string;
}

const RunYaraScan: React.FC<RunYaraScanProps> = ({ imageId }) => {
  const [yaraRule, setYaraRule] = useState<string>("");
  const [scanResults, setScanResults] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle the form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!yaraRule.trim()) {
      setError("Please provide a YARA rule.");
      return;
    }

    setLoading(true);
    setError(null);
    setScanResults(null);

    try {
      const response = await axios.post(
        `http://4.213.138.110:8000/run-yara/${imageId}`,
        new URLSearchParams({
          yara_rule: yaraRule,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // Ensuring the correct content type
          },
        }
      );

      // Check if the response has the expected structure
      if (response.data && response.data.yara_scan_results) {
        setScanResults(response.data.yara_scan_results);
      } else {
        setError("No results found or an error occurred.");
      }
    } catch (err) {
      setError("Failed to execute YARA scan. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Run YARA Scan for Image {imageId}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="yaraRule">YARA Rule</label>
          <textarea
            id="yaraRule"
            value={yaraRule}
            onChange={(e) => setYaraRule(e.target.value)}
            rows={6}
            cols={50}
            placeholder="Paste your YARA rule here"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Running..." : "Run YARA Scan"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {scanResults && (
        <div>
          <h3>YARA Scan Results:</h3>
          <pre>{scanResults}</pre>
        </div>
      )}
    </div>
  );
};

export default RunYaraScan;
