"use client";
import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-black text-gray-100 px-4 py-8 flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-64 bg-black/50 border border-pink-900/30 rounded-xl p-6 h-fit sticky top-8">
        <nav className="flex flex-col gap-2">
          <Link href="#dashboard" className="hover:text-pink-400">Dashboard</Link>
          <Link href="#version-control" className="hover:text-pink-400">Version Control</Link>
          <Link href="#sync-user" className="hover:text-pink-400">Sync User</Link>
          <Link href="#pricing" className="hover:text-pink-400">Pricing</Link>
          <Link href="#sign-up" className="hover:text-pink-400">Sign Up</Link>
        </nav>
      </aside>
      <main className="flex-1 max-w-3xl mx-auto">
        <section id="dashboard" className="mb-12">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-2">Dashboard</h2>
          <p className="mb-2">The dashboard is your home for all features. Use the sidebar to navigate to Version Control, Sync User, Pricing, and more.</p>
        </section>
        <section id="version-control" className="mb-12">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-2">Version Control</h2>
          <ul className="list-disc ml-6 mb-2">
            <li><b>View Branches:</b> See all branches in a visual card grid. The current branch is highlighted.</li>
            <li><b>Create Branch:</b> Use the input and Create button to add a new branch.</li>
            <li><b>Switch Branch:</b> Use the Switch button on a branch card to change branches.</li>
            <li><b>Delete Branch:</b> Use the Delete button (not on protected branches) to remove a branch.</li>
            <li><b>View Commits:</b> Recent commits are shown below the branch grid.</li>
          </ul>
        </section>
        <section id="sync-user" className="mb-12">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-2">Sync User</h2>
          <p className="mb-2">Sync your user profile and settings with the backend. Follow the instructions on the Sync User page to keep your data up to date.</p>
        </section>
        <section id="pricing" className="mb-12">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-2">Pricing</h2>
          <p className="mb-2">Review available plans and features. Upgrade or downgrade as needed.</p>
        </section>
        <section id="sign-up" className="mb-12">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-2">Sign Up</h2>
          <p className="mb-2">Create a new account using the sign-up form. Fill in your details and get started!</p>
        </section>
      </main>
    </div>
  );
}
