'use client';

import { motion } from 'framer-motion';
import { Code, GitBranch, Shield, Zap, GitPullRequest, GitCommit, GitMerge, GitCompare, GitBranchPlus, GitFork, GitGraph, GitPullRequestDraft, GitCompareArrows, Code2, Cpu, ShieldCheck, Lock, Globe, Terminal, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import { SignUpButton } from '@clerk/nextjs';

const FeaturesPage = () => {
  const { isSignedIn } = useUser();
  
  const heroFeatures = [
    {
      name: 'Code Collaboration',
      description: 'Seamlessly collaborate with your team on code',
      icon: <GitPullRequest className="h-6 w-6 text-red-400" />,
    },
    {
      name: 'Version Control',
      description: 'Powerful Git-based version control',
      icon: <GitBranch className="h-6 w-6 text-yellow-400" />,
    },
    {
      name: 'Security First',
      description: 'Enterprise-grade security for your code',
      icon: <ShieldCheck className="h-6 w-6 text-green-400" />,
    },
  ];

  const featureCategories = [
    {
      name: 'Code & Version Control',
      description: 'Powerful tools for managing your codebase',
      icon: <Code2 className="h-8 w-8 text-red-400" />,
      features: [
        {
          name: 'Git Integration',
          description: 'Full Git support with visual tools',
          icon: <GitBranch className="h-5 w-5 text-red-400" />,
        },
        {
          name: 'Branch Management',
          description: 'Easily create, compare, and merge branches',
          icon: <GitBranchPlus className="h-5 w-5 text-blue-400" />,
        },
        {
          name: 'Pull Requests',
          description: 'Code review tools and collaboration',
          icon: <GitPullRequest className="h-5 w-5 text-purple-400" />,
        },
        {
          name: 'Code Review',
          description: 'Inline comments and suggestions',
          icon: <GitCompareArrows className="h-5 w-5 text-green-400" />,
        },
      ],
    },
    {
      name: 'Security & Compliance',
      description: 'Keep your code secure and compliant',
      icon: <Shield className="h-8 w-8 text-yellow-400" />,
      features: [
        {
          name: 'Access Control',
          description: 'Fine-grained permissions for teams',
          icon: <Lock className="h-5 w-5 text-yellow-400" />,
        },
        {
          name: 'Audit Logs',
          description: 'Track all repository activities',
          icon: <ShieldCheck className="h-5 w-5 text-red-400" />,
        },
        {
          name: 'Compliance',
          description: 'Meet industry standards',
          icon: <Globe className="h-5 w-5 text-blue-400" />,
        },
        {
          name: 'Secrets Management',
          description: 'Secure storage for sensitive data',
          icon: <ShieldCheck className="h-5 w-5 text-green-400" />,
        },
      ],
    },
    {
      name: 'CI/CD & Automation',
      description: 'Automate your development workflow',
      icon: <Zap className="h-8 w-8 text-purple-400" />,
      features: [
        {
          name: 'Continuous Integration',
          description: 'Automated testing and building',
          icon: <GitCommit className="h-5 w-5 text-purple-400" />,
        },
        {
          name: 'Deployment',
          description: 'One-click deployments',
          icon: <GitMerge className="h-5 w-5 text-blue-400" />,
        },
        {
          name: 'Workflow Automation',
          description: 'Custom automation rules',
          icon: <Zap className="h-5 w-5 text-yellow-400" />,
        },
        {
          name: 'Container Registry',
          description: 'Store and manage Docker images',
          icon: <Cpu className="h-5 w-5 text-green-400" />,
        },
      ],
    },
    {
      name: 'Collaboration Tools',
      description: 'Work better together',
      icon: <Users className="h-8 w-8 text-blue-400" />,
      features: [
        {
          name: 'Team Management',
          description: 'Organize your team members',
          icon: <Users className="h-5 w-5 text-blue-400" />,
        },
        {
          name: 'Code Discussions',
          description: 'Discuss code changes in context',
          icon: <GitPullRequestDraft className="h-5 w-5 text-purple-400" />,
        },
        {
          name: 'Project Management',
          description: 'Track issues and tasks',
          icon: <GitGraph className="h-5 w-5 text-yellow-400" />,
        },
        {
          name: 'Documentation',
          description: 'Integrated project wikis',
          icon: <Terminal className="h-5 w-5 text-green-400" />,
        },
      ],
    },
  ];

  const stats = [
    { label: 'Repositories', value: '1M+' },
    { label: 'Developers', value: '500K+' },
    { label: 'Organizations', value: '50K+' },
    { label: 'Deployments', value: '10M+' },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-6">
              Powerful Features for Developers
            </h1>
            <p className="text-xl text-red-100/80 max-w-3xl mx-auto mb-12">
              Everything you need to build, ship, and maintain amazing software.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              {!isSignedIn && (
  <SignUpButton mode="modal">
    <Button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-medium px-8 py-6 text-lg rounded-xl shadow-lg shadow-red-500/20 hover:shadow-red-400/30 transition-all duration-300 group hover:drop-shadow-[0_0_15px_rgba(239,68,68,0.7)]">
      Get Started for Free
      <Zap className="ml-2 h-5 w-5 group-hover:animate-pulse" />
    </Button>
  </SignUpButton>
)}
              <Link href="/pricing">
                <Button variant="outline" className="bg-transparent border-red-500/30 text-red-300 hover:bg-red-900/20 hover:border-red-400/50 hover:text-white font-medium px-8 py-6 text-lg rounded-xl transition-all duration-300">
                  View Pricing
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {heroFeatures.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-red-900/50 hover:border-red-500/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-red-900/30 flex items-center justify-center mb-4 border border-red-500/30">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.name}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-red-500/10 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl opacity-20"></div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16 bg-gradient-to-b from-black to-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {featureCategories.map((category, categoryIndex) => (
            <div key={category.name} className="mb-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="p-2 rounded-lg bg-red-900/30 border border-red-500/30">
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500">
                    {category.name}
                  </h2>
                  <p className="text-red-100/80">{category.description}</p>
                </div>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.features.map((feature, featureIndex) => (
                  <motion.div
                    key={feature.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.05 * featureIndex,
                    }}
                    className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-red-900/50 hover:border-red-500/50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-red-900/30 flex items-center justify-center mb-4 border border-red-500/30 group-hover:bg-red-900/50 group-hover:border-red-400/50 transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.name}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-b from-black to-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500 mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-red-100/80 mb-10 max-w-2xl mx-auto">
              Join thousands of developers and teams who are building amazing things with GitDev.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {!isSignedIn && (
  <SignUpButton mode="modal">
    <Button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-medium px-8 py-6 text-lg rounded-xl shadow-lg shadow-red-500/20 hover:shadow-red-400/30 transition-all duration-300 group hover:drop-shadow-[0_0_15px_rgba(239,68,68,0.7)]">
      Get Started for Free
      <Zap className="ml-2 h-5 w-5 group-hover:animate-pulse" />
    </Button>
  </SignUpButton>
)}
              <Link href="/pricing">
                <Button variant="outline" className="bg-transparent border-red-500/30 text-red-300 hover:bg-red-900/20 hover:border-red-400/50 hover:text-white font-medium px-8 py-6 text-lg rounded-xl transition-all duration-300">
                  View Pricing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
