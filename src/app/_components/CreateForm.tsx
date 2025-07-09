'use client'

import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '~/components/ui/input';
import { api } from '~/trpc/react';

import { getMutationLoading } from './trpc-mutation-state';
import { CommitDetails } from './CommitDetails';
import { CommitWithDetails } from './CommitWithDetails';
import { CommitFrequencyChart } from './CommitFrequencyChart';
import { RepoReadmePreview } from './RepoReadmePreview';

type FormInput = {
  repoUrl: string
  projectName: string
  githubToken: string
}

export const CreateForm = () => {
  const { register, handleSubmit, reset } = useForm<FormInput>()
  const createproject = api.project.createProject.useMutation()

  const [repoInfo, setRepoInfo] = React.useState<any | null>(null);
  const [commits, setCommits] = React.useState<any[]>([]);
  const [summary, setSummary] = React.useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = React.useState(false);
  const summarizeRepo = api.project.summarizeRepo.useMutation();

  async function onSubmit(data: FormInput): Promise<void> {
    setRepoInfo(null);
    setCommits([]);
    createproject.mutate(
      {
        name: data.projectName,
        githubUrl: data.repoUrl,
        githubToken: data.githubToken,
      },
      {
        onSuccess: (data) => {
          setRepoInfo(data.repoInfo);
          setCommits(data.commits);
        },
      }
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 justify-center w-full max-w-5xl mx-auto px-2 md:px-0 py-6">
      <img
        src="https://techcrunch.com/wp-content/uploads/2010/07/github-logo.png"
        className="h-32 w-auto md:h-56 mb-4 md:mb-0 drop-shadow-lg rounded-lg border border-zinc-800 bg-zinc-900"
        alt="GitHub illustration"
      />

      <div className="w-full max-w-lg bg-zinc-900 rounded-lg shadow-lg p-4 md:p-8 border border-zinc-800">
        <h1 className="font-bold text-xl md:text-2xl mb-2 text-white">
          Link your GitHub Repository
        </h1>
        <p className="text-sm text-zinc-300 mb-4">
          Enter the URL of your repository to link it to Dion.
        </p>
        <h1 className="font-semibold text-2xl mb-2">
          Link your GitHub Repository
        </h1>
        <p className="text-sm text-muted-foreground mb-4">
          Enter the URL of your repository to link it to Dion.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register('repoUrl', { required: true })}
            placeholder="Repository URL"
            required
          />
          <Input
            {...register('projectName', { required: true })}
            placeholder="Project Name"
            required
          />
          <Input
            {...register('githubToken', { required: true })}
            placeholder="GitHub Token"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded"
            disabled={getMutationLoading(createproject)}
          >
            {getMutationLoading(createproject) ? 'Linking...' : 'Link Repository'}
          </button>
        </form>

        {createproject.isLoading && (
          <div className="flex flex-col items-center mt-8">
            <svg className="animate-spin h-8 w-8 text-red-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <span className="text-zinc-400">Loading repository info...</span>
          </div>
        )}

        {createproject.isError && (
          <div className="text-red-500 mt-4 flex flex-col items-start gap-2">
            <span>Error: {createproject.error.message}</span>
            <button
              className="px-3 py-1 bg-red-700 text-white rounded text-xs hover:bg-red-800"
              onClick={() => {
                // Re-run last submit
                if (typeof handleSubmit === 'function') handleSubmit(onSubmit)();
              }}
            >
              Retry
            </button>
          </div>
        )}

        {repoInfo && (
          <div className="mt-8 w-full">
            {/* Repo Info Section */}
            <div className="mb-8 p-4 rounded bg-zinc-800 border border-zinc-700 shadow-md w-full max-w-2xl mx-auto">
              <h2 className="text-lg md:text-xl font-semibold mb-2 text-white">Repository Info</h2>
              <div className="text-white space-y-1">

                <div><span className="font-semibold">Name:</span> {repoInfo.name || 'N/A'}</div>
                <div><span className="font-semibold">Owner:</span> {repoInfo.ownerLogin || 'N/A'}</div>
                <div><span className="font-semibold">Owner ID:</span> {repoInfo.ownerId || 'N/A'}</div>
                <div><span className="font-semibold">URL:</span> <a href={repoInfo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">{repoInfo.html_url}</a></div>
                <div className="flex flex-wrap gap-4 mt-2">
                  <span title="Stars" className="flex items-center gap-1"><svg width="16" height="16" fill="currentColor" className="text-yellow-400"><path d="M8 12.472l-4.472 2.352.856-4.992L.768 6.792l5.024-.728L8 1.312l2.208 4.752 5.024.728-3.616 3.04.856 4.992z"/></svg> {repoInfo.stars ?? 'N/A'}</span>
                  <span title="Forks" className="flex items-center gap-1"><svg width="16" height="16" fill="currentColor" className="text-blue-400"><path d="M5 3.09V4.5a2.5 2.5 0 0 0 2 2.45V10.5a2.5 2.5 0 1 0 1 0V6.95a2.5 2.5 0 0 0 2-2.45V3.09a2.5 2.5 0 1 0-1 0V4.5a1.5 1.5 0 1 1-3 0V3.09a2.5 2.5 0 1 0-1 0z"/></svg> {repoInfo.forks ?? 'N/A'}</span>
                  <span title="Open Issues" className="flex items-center gap-1"><svg width="16" height="16" fill="currentColor" className="text-red-400"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" fill="none"/><rect x="7" y="4" width="2" height="5" rx="1"/><rect x="7" y="11" width="2" height="2" rx="1"/></svg> {repoInfo.openIssues ?? 'N/A'}</span>
                  <span title="Open PRs" className="flex items-center gap-1"><svg width="16" height="16" fill="currentColor" className="text-green-400"><rect x="2" y="7" width="12" height="2" rx="1"/><rect x="7" y="2" width="2" height="12" rx="1"/></svg> {repoInfo.openPrs ?? 'N/A'}</span>
                </div>
                <div className="mt-2">
                  <span className="font-semibold">Contributors:</span>
                  <div className="flex gap-3 mt-1">
                    {repoInfo.contributors && repoInfo.contributors.length > 0 ? (
                      repoInfo.contributors.map((c: any) => (
                        <a key={c.login} href={c.html_url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
                          <img src={c.avatar_url} alt={c.login} className="w-8 h-8 rounded-full border-2 border-zinc-700 group-hover:border-blue-400" />
                          <span className="text-xs text-zinc-300 group-hover:text-blue-400">{c.login}</span>
                        </a>
                      ))
                    ) : (
                      <span className="text-zinc-400 text-xs">N/A</span>
                    )}
                  </div>
                </div>
                {repoInfo.description && (
                  <div className="mt-2 text-zinc-300"><span className="font-semibold">Description:</span> {repoInfo.description}</div>
                )}
                {repoInfo.readme && (
                  <RepoReadmePreview readme={repoInfo.readme} />
                )}
              </div>
            </div>
            {/* Commit Frequency Chart */}
            {commits.length > 0 && (
              <div className="w-full overflow-x-auto">
                <div className="min-w-[340px] md:min-w-0">
                  <CommitFrequencyChart commits={commits} />
                </div>
              </div>
            )}
            {/* Latest 3 Commits */}
            <h2 className="text-lg md:text-xl font-semibold mb-4 mt-8">Latest 3 Commits</h2>
            <div>
              {commits.length === 0 ? (
                <div className="text-zinc-400">No commits found.</div>
              ) : (
                <ul className="space-y-6">
                  {commits.slice(0, 3).map((commit: any, idx: number) => (
                    <CommitWithDetails
                      key={commit.sha}
                      commit={commit}
                      repoUrl={repoInfo?.html_url}
                    />
                  ))}
                </ul>
              )}
            </div>
            {/* Ask AI Button and Summary */}
            <div className="mt-8">
              <button
                className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 disabled:opacity-60"
                onClick={async () => {
                  if (!repoInfo?.html_url) return;
                  setIsSummarizing(true);
                  setSummary(null);
                  try {
                    const repoUrl = repoInfo.html_url;
                    const githubToken = '';
                    const resp = await summarizeRepo.mutateAsync({
                      githubUrl: repoUrl,
                      githubToken,
                    });
                    setSummary(resp.summary);
                  } catch (err: any) {
                    setSummary('AI summary failed: ' + (err?.message || err));
                  } finally {
                    setIsSummarizing(false);
                  }
                }}
                disabled={isSummarizing || summarizeRepo.isLoading}
              >
                {isSummarizing || summarizeRepo.isLoading ? 'Asking AI...' : 'Ask AI'}
              </button>
              {summary && (
                <div className="mt-4 p-4 bg-zinc-900 rounded text-white">
                  <h3 className="font-semibold mb-2">AI Summary</h3>
                  <div>{summary}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
