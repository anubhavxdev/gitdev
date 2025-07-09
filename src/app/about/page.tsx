'use client';

import { motion } from 'framer-motion';
import { Code, Github, Linkedin, Mail, Twitter, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// GitHub user data
const userData = {
  name: 'Anubhav Jaiswal',
  login: 'anubhavxdev',
  avatarUrl: 'https://avatars.githubusercontent.com/u/149222708?v=4',
  bio: 'Developer by Day, Gamer by night.',
  company: 'Lovely Professional University',
  location: 'Punjab, India',
  hireable: true,
  publicRepos: 63,
  followers: 22,
  following: 32,
  githubUrl: 'https://github.com/anubhavxdev',
  twitterUrl: 'https://twitter.com/anubhavxdev',
  linkedinUrl: 'https://linkedin.com/in/anubhavxdev',
  email: 'mailto:anubhavxdev@gmail.com',
  joinDate: 'October 2023',
};

// Sample repositories data (in a real app, you might want to fetch this)
const repositories = [
  {
    id: 'gitdev',
    name: 'GitDev',
    description: 'A modern GitHub repository management tool',
    html_url: 'https://github.com/anubhavxdev/gitdev',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2025-07-09T16:30:16Z',
  },
  {
    id: 'grow-my-therapy',
    name: 'Grow My Therapy',
    description: 'A creative and comprehensive assignment submission for the final stage of Grow My Therapy’s internship selection',
    html_url: 'https://github.com/anubhavxdev/Grow-My-Therapy',
    language: 'JavaScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2025-07-06T12:30:35Z',
    homepage: 'https://grow-my-therapy-khaki.vercel.app',
  },
  {
    id: 'cybersecurity-portal',
    name: 'Cybersecurity Awareness Portal',
    description: 'Cybercrime Awareness Portal with Admin Panel',
    html_url: 'https://github.com/anubhavxdev/Cybersecurity-Awareness-Portal',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2025-07-08T11:11:59Z',
  },
  {
    id: 'leetcode',
    name: 'Leetcode Solutions',
    description: 'Collection of LeetCode solutions',
    html_url: 'https://github.com/anubhavxdev/Leetcode_Summer',
    language: 'C',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2025-07-09T18:28:17Z',
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-full opacity-75 group-hover:opacity-100 transition duration-200 blur"></div>
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-red-500/30">
              <Image
                src={userData.avatarUrl}
                alt={`${userData.name}'s profile`}
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
              {userData.name}
            </h1>
            <p className="text-xl text-red-100/80 mt-2">@{userData.login}</p>
            <p className="mt-4 text-lg text-gray-300">{userData.bio}</p>
            
            <div className="mt-6 flex flex-wrap gap-4">
              <Link 
                href={userData.githubUrl} 
                target="_blank" 
                className="flex items-center gap-2 px-4 py-2 bg-red-900/30 hover:bg-red-900/50 border border-red-500/30 hover:border-red-400/50 rounded-lg transition-all hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </Link>
              {userData.linkedinUrl && (
                <Link 
                  href={userData.linkedinUrl} 
                  target="_blank" 
                  className="flex items-center gap-2 px-4 py-2 bg-blue-900/30 hover:bg-blue-900/50 border border-blue-500/30 hover:border-blue-400/50 rounded-lg transition-all"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </Link>
              )}
              {userData.twitterUrl && (
                <Link 
                  href={userData.twitterUrl} 
                  target="_blank" 
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-900/30 hover:bg-cyan-900/50 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg transition-all"
                >
                  <Twitter className="h-5 w-5" />
                  <span>Twitter</span>
                </Link>
              )}
              <Link 
                href={userData.email} 
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/50 hover:border-gray-600/50 rounded-lg transition-all"
              >
                <Mail className="h-5 w-5" />
                <span>Contact</span>
              </Link>
            </div>
            
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-black/40 p-4 rounded-lg border border-red-900/50">
                <p className="text-2xl font-bold text-red-400">{userData.publicRepos}+</p>
                <p className="text-sm text-gray-400">Repositories</p>
              </div>
              <div className="bg-black/40 p-4 rounded-lg border border-red-900/50">
                <p className="text-2xl font-bold text-red-400">{userData.followers}</p>
                <p className="text-sm text-gray-400">Followers</p>
              </div>
              <div className="bg-black/40 p-4 rounded-lg border border-red-900/50">
                <p className="text-2xl font-bold text-red-400">{userData.following}</p>
                <p className="text-sm text-gray-400">Following</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* About Section */}
      <div className="py-16 bg-gradient-to-b from-black to-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-red-900/50"
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500 mb-6">
              About Me
            </h2>
            <div className="space-y-6 text-gray-300">
              <p>
                Hello! I'm {userData.name}, a passionate developer currently studying at {userData.company}. 
                I love building web applications and solving complex problems with code.
              </p>
              <p>
                With a strong foundation in modern web technologies, I enjoy working on full-stack 
                development projects and exploring new tools and frameworks.
              </p>
              <p>
                When I'm not coding, you can find me gaming, contributing to open-source projects, 
                or learning something new in the ever-evolving world of technology.
              </p>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-200 mb-4">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  'TypeScript', 'JavaScript', 'React', 'Next.js', 'Node.js',
                  'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'Git', 'Docker',
                  'Python', 'C++', 'Java', 'Linux', 'AWS'
                ].map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 bg-red-900/30 text-red-300 text-sm rounded-full border border-red-800/50 hover:bg-red-800/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Projects Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500">
              Featured Projects
            </h2>
            <p className="mt-4 text-lg text-red-100/80 max-w-2xl mx-auto">
              Here are some of my recent projects that I've been working on.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repositories.map((repo) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                viewport={{ once: true }}
                className="group bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-red-900/50 hover:border-red-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white group-hover:text-red-300 transition-colors">
                      {repo.name}
                    </h3>
                    <Link 
                      href={repo.html_url} 
                      target="_blank" 
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label={`View ${repo.name} on GitHub`}
                    >
                      <ExternalLink className="h-5 w-5" />
                    </Link>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {repo.description || 'No description provided.'}
                  </p>
                  
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-red-900/30">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Code className="h-4 w-4" />
                      <span>{repo.language || 'Text'}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-400">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                        <span>{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        <span>{repo.forks_count}</span>
                      </div>
                    </div>
                  </div>
                  
                  {repo.homepage && (
                    <div className="mt-4 pt-3 border-t border-red-900/30">
                      <Link 
                        href={repo.homepage} 
                        target="_blank" 
                        className="inline-flex items-center text-sm text-red-400 hover:text-red-300 transition-colors"
                      >
                        <span>View Live Demo</span>
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link
              href={userData.githubUrl}
              target="_blank"
              className="inline-flex items-center px-6 py-3 border border-red-500/30 text-red-400 hover:bg-red-900/30 hover:border-red-400/50 rounded-lg transition-all hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
            >
              <Github className="h-5 w-5 mr-2" />
              View All Projects on GitHub
              <ExternalLink className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-black/90 border-t border-red-900/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-red-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                {userData.name.split(' ')[0]}
              </span>
            </div>
            <p className="mt-4 md:mt-0 text-sm text-red-100/60">
              © {new Date().getFullYear()} {userData.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
