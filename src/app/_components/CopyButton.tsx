import React from 'react';

export const CopyButton: React.FC<{ value: string; className?: string }> = ({ value, className }) => {
  const [copied, setCopied] = React.useState(false);
  return (
    <button
      type="button"
      className={`ml-2 px-2 py-0.5 rounded bg-zinc-700 hover:bg-zinc-600 text-xs text-white ${className || ''}`}
      onClick={async (e) => {
        e.preventDefault();
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
      title="Copy to clipboard"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};
