'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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
} from '@/components/ui/dropdown-menu'
import {
  Search,
  Filter,
  MoreVertical,
  Download,
  Eye,
  Trash2,
} from 'lucide-react'

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

const statusColors: Record<ApplicationStatus, string> = {
  Pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  Accepted: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  Applied: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
  Interview: 'bg-orange-100 text-orange-800 hover:bg-orange-100',
  Rejected: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
  Offer: 'bg-green-100 text-green-800 hover:bg-green-100',
}

export function ApplicationsTable({ items }: { items: null | Application[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'All'>(
    'All'
  )

  const isEmpty = items === null

  return (
    <Card className={isEmpty ? 'opacity-60' : ''}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Applications</CardTitle>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by company, position, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                disabled={isEmpty}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 bg-transparent"
                  disabled={isEmpty}
                >
                  <Filter className="h-4 w-4" />
                  {statusFilter === 'All' ? 'All Status' : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setStatusFilter('All')}>
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('Pending')}>
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('Accepted')}>
                  Accepted
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('Applied')}>
                  Applied
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('Interview')}>
                  Interview
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('Rejected')}>
                  Rejected
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('Offer')}>
                  Offer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isEmpty ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64">
                    <div className="flex flex-col items-center justify-center h-full">
                      <svg
                        className="w-48 h-48 mb-4 text-muted-foreground/30"
                        viewBox="0 0 200 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="40"
                          y="60"
                          width="120"
                          height="100"
                          rx="8"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M40 80 L160 80"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <circle cx="60" cy="70" r="3" fill="currentColor" />
                        <circle cx="70" cy="70" r="3" fill="currentColor" />
                        <circle cx="80" cy="70" r="3" fill="currentColor" />
                        <rect
                          x="55"
                          y="100"
                          width="40"
                          height="8"
                          rx="4"
                          fill="currentColor"
                          opacity="0.3"
                        />
                        <rect
                          x="105"
                          y="100"
                          width="45"
                          height="8"
                          rx="4"
                          fill="currentColor"
                          opacity="0.3"
                        />
                        <rect
                          x="55"
                          y="120"
                          width="90"
                          height="8"
                          rx="4"
                          fill="currentColor"
                          opacity="0.3"
                        />
                        <rect
                          x="55"
                          y="140"
                          width="70"
                          height="8"
                          rx="4"
                          fill="currentColor"
                          opacity="0.3"
                        />
                        <path
                          d="M80 40 L100 40 L100 60"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M95 55 L100 60 L105 55"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-muted-foreground font-medium mb-1">
                        No applications yet
                      </p>
                      <p className="text-sm text-muted-foreground/70">
                        Complete your profile to start tracking job applications
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : items.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No applications found
                  </TableCell>
                </TableRow>
              ) : (
                items.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.company}</TableCell>
                    <TableCell>{app.position}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={statusColors[app.status]}
                      >
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(app.dateApplied).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {app.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download Documents
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
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
      </CardContent>
    </Card>
  )
}
