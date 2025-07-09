import React from 'react';
import { api } from '~/trpc/react';
import { CommitDetails, type CommitFile, type CommitDetailsProps } from './CommitDetails';
import { CopyButton } from './CopyButton';
import { toast } from 'sonner';

type Commit = {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

type CommitDetails = CommitDetailsProps['details'];

interface CommitWithDetailsProps {
  commit: Commit;
  repoUrl: string;
}

export const CommitWithDetails: React.FC<CommitWithDetailsProps> = ({ commit, repoUrl }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [details, setDetails] = React.useState<CommitDetails | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [aiExplanation, setAiExplanation] = React.useState<string | null>(null);
  const [aiLoading, setAiLoading] = React.useState(false);
  const [aiError, setAiError] = React.useState<string | null>(null);

  const getCommitDetails = api.project.getCommitDetails.useMutation();
  const explainCommit = api.project.explainCommit.useMutation();

  const fetchDetails = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await getCommitDetails.mutateAsync({
        githubUrl: repoUrl,
        sha: commit.sha,
      });
      
      if (!resp) {
        throw new Error('No response from server');
      }
      
      // Ensure all required fields are present with proper types
      const commitDetails: CommitDetails = {
        sha: resp.sha ?? commit.sha,
        files: Array.isArray(resp.files) 
          ? resp.files.map(file => ({
              filename: file.filename ?? '',
              status: file.status ?? 'modified',
              additions: typeof file.additions === 'number' ? file.additions : 0,
              deletions: typeof file.deletions === 'number' ? file.deletions : 0,
              changes: typeof file.changes === 'number' ? file.changes : 0,
              patch: file.patch,
              raw_url: file.raw_url ?? '',
              blob_url: file.blob_url ?? ''
            }))
          : [],
        stats: {
          additions: resp.stats?.additions ?? 0,
          deletions: resp.stats?.deletions ?? 0,
          total: resp.stats?.total ?? 0,
        },
        author: resp.author ?? 'Unknown',
        message: resp.message ?? 'No commit message',
        date: resp.date ?? new Date().toISOString(),
        url: resp.url ?? ''
      };
      
      setDetails(commitDetails);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch details';
      setError(errorMessage);
      console.error('Error fetching commit details:', error);
    } finally {
      setLoading(false);
    }
  }, [repoUrl, commit.sha, getCommitDetails]);

  const handleToggle = React.useCallback(() => {
    if (!expanded && !details) {
      fetchDetails().catch((error: unknown) => {
        console.error('Failed to fetch commit details:', error);
        toast.error('Failed to load commit details');
      });
    }
    setExpanded((prev) => !prev);
  }, [expanded, details, fetchDetails]);

  const handleAskAI = React.useCallback(async () => {
    setAiLoading(true);
    setAiError(null);
    setAiExplanation(null);
    
    try {
      const resp = await explainCommit.mutateAsync({
        githubUrl: repoUrl,
        sha: commit.sha,
      });
      
      if (!resp?.explanation) {
        throw new Error('No explanation was generated');
      }
      
      setAiExplanation(resp.explanation);
      toast.success('AI explanation generated');
    } catch (err: unknown) {
      console.error('AI explanation failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate AI explanation';
      setAiError(errorMessage);
      toast.error('Failed to generate AI explanation');
    } finally {
      setAiLoading(false);
    }
  }, [repoUrl, commit.sha, explainCommit]);


  const commitDate = React.useMemo(() => {
    try {
      return commit.date ? new Date(commit.date).toLocaleString() : 'Unknown date';
    } catch (error) {
      console.error('Invalid date format:', commit.date, error);
      return 'Invalid date';
    }
  }, [commit.date]);

  return (
    <li className="bg-zinc-900 p-4 md:p-6 rounded-lg shadow-md border border-zinc-800 w-full transition-all duration-200 hover:border-zinc-600">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
        <div className="flex-1">
          <div className="font-mono text-xs text-zinc-400 mb-1 flex items-center gap-2">
            SHA: {commit.sha}
            <CopyButton value={commit.sha} />
          </div>
          <div className="font-semibold text-white">{commit.message.trim()}</div>
          <div className="text-sm text-zinc-300 mb-1 flex flex-wrap items-center gap-1">
            <span>By: <span className="text-white">{commit.author}</span></span>
            <span className="text-zinc-500">•</span>
            <span>on <time dateTime={commit.date} className="text-white">{commitDate}</time></span>
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
