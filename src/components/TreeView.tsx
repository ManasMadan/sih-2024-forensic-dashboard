import React, { useState } from "react";

const TreeNode = ({
  node,
  onExpand,
}: {
  node: any;
  onExpand: (nodeId: string) => void;
}) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);

    // Load children dynamically when expanding (if needed)
    if (collapsed) {
      onExpand(node.id);
    }
  };

  return (
    <li>
      <div
        className="flex items-center cursor-pointer"
        onClick={toggleCollapse}
      >
        <span className="mr-2">{node.children && (collapsed ? "▶" : "▼")}</span>
        {node.name} ({node.desc})
      </div>
      {!collapsed && node.children && (
        <ul className="ml-4">
          {node.children.map((child: any) => (
            <TreeNode key={child.id} node={child} onExpand={onExpand} />
          ))}
        </ul>
      )}
    </li>
  );
};

const TreeView = ({
  data,
  onExpand,
}: {
  data: any[];
  onExpand: (nodeId: string) => void;
}) => {
  return (
    <ul>
      {data.map((node) => (
        <TreeNode key={node.id} node={node} onExpand={onExpand} />
      ))}
    </ul>
  );
};

export default TreeView;
