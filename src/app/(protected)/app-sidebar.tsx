'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '~/lib/utils'

import {
  BotIcon,
  CreditCardIcon,
  LayoutDashboardIcon,
  Plus,
  Presentation,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
} from '~/components/ui/sidebar'
import { Button } from '~/components/ui/button'

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboardIcon,
  },
  {
    title: 'Q&A',
    url: '/qa',
    icon: BotIcon,
  },
  {
    title: 'Meetings',
    url: '/meetings',
    icon: Presentation,
  },
  {
    title: 'Billing',
    url: '/billing',
    icon: CreditCardIcon,
  },
]

const projects = [
  { name: 'Project Alpha', url: '/projects/alpha' },
  { name: 'Project Beta', url: '/projects/beta' },
  { name: 'Project Gamma', url: '/projects/gamma' },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible variant="floating">
      <SidebarHeader>Logo</SidebarHeader>

      <SidebarContent>
        {/* Application Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={cn(
                        'flex gap-2 items-center px-2 py-1 rounded hover:bg-primary/10',
                        {
                          'bg-primary text-white': pathname === item.url,
                        }
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Projects Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((project) => (
                <SidebarMenuItem key={project.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={project.url}
                      className={cn(
                        'flex gap-2 items-center px-2 py-1 rounded hover:bg-primary/10',
                        {
                          'bg-primary text-white': pathname === project.url,
                        }
                      )}
                    >
                      <div
                        className={cn(
                          'rounded-sm border size-6 flex items-center justify-center text-xs bg-white text-primary mr-2',
                          {
                            'bg-primary text-white': pathname === project.url,
                          }
                        )}
                      >
                        {project.name.charAt(0)}
                      </div>
                      <span>{project.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <div className="h-2"></div>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/create">
                    <Button
                      variant="outline"
                      className="w-full flex gap-2 items-center justify-center"
                    >
                      <Plus size={16} />
                      Create Project
                    </Button>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
