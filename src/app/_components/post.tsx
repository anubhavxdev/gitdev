"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { api } from "~/trpc/react";

export function LatestProject() {
  const { user } = useUser();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  
  const { data: latestProject, isLoading } = api.post.getLatest.useQuery();
  const utils = api.useUtils();
  
  const createProject = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setProjectName("");
      setDescription("");
      setGithubUrl("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    
    createProject.mutate({
      name: projectName,
      description: description || undefined,
      githubUrl: githubUrl || undefined,
      userId: user.id,
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-md space-y-4">
      {latestProject ? (
        <div className="rounded-lg bg-white/10 p-4">
          <h3 className="font-semibold">Your most recent project:</h3>
          <p className="truncate">{latestProject.name}</p>
          {latestProject.description && (
            <p className="mt-2 text-sm text-gray-300">{latestProject.description}</p>
          )}
        </div>
      ) : (
        <p>You have no projects yet.</p>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="projectName" className="mb-1 block text-sm font-medium">
            Project Name *
          </label>
          <input
            id="projectName"
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full rounded-md bg-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="mb-1 block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter project description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md bg-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>
        
        <div>
          <label htmlFor="githubUrl" className="mb-1 block text-sm font-medium">
            GitHub URL (optional)
          </label>
          <input
            id="githubUrl"
            type="url"
            placeholder="https://github.com/username/repo"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="w-full rounded-md bg-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          type="submit"
          disabled={createProject.isPending || !user}
          className="w-full rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {createProject.isPending ? "Creating..." : "Create Project"}
        </button>
        
        {!user && (
          <p className="text-sm text-amber-400">Please sign in to create a project.</p>
        )}
      </form>
    </div>
  );
}
