export interface RoleProject {
  title: string
  period: string
  description: string
  achievements: string[]
}

export interface Role {
  id: string
  title: string
  company: string
  location?: string // Not used currently but good to have
  period: string
  duration: string
  isCurrent?: boolean
  status: 'Complete' | 'Incomplete'
  techStack?: string[] // Optional for incomplete roles
  projectsCount: number
  achievementsCount?: number // Optional strings or count
  summary?: string
  methodology?: string[]
  teamStructure?: string
  keyAchievements?: string[]
  projects?: RoleProject[]
  missingDetails?: string
}

export const ROLES: Role[] = [
  {
    id: 'role1',
    title: 'Senior Full-Stack Developer',
    company: 'TechCorp Inc.',
    period: 'Jan 2022 - Present',
    duration: '2.5 years',
    isCurrent: true,
    status: 'Complete',
    techStack: [
      'React',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'AWS',
      'Docker',
      'GraphQL',
    ],
    projectsCount: 2,
    achievementsCount: 3,
    summary:
      'Leading development of cloud-based SaaS platform serving 100K+ enterprise users. Architecting scalable microservices, mentoring junior developers, and driving technical decisions across the engineering team.',
    methodology: ['Agile', 'Scrum'],
    teamStructure: '8 Engineers, 2 PMs, 3 Designers',
    keyAchievements: [
      'Reduced API response time by 60% through database optimization',
      'Led migration to microservices architecture serving 100K+ users',
    ],
    projects: [
      {
        title: 'Real-time Analytics Dashboard',
        period: 'Q1 2024 - Q2 2024 · 6 months',
        description:
          'Built real-time analytics dashboard processing 1M+ events/day using React, WebSockets, and Redis. Implemented data visualization with D3.js and optimized rendering for large datasets.',
        achievements: [
          'Achieved sub-second load times for complex visualizations',
          '95% positive user feedback on new dashboard features',
        ],
      },
    ],
  },
  {
    id: 'role2',
    title: 'Full-Stack Developer',
    company: 'StartupHub',
    period: 'Jun 2020 - Dec 2021',
    duration: '1.5 years',
    status: 'Incomplete',
    projectsCount: 0,
    missingDetails: 'Missing projects and details',
    summary: 'Early-stage startup development...',
  },
]
