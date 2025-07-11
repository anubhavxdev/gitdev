import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code2, Shield, Zap, Users, LayoutDashboard } from 'lucide-react';

const sidebarLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
  { name: 'Version Control', href: '/dashboard/version-control', icon: <Code2 className="h-5 w-5" /> },
  { name: 'Security & Compliance', href: '/dashboard/security', icon: <Shield className="h-5 w-5" /> },
  { name: 'CI/CD & Automation', href: '/dashboard/automation', icon: <Zap className="h-5 w-5" /> },
  { name: 'Collaboration Tools', href: '/dashboard/collaboration', icon: <Users className="h-5 w-5" /> },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-black/40 border-r border-red-900/40 min-h-screen p-4 flex flex-col gap-4 shadow-lg">
      <div className="mb-8 text-2xl font-bold text-white tracking-tight">
        GitDev
      </div>
      <nav className="flex flex-col gap-2">
        {sidebarLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-white hover:bg-gradient-to-r hover:from-red-900/30 hover:to-pink-900/30 hover:text-pink-400 transition-all font-medium ${
              pathname === link.href
                ? 'bg-gradient-to-r from-red-900/30 to-pink-900/30 text-pink-400'
                : ''
            }`}
          >
            <span className="text-lg">{link.icon}</span>
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
