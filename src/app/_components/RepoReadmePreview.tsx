import React from 'react';

export const RepoReadmePreview: React.FC<{ readme: string }> = ({ readme }) => {
  const [expanded, setExpanded] = React.useState(false);
  const preview = readme.length > 600 ? readme.slice(0, 600) + '...' : readme;

  return (
    <div className="mt-2 w-full">
      <div className="font-semibold text-zinc-200 mb-1">README Preview:</div>
      <pre className="bg-zinc-900 p-3 rounded text-xs overflow-x-auto max-h-64 whitespace-pre-wrap text-zinc-100 border border-zinc-800 shadow-inner w-full">
        {expanded ? readme : preview}
      </pre>
      {readme.length > 600 && (
        <button
          className="mt-1 px-2 py-0.5 bg-zinc-700 text-white rounded text-xs hover:bg-zinc-600"
          onClick={() => setExpanded((x) => !x)}
        >
          {expanded ? 'Show Less' : 'Show Full README'}
        </button>
      )}
    </div>
  );
};
