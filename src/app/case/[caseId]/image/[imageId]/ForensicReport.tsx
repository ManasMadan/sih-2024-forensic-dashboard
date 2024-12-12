"use client";
import React, { useState, useEffect } from "react";

interface TreeNode {
  id: string;
  name: string;
  parent_process_id: string | null;
  timestamp: string;
  children?: TreeNode[]; // Children will be added when expanded
}

interface ForensicTimelineProps {
  imageId: string; // Pass the imageId to the component to make API requests
}

const ForensicTimeline: React.FC<ForensicTimelineProps> = ({ imageId }) => {
  const [nodes, setNodes] = useState<TreeNode[]>([]); // All nodes (root and children)
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set()); // Track expanded nodes

  // Fetch the root nodes initially
  useEffect(() => {
    const fetchRootNodes = async () => {
      try {
        const response = await fetch(
          `http://4.213.138.110:8000/get-timeline/${imageId}`
        );
        const data = await response.json();
        if (data.timeline) {
          setNodes(data.timeline); // Set the root nodes (parent_process_id=null)
        }
      } catch (error) {
        console.error("Error fetching root nodes:", error);
      }
    };

    fetchRootNodes();
  }, [imageId]);

  // Fetch child nodes of a parent node
  const fetchChildNodes = async (parentId: string) => {
    try {
      const response = await fetch(
        `http://4.213.138.110:8000/get-timeline/${imageId}?parent_process_id=${parentId}`
      );
      const data = await response.json();

      // Only update the parent node with children if they are fetched
      setNodes((prevNodes) => {
        return prevNodes.map((node) => {
          if (node.id === parentId && !node.children) {
            return { ...node, children: data.timeline || [] }; // Add children to the parent node
          }
          return node;
        });
      });
    } catch (error) {
      console.error("Error fetching child nodes:", error);
    }
  };

  // Handle expand/collapse
  const handleToggle = (nodeId: string, parentProcessId: string | null) => {
    setExpandedNodes((prev) => {
      const newExpandedNodes = new Set(prev);
      if (newExpandedNodes.has(nodeId)) {
        newExpandedNodes.delete(nodeId); // Collapse the node
      } else {
        newExpandedNodes.add(nodeId); // Expand the node
        if (!parentProcessId) {
          fetchChildNodes(nodeId); // Fetch children if the node doesn't have children yet
        }
      }
      return newExpandedNodes;
    });
  };

  // Render each node recursively in a table row
  const renderNode = (node: TreeNode, depth: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);

    return (
      <React.Fragment key={node.id}>
        <tr>
          <td style={{ paddingLeft: `${depth * 20}px` }}>
            <button
              onClick={() => handleToggle(node.id, node.parent_process_id)}
            >
              {isExpanded ? "[-]" : "[+]"} {/* Toggle expand/collapse */}
            </button>
          </td>
          <td>{node.name}</td>
          <td>{node.timestamp}</td>
        </tr>

        {/* Render children if expanded */}
        {isExpanded &&
          node.children &&
          node.children.map((child) => renderNode(child, depth + 1))}
      </React.Fragment>
    );
  };

  return (
    <div>
      <h1>Forensic Timeline for Image {imageId}</h1>
      <table border={1} cellPadding="10" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Expand</th>
            <th>Node Name</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {nodes.length > 0 ? (
            nodes.map((node) => renderNode(node)) // Render the root nodes
          ) : (
            <tr>
              <td colSpan={3}>No data available for this forensic timeline.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ForensicTimeline;
