'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Settings,
  BarChart3,
  Rocket,
  List,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'My Experience',
    href: '/dashboard/my-experience',
    icon: List,
  },
  {
    label: 'My Goal',
    href: '/dashboard/my-goal',
    icon: Rocket,
  },
  {
    label: 'Statistics',
    href: '/dashboard/statistics',
    icon: BarChart3,
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

import { GlassCard } from '@/components/ui/glass-card'

// ... existing imports

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <GlassCard
      asChild
      size="none"
      className="fixed left-6 top-6 bottom-6 w-64 rounded-3xl flex flex-col z-50 shadow-2xl"
    >
      <aside>
        {/* Brand Section */}
        <div className="p-6 pb-2">
          <Link href="/" className="flex items-center gap-3 px-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none tracking-tight">
                ApplyMate
              </span>
              <span className="text-[10px] bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-medium uppercase tracking-wider">
                Workspace
              </span>
            </div>
          </Link>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-4 opacity-50" />

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto py-2">
          <div className="text-xs font-semibold text-muted-foreground/50 px-4 mb-2 uppercase tracking-widest">
            Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 relative overflow-hidden',
                  isActive
                    ? 'bg-primary/10 text-primary shadow-sm hover:bg-primary/15'
                    : 'text-muted-foreground hover:bg-white/50 hover:text-foreground hover:shadow-sm'
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-primary rounded-r-full" />
                )}
                <Icon
                  className={cn(
                    'h-5 w-5 transition-transform duration-300 group-hover:scale-110',
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground/70 group-hover:text-primary'
                  )}
                />
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <div className="absolute inset-0 bg-primary/5 rounded-2xl -z-0 animate-pulse" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 mt-auto">
          <Link href="/dashboard/profile">
            <div className="bg-white/40 p-1 rounded-2xl border border-white/20 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/50 transition-colors cursor-pointer group">
                <div className="relative">
                  <Avatar className="h-10 w-10 border-2 border-white shadow-sm group-hover:border-primary/20 transition-colors">
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="User"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-100 to-indigo-100 text-primary font-bold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                    John Doe
                  </p>
                  <div className="flex items-center gap-1.5">
                    <Badge
                      variant="secondary"
                      className="px-1.5 py-0 h-5 text-[10px] bg-white/50 text-muted-foreground border-0"
                    >
                      Free plan
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </aside>
    </GlassCard>
  )
}
