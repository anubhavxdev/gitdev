import React from 'react';
import { Bar } from 'react-chartjs-2';
import type { 
  ChartData, 
  ChartOptions, 
  ScriptableContext, 
  FontSpec, 
  TooltipItem, 
  TooltipLabelStyle,
  ChartType
} from 'chart.js';
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
  [key: string]: unknown; // For additional properties we might not care about
}

interface DateBuckets {
  [date: string]: number;
}

function groupCommitsByDate(commits: readonly Commit[], days = 14): DateBuckets {
  const now = new Date();
  const buckets: DateBuckets = {};
  
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
    const key = String(commit.date).slice(0, 10);
    if (Object.prototype.hasOwnProperty.call(buckets, key)) {
      buckets[key] = (buckets[key] ?? 0) + 1;
    }
  }
  
  return buckets;
}

interface CommitFrequencyChartProps {
  commits: readonly Commit[];
}

export const CommitFrequencyChart: React.FC<CommitFrequencyChartProps> = ({ commits }) => {
  const buckets = groupCommitsByDate(commits);
  const labels = Object.keys(buckets);
  const values = Object.values(buckets);
  
  const data: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Commits per Day',
        data: values,
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        borderRadius: 4,
      },
    ],
  };
  
  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        display: false 
      },
      title: { 
        display: true, 
        text: 'Commit Frequency (last 14 days)',
        color: '#f4f4f5',
        font: {
          size: 16,
          weight: 'normal',
        } as FontSpec,
      },
      tooltip: {
        backgroundColor: 'rgba(39, 39, 42, 0.95)',
        titleColor: '#f4f4f5',
        bodyColor: '#e4e4e7',
        padding: 12,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        usePointStyle: true,
        callbacks: {
          label: (context: TooltipItem<ChartType>) => {
            const value = context.parsed.y;
            return `${value} commit${value !== 1 ? 's' : ''}`;
          },
        },
      } as const,
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(63, 63, 70, 0.5)',
          drawOnChartArea: false,
        },
        ticks: {
          color: '#a1a1aa',
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        grid: {
          color: 'rgba(63, 63, 70, 0.5)',
          drawOnChartArea: true,
        },
        ticks: {
          color: '#a1a1aa',
          precision: 0,
        },
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="relative bg-zinc-800 p-4 md:p-6 rounded-lg mt-8 border border-zinc-700 shadow-md w-full min-w-[320px] h-[400px] md:h-[450px]">
      <Bar 
        data={data} 
        options={options} 
        className="w-full h-full"
      />
    </div>
  );
};
