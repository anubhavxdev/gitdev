"use client";
import React from "react";
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState } from "reactflow";
import type { Node, Edge } from "reactflow";
import dagre, { graphlib } from "dagre";
import "reactflow/dist/style.css";

export type CommitNode = {
  id: string;
  label: string;
  branch: string;
  parents: string[];
  url: string;
  author: string;
  date: string;
  avatar?: string;
  position: { x: number; y: number };
};

export type VCBranchGraphProps = {
  nodes: any[];
  edges: any[];
};

const nodeWidth = 180;
const nodeHeight = 56;

function layoutGraph(nodes: Node[], edges: Edge[]): { nodes: Node[]; edges: Edge[] } {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "TB", nodesep: 40, ranksep: 60 });

  nodes.forEach((node) => {
    g.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });
  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  const layoutedNodes = nodes.map((node) => {
    const n = g.node(node.id);
    return {
      ...node,
      position: n ? { x: n.x - nodeWidth / 2, y: n.y - nodeHeight / 2 } : node.position,
      sourcePosition: "bottom",
      targetPosition: "top",
      data: {
        ...node.data,
        label: node.data?.label || node.label,
        branch: node.data?.branch || node.branch,
        author: node.data?.author || node.author,
        date: node.data?.date || node.date,
        url: node.data?.url || node.url,
        avatar: node.data?.avatar || node.avatar,
      },
      style: {
        ...node.style,
        border: node.data?.branch === "main" || node.data?.branch === "master"
          ? "2.5px solid #22d3ee"
          : node.style?.border || "2px solid #ec4899",
        boxShadow: node.data?.branch === "main" || node.data?.branch === "master"
          ? "0 0 0 2px #22d3ee66"
          : node.style?.boxShadow,
        background: node.style?.background || "#18181b",
        color: node.style?.color || "#fff",
      },
    };
  });
  return { nodes: layoutedNodes, edges };
}

export default function VCBranchGraph({ nodes, edges }: VCBranchGraphProps) {
  // Tooltip state
  const [hovered, setHovered] = React.useState<string | null>(null);
  const [tooltip, setTooltip] = React.useState<{ x: number; y: number; html: string } | null>(null);

  // Layout nodes/edges
  const { nodes: layoutedNodes, edges: layoutedEdges } = React.useMemo(() => layoutGraph(nodes, edges), [nodes, edges]);

  // Custom node rendering with avatar and tooltip
  const nodeTypes = React.useMemo(
    () => ({
      commit: ({ data, id, selected, xPos, yPos }: any) => (
        <div
          onMouseEnter={e => {
            setHovered(id);
            setTooltip({
              x: xPos,
              y: yPos,
              html: `<b>${data.label}</b><br/>by ${data.author}<br/>${data.date}<br/>${data.branch}`,
            });
          }}
          onMouseLeave={() => {
            setHovered(null);
            setTooltip(null);
          }}
          onClick={() => window.open(data.url, "_blank")}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg shadow-md cursor-pointer border-2 transition-all duration-150 ${selected ? "ring-2 ring-pink-500" : ""}`}
          style={{ background: "#18181b", borderColor: data.branch === "main" || data.branch === "master" ? "#22d3ee" : "#ec4899" }}
        >
          {data.avatar ? (
            <img src={data.avatar} alt="avatar" className="w-7 h-7 rounded-full border border-pink-400" />
          ) : (
            <div className="w-7 h-7 rounded-full bg-pink-900/50 flex items-center justify-center text-white text-xs font-bold">
              {data.author?.[0] || "?"}
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-semibold text-pink-200 text-xs truncate max-w-[110px]">{data.label}</span>
            <span className="text-xs text-pink-400">{data.branch}</span>
          </div>
        </div>
      ),
    }),
    []
  );

  const nodesWithType = layoutedNodes.map(n => ({ ...n, type: "commit" }));

  return (
    <div className="w-full h-[480px] rounded-lg border border-pink-900/40 bg-black/80 overflow-hidden shadow-xl relative">
      <ReactFlow
        nodes={nodesWithType}
        edges={layoutedEdges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.2}
        maxZoom={2}
        attributionPosition="bottom-right"
      >
        <MiniMap />
        <Controls />
        <Background gap={16} color="#ec4899" variant="dots" />
      </ReactFlow>
      {tooltip && hovered && (
        <div
          style={{ left: tooltip.x + 220, top: tooltip.y + 120, zIndex: 99 }}
          className="absolute pointer-events-none bg-black/90 border border-pink-400 text-pink-100 rounded-lg px-3 py-2 text-xs shadow-xl"
          dangerouslySetInnerHTML={{ __html: tooltip.html }}
        />
      )}
    </div>
  );
}
