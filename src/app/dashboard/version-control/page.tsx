"use client";
"use client";
import React, { useState, useEffect } from "react";
import { trpc } from "@/utils/trpc";
import { Card, CardTitle, CardDescription } from "@/components/ui/card-hover-effect";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VCToast } from "@/components/ui/vc-toast";
import { VCBranchCard } from "@/components/ui/vc-branch-card";
import { VCCommitTimeline } from "@/components/ui/vc-commit-timeline";
import VCBranchGraph from "@/components/ui/vc-branch-graph";
import { BranchSelect } from "@/components/ui/branch-select";
import { useUser } from "@clerk/nextjs";

export default function VersionControlPage() {
  const { user } = useUser(); // Clerk user
  // Fetch branches and commits from tRPC
  const utils = trpc.useUtils?.() ?? {};
  const { data: branches, isLoading: loadingBranches, refetch: refetchBranches } = trpc.versionControl.listBranches.useQuery();
  const { data: commits, isLoading: loadingCommits } = trpc.versionControl.listCommits.useQuery({ limit: 10 });
  const createBranch = trpc.versionControl.createBranch.useMutation();
  const switchBranch = trpc.versionControl.switchBranch.useMutation();
  const deleteBranch = trpc.versionControl.deleteBranch.useMutation();

  const [newBranch, setNewBranch] = useState("");
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  // Identify current branch (git branch output: first line is current, marked * )
  const currentBranch = branches && branches.length > 0 ? branches[0] : null;

  const handleCreateBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBranch) return;
    const res = await createBranch.mutateAsync({ branchName: newBranch });
    if (res.success) {
      setActionMsg(`Branch '${newBranch}' created!`);
      setNewBranch("");
      refetchBranches?.();
    } else {
      setActionMsg(res.error || "Failed to create branch.");
    }
  };

  const handleSwitchBranch = async (branch: string) => {
    const res = await switchBranch.mutateAsync({ branchName: branch });
    if (res.success) {
      setActionMsg(`Switched to '${branch}'.`);
      refetchBranches?.();
    } else {
      setActionMsg(res.error || "Failed to switch branch.");
    }
  };

  const handleDeleteBranch = async (branch: string) => {
    const res = await deleteBranch.mutateAsync({ branchName: branch });
    if (res.success) {
      setActionMsg(`Deleted branch '${branch}'.`);
      refetchBranches?.();
    } else {
      setActionMsg(res.error || "Failed to delete branch.");
    }
  };

  // Repo link and info state
  const [repoLink, setRepoLink] = useState("");
  const [repoInfo, setRepoInfo] = useState<{ name: string; owner: string; url: string } | undefined>();

  // Branch selection state
  const [allBranches, setAllBranches] = useState<string[]>([]);
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);

  // Branch graph state
  const [branchGraph, setBranchGraph] = useState<{
    nodes: any[];
    edges: any[];
    loading: boolean;
    error?: string;
  }>({ nodes: [], edges: [], loading: false });

  // Fetch branches/commits from GitHub API
  useEffect(() => {
    if (!repoInfo) return;
    setBranchGraph(bg => ({ ...bg, loading: true, error: undefined }));
    const fetchBranches = async () => {
      const headers: any = {};

      const branchRes = await fetch(`https://api.github.com/repos/${repoInfo.owner}/${repoInfo.name}/branches`, { headers });
      const branches = await branchRes.json();
      if (!Array.isArray(branches)) throw new Error("Failed to fetch branches");
      setAllBranches(branches.map((b: any) => b.name));
      // If selectedBranches is empty, select all by default
      if (selectedBranches.length === 0) setSelectedBranches(branches.map((b: any) => b.name));
      // Fetch commits for selected branches only
      const allCommits: any[] = [];
      for (const branch of branches) {
        if (!selectedBranches.includes(branch.name)) continue;
        const commitRes = await fetch(`https://api.github.com/repos/${repoInfo.owner}/${repoInfo.name}/commits?sha=${branch.name}&per_page=5`, { headers });
        const commits = await commitRes.json();
        if (Array.isArray(commits)) {
          allCommits.push(...commits.map((c: any, i: number) => ({
            id: c.sha,
            label: c.commit.message.split("\n")[0],
            branch: branch.name,
            parents: c.parents.map((p: any) => p.sha),
            url: c.html_url,
            author: c.commit.author.name,
            date: c.commit.author.date,
            avatar: c.author?.avatar_url,
            position: { x: i * 120 + Math.random() * 30, y: Math.random() * 200 + branches.indexOf(branch) * 60 },
          })));
        }
      }
      // Build nodes and edges
      const nodes = allCommits.map(c => ({
        id: c.id,
        position: c.position,
        data: {
          label: `${c.label.slice(0, 16)}...`,
          branch: c.branch,
          author: c.author,
          date: c.date,
          url: c.url,
          avatar: c.avatar,
        },
        style: { border: "2px solid #ec4899", background: "#18181b", color: "#fff" },
      }));
      const edges = allCommits.flatMap(c =>
        c.parents.map((p: string) => ({
          id: `${c.id}-${p}`,
          source: c.id,
          target: p,
          animated: true,
          style: { stroke: "#f472b6" },
        }))
      );
      setBranchGraph({ nodes, edges, loading: false });
    };
    fetchBranches().catch(err => setBranchGraph(bg => ({ ...bg, loading: false, error: err.message })));
  }, [repoInfo, selectedBranches]);

  // Toast state for feedback
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  // Show toast when actionMsg changes
  useEffect(() => {
    if (actionMsg) {
      setShowToast(true);
      setToastType(actionMsg.toLowerCase().includes('fail') || actionMsg.toLowerCase().includes('error') ? 'error' : 'success');
    }
  }, [actionMsg]);

  // Determine protected branches
  const isProtected = (branch: string) => branch === "main" || branch === "master";

  return (
    <div className="min-h-screen bg-black text-gray-100 px-4 py-8">
      {/* Repo input form */}
      <form
        className="max-w-xl mx-auto flex flex-col md:flex-row gap-4 items-center mb-8 bg-black/60 border border-pink-900/40 rounded-xl p-4 shadow-lg"
        onSubmit={async e => {
          e.preventDefault();
          // Basic parse for GitHub repo info
          if (!repoLink) return;
          try {
            const match = repoLink.match(/github.com\/(.+?)\/(.+?)(?:\.git)?$/);
            if (match) {
              setRepoInfo({
                name: match[2],
                owner: match[1],
                url: repoLink,
              });
            } else {
              setRepoInfo(undefined);
            }
          } catch {
            setRepoInfo(undefined);
          }
        }}
      >
        <input
          type="text"
          value={repoLink}
          onChange={e => setRepoLink(e.target.value)}
          placeholder="Paste your GitHub repo link (e.g. https://github.com/user/repo)"
          className="flex-1 bg-black/0 border-none outline-none text-white placeholder:text-pink-400 text-base px-2"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded shadow font-semibold hover:scale-105 transition-transform"
        >
          Load Repo
        </button>
      </form>
      {/* Show repo info if available */}
      {repoInfo && (
        <>
          <div className="flex items-center justify-end w-full mb-2 gap-4">
            {/* Clerk User Info */}
            {user && (
              <div className="flex items-center gap-2">
                {user.imageUrl && (
                  <img src={user.imageUrl} alt="avatar" className="w-8 h-8 rounded-full border border-pink-400" />
                )}
                <span className="text-pink-200 text-sm font-semibold">{user.fullName || user.username || user.emailAddresses?.[0]?.emailAddress}</span>
              </div>
            )}
          </div>
          {/* Visual Branch Graph */}
          {/* Branch selection UI */}
          {allBranches.length > 1 && (
            <BranchSelect
              branches={allBranches}
              selected={selectedBranches}
              onChange={setSelectedBranches}
            />
          )}
          {/* Real-time branch graph from GitHub API */}
          <VCBranchGraph
            nodes={branchGraph.nodes}
            edges={branchGraph.edges}
          />
          {branchGraph.loading && (
            <div className="text-center text-pink-400">Loading branch graph...</div>
          )}
          {branchGraph.error && (
            <div className="text-center text-red-400">{branchGraph.error}</div>
          )}
        </>
      )}
      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-2 tracking-tight text-center">Version Control</h1>
      <p className="text-center text-gray-300 max-w-2xl mx-auto mb-8 text-base">
        Manage your Git branches visually—create, switch, and delete branches, and view recent commits—all from an interactive, modern UI. Stay in control of your codebase without leaving your dashboard.
      </p>
      {showToast && actionMsg && (
        <VCToast message={actionMsg} type={toastType} onClose={() => setShowToast(false)} />
      )}
      {/* Branch creation bar */}
      <form
        onSubmit={handleCreateBranch}
        className="flex gap-2 mb-8 px-4 py-3 rounded-xl bg-black/60 border border-pink-900/40 shadow-lg items-center transition-all focus-within:ring-2 focus-within:ring-pink-400 animate-fade-in-up"
      >
        <input
          type="text"
          value={newBranch}
          onChange={e => setNewBranch(e.target.value)}
          placeholder="New branch name"
          className="flex-1 bg-black/0 border-none outline-none text-white placeholder:text-pink-400 text-lg px-2"
        />
        <Button type="submit" className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded shadow font-semibold hover:scale-105 transition-transform">
          + Create
        </Button>
      </form>
      {/* Branches grid with animated cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {loadingBranches ? (
          <div>Loading branches...</div>
        ) : (
          branches?.map((branch: string) => (
            <VCBranchCard
              key={branch}
              branch={branch}
              current={branch === currentBranch}
              protectedBranch={isProtected(branch)}
              onSwitch={() => handleSwitchBranch(branch)}
              onDelete={() => handleDeleteBranch(branch)}
            />
          ))
        )}
      </div>
      {/* Commit timeline */}
      <div>
        <h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">Recent Commits</h2>
        <div className="bg-black/40 rounded-lg p-6 border border-pink-900/30 shadow-lg">
          {loadingCommits ? (
            <div>Loading commits...</div>
          ) : (
            <VCCommitTimeline commits={(commits ?? []).filter((c: any) => c?.hash && c?.message) as { hash: string; message: string }[]} />
          )}
        </div>
      </div>
    </div>
  );
}
