'use client';

import { Button } from '~/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Code, GitBranch, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { SignUpButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar />

      {/* Hero Section */}
      <main className="pt-24 pb-16 sm:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl"
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500">Supercharge Your</span>
              <span className="block bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent animate-text drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                Development Workflow
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-3 max-w-md mx-auto text-base text-red-100/80 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            >
              GitDev helps developers and teams manage their GitHub repositories with powerful tools for collaboration, automation, and insights.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-col sm:flex-row justify-center gap-6"
            >
              <SignUpButton mode="modal">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white text-lg py-6 px-8 rounded-xl font-semibold shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-1 transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]">
                  <span className="relative z-10">Start Free Trial</span>
                  <Zap className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/0 via-red-400/30 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                </Button>
              </SignUpButton>
              <Link href="/demo" className="w-full sm:w-auto group">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-2 border-red-500/30 text-red-300 hover:bg-red-500/10 hover:border-red-400/50 hover:text-red-200 text-lg py-6 px-8 rounded-xl font-medium transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                  <span className="relative z-10">Live Demo</span>
                  <GitBranch className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div id="features" className="mt-24 relative">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
            <div className="text-center relative z-10">
              <span className="inline-block mb-4 px-3 py-1 text-xs font-medium bg-red-500/10 text-red-400 rounded-full border border-red-500/20">POWERFUL FEATURES</span>
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500 sm:text-5xl drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                Everything you need to ship better code
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-red-100/80">
                Powerful features designed to help you and your team <span className="text-red-400 font-medium">succeed</span>.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: <Code className="h-8 w-8 text-red-500" />,
                  title: "Smart Code Reviews",
                  description: "Automated code quality checks and intelligent suggestions to improve your pull requests."
                },
                {
                  icon: <GitBranch className="h-8 w-8 text-pink-500" />,
                  title: "Branch Management",
                  description: "Visualize and manage your git branches with an intuitive interface."
                },
                {
                  icon: <Shield className="h-8 w-8 text-blue-500" />,
                  title: "Security First",
                  description: "Built-in vulnerability scanning and dependency management to keep your code secure."
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/40 p-8 rounded-2xl border border-red-900/50 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 backdrop-blur-sm group relative overflow-hidden"
                >
                  <div className="relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center mb-6 group-hover:shadow-[0_0_25px_rgba(239,68,68,0.3)] transition-shadow duration-300">
                    <div className="absolute inset-0.5 rounded-lg bg-black/80 flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-red-100 mb-3 group-hover:text-white transition-colors">{feature.title}</h3>
                  <p className="text-red-100/70 group-hover:text-red-100/90 transition-colors">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <div className="relative bg-black border-t border-red-900/30 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIiBvcGFjaXR5PSIwLjA1Ij4KPHBhdGggZD0iTTIwIDEwYzAgNS41MjMtNC40NzcgMTAtMTAgMTBzLTEwLTQuNDc3LTEwLTEwIDQuNDc3LTEwIDEwLTEwIDEwIDQuNDc3IDEwIDEweiIgc3Ryb2tlPSJyZ2JhKDI1NSw1MSw1MSwwLjMpIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz4KPC9zdmc+')]"></div>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500 sm:text-5xl drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">
              Ready to transform your workflow?
            </h2>
            <p className="mt-4 text-xl text-red-100/80">
              Join thousands of developers already using <span className="text-red-400 font-medium">GitDev</span>.
            </p>
            <div className="mt-8 group">
              <SignUpButton mode="modal">
                <Button size="lg" className="relative overflow-hidden bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white text-lg py-6 px-8 rounded-xl font-semibold shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-1 transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]">
                  <span className="relative z-10">Get Started for Free</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/0 via-red-400/30 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                </Button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/95 border-t border-red-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <Code className="h-8 w-8 text-red-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                GitDev
              </span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-base text-red-100/60">
              &copy; {new Date().getFullYear()} GitDev. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-red-100/50">
                Built with <span className="text-red-400">❤️</span> by <a href="https://github.com/anubhavxdev" className="text-red-300 hover:text-red-200 hover:underline transition-colors hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">Anubhav</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
