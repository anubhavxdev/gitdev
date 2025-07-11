import React from 'react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-gray-100 px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-6">Welcome to Your Dashboard</h1>
      <p className="text-lg text-red-100/80 mb-10 max-w-2xl">Quick access to all your development tools and features.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FeatureCard title="Version Control" description="Manage branches, commits, and pull requests visually." href="/dashboard/version-control" />
        <FeatureCard title="Security & Compliance" description="Access controls, audit logs, and compliance tools." href="/dashboard/security" />
        <FeatureCard title="CI/CD & Automation" description="Automate your workflow and manage deployments." href="/dashboard/automation" />
        <FeatureCard title="Collaboration Tools" description="Team management, discussions, and documentation." href="/dashboard/collaboration" />
      </div>
    </div>
  );
}

function FeatureCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <a href={href} className="block p-6 rounded-xl bg-black/40 border border-red-900/50 hover:border-red-500/50 transition-all shadow-lg group">
      <h2 className="text-xl font-semibold mb-2 text-white group-hover:text-pink-500 transition-all">{title}</h2>
      <p className="text-gray-400 mb-2">{description}</p>
      <span className="text-red-400 font-medium group-hover:text-pink-400 transition-all">Go to {title} &rarr;</span>
    </a>
  );
}
