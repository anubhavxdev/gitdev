"use client";
import { Card, CardTitle, CardDescription } from "@/components/ui/card-hover-effect";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FiArrowRight, FiTrash2, FiGitBranch } from "react-icons/fi";

export function VCBranchCard({
  branch,
  current,
  protectedBranch,
  onSwitch,
  onDelete,
}: {
  branch: string;
  current: boolean;
  protectedBranch: boolean;
  onSwitch?: () => void;
  onDelete?: () => void;
}) {
  return (
    <Card
      className={
        `relative overflow-hidden group transition-all duration-300 ${
          current
            ? "border-2 border-pink-500 bg-gradient-to-br from-black/80 via-pink-900/10 to-black/70 shadow-xl"
            : "bg-black/60 border border-white/10 hover:border-pink-400 hover:shadow-lg"
        }`
      }
    >
      <div className="flex items-center gap-2 mb-2">
        <FiGitBranch className="text-pink-400 mr-2" size={20} />
        <CardTitle>{branch}</CardTitle>
        {protectedBranch && <Badge variant="secondary" className="ml-2">protected</Badge>}
        {current && <Badge variant="default" className="ml-2 bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">Current</Badge>}
      </div>
      <CardDescription>
        {current ? "This is the current branch." : "Switch or delete this branch."}
      </CardDescription>
      <div className="flex gap-2 mt-4">
        {!current && (
          <Button variant="secondary" onClick={onSwitch} className="flex items-center gap-1 group-hover:bg-pink-900/80">
            <FiArrowRight /> Switch
          </Button>
        )}
        {!protectedBranch && !current && (
          <Button variant="destructive" onClick={onDelete} className="flex items-center gap-1 group-hover:bg-red-900/80">
            <FiTrash2 /> Delete
          </Button>
        )}
      </div>
      {/* Glassy animated border effect */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-pink-500/40 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-glow" />
    </Card>
  );
}
