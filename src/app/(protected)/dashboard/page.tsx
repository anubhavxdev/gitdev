'use client'

import React from 'react'
import { useUser } from '@clerk/nextjs'
import { CreateForm } from '~/app/_components/CreateForm'


const DashboardPage = () => {
  const { user } = useUser()

  if (!user) {
    return <div className="text-center text-white">Loading...</div>
  }

  return (
    <div className="min-h-screen w-full bg-black flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-zinc-900 border-r border-zinc-800 min-h-screen p-6 gap-6">
        <div className="mb-8 flex items-center gap-2">
          <span className="text-2xl font-bold text-red-600 tracking-widest">ADMIN</span>
        </div>
        <nav className="flex flex-col gap-2">
          <a href="#" className="text-white py-2 px-4 rounded hover:bg-zinc-800 transition font-semibold bg-zinc-800">Dashboard</a>
          <a href="#" className="text-zinc-300 py-2 px-4 rounded hover:bg-zinc-800 transition">Users</a>
          <a href="#" className="text-zinc-300 py-2 px-4 rounded hover:bg-zinc-800 transition">Projects</a>
          <a href="#" className="text-zinc-300 py-2 px-4 rounded hover:bg-zinc-800 transition">Analytics</a>
          <a href="#" className="text-zinc-300 py-2 px-4 rounded hover:bg-zinc-800 transition">Settings</a>
        </nav>
        <div className="flex-1" />
        <div className="text-zinc-500 text-xs text-center">© {new Date().getFullYear()} GitDev Admin</div>
      </aside>
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header bar */}
        <header className="w-full bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
              {user.imageUrl && (
                <img src={user.imageUrl} alt="User Avatar" className="h-10 w-10 object-cover rounded-full" />
              )}
            </div>
            <div>
              <div className="font-semibold text-white">{user.firstName} {user.lastName} <span className="ml-2 px-2 py-0.5 rounded bg-red-700 text-xs text-white font-bold align-middle">ADMIN</span></div>
              <div className="text-zinc-400 text-xs">Administrator</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-zinc-400 hover:text-white transition" title="Settings">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              </svg>
            </a>
            <a href="#" className="text-zinc-400 hover:text-red-500 transition" title="Logout">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 15l3-3m0 0l-3-3m3 3H9" />
              </svg>
            </a>
          </div>
        </header>
        {/* Main dashboard card */}
        <main className="flex-1 flex flex-col items-center justify-center py-8 px-2 md:px-8 bg-black">
          <div className="w-full max-w-4xl bg-zinc-900 rounded-xl shadow-xl border border-zinc-800 p-8 flex flex-col gap-8">
            {/* Dashboard Main Content (CreateForm) */}
            <CreateForm />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardPage
