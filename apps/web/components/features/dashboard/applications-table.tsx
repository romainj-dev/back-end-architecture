'use client'

import { useState } from 'react'
import AdventureIllustration from './adventure-illustration'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Search,
  Filter,
  MoreHorizontal,
  Download,
  Eye,
  Trash2,
  Calendar,
  Building2,
  Briefcase,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export type ApplicationStatus =
  | 'Pending'
  | 'Accepted'
  | 'Applied'
  | 'Interview'
  | 'Rejected'
  | 'Offer'

export interface Application {
  id: string
  company: string
  position: string
  status: ApplicationStatus
  dateApplied: string
  tags: string[]
}

const statusConfig: Record<
  ApplicationStatus,
  { color: string; label: string }
> = {
  Pending: {
    color: 'bg-yellow-500/15 text-yellow-700 border-yellow-200',
    label: 'Pending',
  },
  Accepted: {
    color: 'bg-blue-500/15 text-blue-700 border-blue-200',
    label: 'Accepted',
  },
  Applied: {
    color: 'bg-indigo-500/15 text-indigo-700 border-indigo-200',
    label: 'Applied',
  },
  Interview: {
    color: 'bg-orange-500/15 text-orange-700 border-orange-200',
    label: 'Interview',
  },
  Rejected: {
    color: 'bg-red-500/15 text-red-700 border-red-200',
    label: 'Rejected',
  },
  Offer: {
    color: 'bg-green-500/15 text-green-700 border-green-200',
    label: 'Offer',
  },
}

export function ApplicationsTable({ items }: { items: null | Application[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'All'>(
    'All'
  )

  const isEmpty = items === null

  return (
    <GlassCard
      className={cn('overflow-hidden rounded-3xl', isEmpty ? 'opacity-90' : '')}
      size="none"
    >
      <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Applications
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage and track your job applications
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white/50 border-white/20 focus:bg-white transition-all w-full sm:w-64 rounded-xl"
              disabled={isEmpty}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 bg-white/50 border-white/20 hover:bg-white hover:text-primary transition-all rounded-xl"
                disabled={isEmpty}
              >
                <Filter className="h-4 w-4" />
                {statusFilter === 'All' ? 'Filter' : statusFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="rounded-xl border-white/20 glass"
            >
              <DropdownMenuItem onClick={() => setStatusFilter('All')}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/50" />
              {Object.keys(statusConfig).map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => setStatusFilter(status as ApplicationStatus)}
                >
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="relative">
        <Table>
          <TableHeader className="bg-primary/5 hover:bg-primary/5">
            <TableRow className="border-b border-white/10 hover:bg-transparent">
              <TableHead className="py-4 font-semibold text-primary pl-6">
                Company
              </TableHead>
              <TableHead className="py-4 font-semibold text-primary">
                Position
              </TableHead>
              <TableHead className="py-4 font-semibold text-primary">
                Status
              </TableHead>
              <TableHead className="py-4 font-semibold text-primary">
                Date Applied
              </TableHead>
              <TableHead className="py-4 font-semibold text-primary">
                Tags
              </TableHead>
              <TableHead className="py-4 font-semibold text-primary text-right pr-6">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isEmpty ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={6} className="h-64 border-none">
                  <div className="flex flex-col items-center justify-center h-full py-12 animate-in fade-in duration-500">
                    <div className="relative w-full max-w-[400px] aspect-[4/3] mb-8 group">
                      <AdventureIllustration />

                      {/* Absolute Positioned Labels - Fixed animations */}
                      <div className="absolute top-[25%] right-[22%] animate-in fade-in zoom-in duration-700 delay-300 fill-mode-forwards">
                        <div className="bg-white/95 backdrop-blur-sm border border-slate-200/60 shadow-sm px-3 py-1.5 rounded-xl transform -rotate-6 hover:rotate-0 transition-transform cursor-default">
                          <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Dream Job
                          </p>
                        </div>
                      </div>

                      <div className="absolute bottom-[28%] left-[15%] animate-in fade-in zoom-in duration-700 delay-150 fill-mode-forwards">
                        <div className="bg-white/95 backdrop-blur-sm border border-slate-200/60 shadow-sm px-3 py-1.5 rounded-xl transform rotate-3 hover:rotate-0 transition-transform cursor-default">
                          <p className="text-xs font-semibold text-slate-500">
                            You are here
                          </p>
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-b border-r border-slate-200/60"></div>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-3 text-center">
                      Ready to start your journey?
                    </h3>
                    <p className="text-muted-foreground max-w-[280px] sm:max-w-sm text-center text-sm leading-relaxed mb-8 whitespace-normal">
                      Your applications dashboard is waiting for its first
                      success story. Complete your profile to unlock full
                      tracking capabilities.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-12 text-muted-foreground"
                >
                  No applications found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              items.map((app) => (
                <TableRow
                  key={app.id}
                  className="border-b border-white/5 hover:bg-white/40 transition-colors group"
                >
                  <TableCell className="font-medium pl-6">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center border border-white/20">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                      </div>
                      {app.company}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-foreground/80">
                      {app.position}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn(
                        'border backdrop-blur-md shadow-sm font-medium',
                        statusConfig[app.status].color
                      )}
                    >
                      {statusConfig[app.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(app.dateApplied).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {app.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs bg-white/30 border-white/20 text-muted-foreground hover:bg-white/50 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary transition-colors data-[state=open]:bg-primary/10 data-[state=open]:text-primary"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="rounded-xl border-white/20 glass"
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-border/50" />
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="h-4 w-4 mr-2 text-primary" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Download className="h-4 w-4 mr-2" />
                          Documents
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-border/50" />
                        <DropdownMenuItem className="text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </GlassCard>
  )
}
