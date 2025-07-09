import React from 'react';
import { api } from '~/trpc/react';
import { CommitDetails } from './CommitDetails';
import { CopyButton } from './CopyButton';

interface CommitWithDetailsProps {
  commit: any;
  repoUrl: string;
}

export const CommitWithDetails: React.FC<CommitWithDetailsProps> = ({ commit, repoUrl }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [details, setDetails] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [aiExplanation, setAiExplanation] = React.useState<string | null>(null);
  const [aiLoading, setAiLoading] = React.useState(false);
  const [aiError, setAiError] = React.useState<string | null>(null);

  const getCommitDetails = api.project.getCommitDetails.useMutation();
  const explainCommit = api.project.explainCommit.useMutation();

  const fetchDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await getCommitDetails.mutateAsync({
        githubUrl: repoUrl,
        sha: commit.sha,
      });
      setDetails(resp);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch details');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    if (!expanded && !details) {
      fetchDetails();
    }
    setExpanded((x) => !x);
  };

  const handleAskAI = async () => {
    setAiLoading(true);
    setAiError(null);
    setAiExplanation(null);
    try {
      const resp = await explainCommit.mutateAsync({
        githubUrl: repoUrl,
        sha: commit.sha,
      });
      setAiExplanation(resp.explanation);
    } catch (err: any) {
      setAiError(err?.message || 'AI explanation failed');
    } finally {
      setAiLoading(false);
    }
  };


  return (
    <li className="bg-zinc-900 p-4 md:p-6 rounded shadow-md border border-zinc-800 w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
        <div className="flex-1">
          <div className="font-mono text-xs text-zinc-400 mb-1 flex items-center gap-2">
            SHA: {commit.sha}
            <CopyButton value={commit.sha} />
          </div>
          <div className="font-semibold text-white">{commit.message}</div>
          <div className="text-sm text-zinc-300 mb-1">
            By: {commit.author} on {commit.date && new Date(commit.date).toLocaleString()}
          </div>
          <a href={commit.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline text-xs">
            View on GitHub
          </a>
        </div>
        <button
          className="ml-4 px-2 py-1 text-xs bg-zinc-700 hover:bg-zinc-600 rounded text-white"
          onClick={handleToggle}
        >
          {expanded ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
      {expanded && (
        <div className="mt-4">
          {loading && <div className="text-zinc-400">Loading details...</div>}
          {error && <div className="text-red-400">{error}</div>}
          {details && <CommitDetails details={details} />}
          <div className="mt-4">
            <button
              className="px-3 py-1 bg-blue-700 text-white rounded hover:bg-blue-800 text-xs disabled:opacity-60"
              onClick={handleAskAI}
              disabled={aiLoading}
            >
              {aiLoading ? 'Asking AI...' : 'Ask AI'}
            </button>
            {aiExplanation && (
              <div className="mt-2 p-2 bg-zinc-800 rounded text-white text-sm">
                <span className="font-semibold">AI Explanation:</span>
                <div className="flex items-start gap-2">
                  <span>{aiExplanation}</span>
                  <CopyButton value={aiExplanation} />
                </div>
              </div>
            )}
            {aiError && <div className="text-red-400 mt-2">{aiError}</div>}
          </div>
        </div>
      )}
    </li>
  );
};
