"use client";
import React from "react";

export type BranchSelectProps = {
  branches: string[];
  selected: string[];
  onChange: (branches: string[]) => void;
};

export function BranchSelect({ branches, selected, onChange }: BranchSelectProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {branches.map(branch => (
        <button
          key={branch}
          className={`px-3 py-1 rounded-full border transition text-xs font-semibold shadow-sm focus:outline-none ${selected.includes(branch)
            ? "bg-gradient-to-r from-red-500 to-pink-500 text-white border-pink-400"
            : "bg-black/70 border-pink-900/30 text-pink-200 hover:bg-pink-900/30"}`}
          onClick={() => {
            if (selected.includes(branch)) {
              onChange(selected.filter(b => b !== branch));
            } else {
              onChange([...selected, branch]);
            }
          }}
        >
          {branch}
        </button>
      ))}
    </div>
  );
}
