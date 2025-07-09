'use client'

import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

export default function Home() {
  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full bg-black py-4 fixed top-0 left-0 z-10 flex justify-center">
        <div className="w-full max-w-6xl flex justify-between items-center px-4">
          <span className="text-red-600 font-bold text-3xl tracking-wide">
            GitDev
          </span>
          <div className="flex gap-6">
            <a href="#" className="text-white text-base hover:text-red-500">
              Home
            </a>
            <a href="#" className="text-white text-base hover:text-red-500">
              Features
            </a>
            <a href="#" className="text-white text-base hover:text-red-500">
              About
            </a>
            <a href="#" className="text-white text-base hover:text-red-500">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* SPACER */}
      <div className="h-16"></div>

      {/* HERO */}
      <div
        className="flex flex-col items-center justify-center px-4 py-12 min-h-screen w-full bg-black bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)),
            url("https://wallpapercave.com/wp/wp3082255.jpg")
          `,
        }}
      >
        <h1 className="text-red-600 text-6xl font-bold tracking-widest mb-6">
          GitDev
        </h1>
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">
            Welcome to GitDev
          </h2>
          <p className="text-lg text-zinc-200 mb-1">
            Your personal GitHub repository management tool.
          </p>
          <p className="text-md text-zinc-300">
            Explore, manage, and enhance your coding projects with ease.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-8 w-full max-w-md justify-center">
          <a href="/dashboard" className="w-full md:w-auto">
            <button className="w-full px-8 py-4 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xl font-semibold shadow-lg transition">
              Go to Dashboard
            </button>
          </a>
          <a href="/demo" className="w-full md:w-auto">
            <button className="w-full px-8 py-4 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xl font-semibold border border-zinc-700 shadow-lg transition">
              Try Demo
            </button>
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="w-full bg-black py-4 text-white fixed bottom-0 left-0 z-10 flex flex-col items-center text-sm">
        <p>© 2023 GitDev. All rights reserved.</p>
        <div className="flex gap-2 items-center mt-1">
          <span>Built with ❤️ by</span>
          <Avatar className="h-6 w-6">
            <AvatarImage src="https://github.com/anubhavxdev.png" />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          <span>Anubhav aka &quot;Logic&quot;</span>
        </div>
      </footer>
    </>
  )
}
