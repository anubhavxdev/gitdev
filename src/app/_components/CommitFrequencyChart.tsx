import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Commit {
  date: string | null | undefined;
}

function groupCommitsByDate(commits: Commit[], days = 14): { [date: string]: number } {
  const now = new Date();
  const buckets: { [date: string]: number } = {};
  
  // Initialize buckets for the last N days
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    buckets[key] = 0;
  }
  
  // Count commits per day
  for (const commit of commits) {
    if (!commit.date) continue;
    const key = commit.date.slice(0, 10);
    if (buckets.hasOwnProperty(key)) {
      buckets[key] = (buckets[key] || 0) + 1;
    }
  }
  
  return buckets;
}

export const CommitFrequencyChart: React.FC<{ commits: { date: string }[] }> = ({ commits }) => {
  const buckets = groupCommitsByDate(commits);
  const data = {
    labels: Object.keys(buckets),
    datasets: [
      {
        label: 'Commits per Day',
        data: Object.values(buckets),
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Commit Frequency (last 14 days)' },
    },
    scales: {
      x: { grid: { color: '#27272a' }, ticks: { color: '#fff' } },
      y: { grid: { color: '#27272a' }, ticks: { color: '#fff' }, beginAtZero: true },
    },
  };
  return (
    <div className="bg-zinc-800 p-4 md:p-6 rounded mt-8 border border-zinc-700 shadow-md w-full min-w-[320px]">
      <Bar data={data} options={options} />
    </div>
  );
};
