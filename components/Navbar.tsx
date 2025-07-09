'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '~/components/ui/button';
import { Code, Menu, X } from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { LayoutDashboard } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        hasScrolled || pathname !== '/' ? 'bg-black/90 backdrop-blur-md border-b border-red-500/30' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <Code className="h-8 w-8 text-red-500 group-hover:text-red-400 transition-colors duration-300 group-hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.7)]" />
              <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent group-hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                GitDev
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
                      pathname === link.href
                        ? 'text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]'
                        : 'text-red-300 hover:text-red-400 hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-red-300 hover:bg-red-500/10 hover:text-white border border-red-500/30 hover:border-red-400/50 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-900/30 border border-red-500/30 hover:border-red-400/50 transition-colors">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" className="text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-red-500/30 hover:border-red-400/50 transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-medium shadow-lg shadow-red-500/20 hover:shadow-red-400/30 transition-all duration-300 group hover:drop-shadow-[0_0_15px_rgba(239,68,68,0.7)]">
                    Get Started
                  </Button>
                </SignUpButton>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/95 border-t border-red-500/20">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === link.href
                  ? 'text-red-400 bg-red-900/20'
                  : 'text-red-300 hover:bg-red-900/30 hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          {isSignedIn ? (
            <div className="pt-4 pb-3 border-t border-red-500/20 mt-2">
              <Link
                href="/dashboard"
                className="block px-3 py-2 rounded-md text-base font-medium text-red-300 hover:bg-red-900/30 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <div className="px-3 py-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-red-500/20 mt-2 space-y-2">
              <SignInButton mode="modal">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-300 hover:bg-red-900/30 hover:text-white"
                >
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500"
                >
                  Get Started
                </button>
              </SignUpButton>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
