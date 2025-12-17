import { ProfileSetupPrompt } from '@/components/features/dashboard/profile-setup-prompt'
import { QuickApplicationInput } from '@/components/features/dashboard/quick-application-input'
import {
  ApplicationsTable,
  type Application,
} from '@/components/features/dashboard/applications-table'

export const metadata = {
  title: 'Dashboard | ApplyMate',
  description: 'Your ApplyMate dashboard',
}

const mockApplications: Application[] = [
  {
    id: '1',
    company: 'Google',
    position: 'Senior Software Engineer',
    status: 'Interview',
    dateApplied: '2024-01-15',
    tags: ['Tech', 'Remote'],
  },
  {
    id: '2',
    company: 'Meta',
    position: 'Product Manager',
    status: 'Applied',
    dateApplied: '2024-01-12',
    tags: ['Tech', 'Leadership'],
  },
  {
    id: '3',
    company: 'Amazon',
    position: 'Frontend Developer',
    status: 'Accepted',
    dateApplied: '2024-01-10',
    tags: ['Tech', 'Frontend'],
  },
  {
    id: '4',
    company: 'Netflix',
    position: 'UX Designer',
    status: 'Rejected',
    dateApplied: '2024-01-08',
    tags: ['Design', 'Remote'],
  },
  {
    id: '5',
    company: 'Apple',
    position: 'iOS Engineer',
    status: 'Offer',
    dateApplied: '2024-01-05',
    tags: ['Tech', 'Mobile'],
  },
  {
    id: '6',
    company: 'Microsoft',
    position: 'Cloud Solutions Architect',
    status: 'Pending',
    dateApplied: '2024-01-20',
    tags: ['Tech', 'Cloud'],
  },
]

export default function DashboardEmptyPage() {
  const profile = { status: 'ready' } as { status: 'ready' | 'incomplete' }
  const hasProfileCompleted = profile.status !== 'ready'

  return (
    <div className="max-w-6xl space-y-6">
      <div className="mb-8 relative">
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-2">
            Welcome back, <span className="text-primary">Romain</span> 👋
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Let’s get back to business. Your command center is ready.
          </p>
        </div>
      </div>

      {!hasProfileCompleted && <ProfileSetupPrompt />}

      <QuickApplicationInput disabled={!hasProfileCompleted} />

      <ApplicationsTable
        items={!hasProfileCompleted ? null : mockApplications}
      />
    </div>
  )
}
