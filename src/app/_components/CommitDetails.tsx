import React from 'react';

export type CommitFile = {
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  patch?: string;
  raw_url?: string;
  blob_url?: string;
};

export type CommitDetailsProps = {
  details: {
    sha: string;
    files: CommitFile[];
    stats: { additions: number; deletions: number; total: number };
    author: string;
    message: string;
    date: string;
    url: string;
  };
};

export const CommitDetails: React.FC<CommitDetailsProps> = ({ details }) => {
  return (
    <div className="mt-4 bg-zinc-800 p-4 rounded text-white">
      <div className="mb-2 font-semibold">Files Changed ({details.files.length}):</div>
      <ul className="mb-4">
        {details.files.map((file) => (
          <li key={file.filename} className="mb-2">
            <div>
              <span className="font-mono text-xs text-zinc-400">{file.filename}</span>
              <span className="ml-2 px-2 py-0.5 rounded bg-zinc-600 text-xs uppercase">{file.status}</span>
              <span className="ml-2 text-green-400">+{file.additions}</span>
              <span className="ml-1 text-red-400">-{file.deletions}</span>
            </div>
            {file.patch && (
              <pre className="mt-2 bg-zinc-900 p-2 rounded overflow-x-auto text-xs">
                {file.patch}
              </pre>
            )}
          </li>
        ))}
      </ul>
      <div className="text-xs text-zinc-400">
        <span>Total changes: </span>
        <span className="text-green-400">+{details.stats.additions}</span>
        <span className="text-red-400"> -{details.stats.deletions}</span>
        <span className="ml-2">({details.stats.total} lines changed)</span>
      </div>
    </div>
  );
};
