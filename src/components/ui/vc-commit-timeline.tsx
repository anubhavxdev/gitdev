"use client";
import { FiGitCommit } from "react-icons/fi";

export function VCCommitTimeline({ commits }: { commits: { hash: string; message: string }[] }) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-1 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500/70 to-black/0 rounded-full" />
      <ul className="space-y-4">
        {commits.map((commit, idx) => (
          <li key={commit.hash} className="relative flex items-start gap-3">
            <span className="absolute -left-6 top-1.5">
              <FiGitCommit className="text-pink-400 bg-black rounded-full" size={20} />
            </span>
            <span className="font-mono text-pink-400 bg-black/70 rounded px-2 py-0.5 text-xs border border-pink-900/40">
              {commit.hash.slice(0, 7)}
            </span>
            <span className="ml-2 text-gray-200">{commit.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
