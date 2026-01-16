'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { DashboardHeader } from '@/components/features/dashboard/commons/header'
import { ProgressCard } from '@/components/features/my-experience/progress-card'
import { TechnicalSkills } from '@/components/features/my-experience/technical-skills'
import { ROLES } from '@/components/features/my-experience/roles/data'
import { RolesList } from '@/components/features/my-experience/roles/list'
import { RolesDetail } from '@/components/features/my-experience/roles/detail'
import {
  getExperienceProfileClient,
  experienceProfileKeys,
} from '@/app/dashboard/my-experience/_data/experience-profile.query'

export default function ProfileOngoingPage() {
  useQuery({
    queryKey: experienceProfileKeys.profile(),
    queryFn: getExperienceProfileClient,
  })

  const [selectedRoleId, setSelectedRoleId] = useState<string | null>('role1')

  const selectedRole = ROLES.find((r) => r.id === selectedRoleId)

  return (
    <div className="max-w-6xl space-y-6">
      <DashboardHeader
        title="Professional Experience"
        subtitle="Build your tech profile by documenting roles, projects, and achievements"
      />

      {/* Progress card */}
      <ProgressCard />

      {/* Technical skills */}
      <TechnicalSkills />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Your Roles</h3>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Role
          </Button>
        </div>

        <RolesList
          roles={ROLES}
          selectedRoleId={selectedRoleId}
          onSelectRole={setSelectedRoleId}
        />
      </div>

      {/* Right: Selected role details */}
      <div className="lg:col-span-2 space-y-6">
        {selectedRole && <RolesDetail role={selectedRole} />}
      </div>
    </div>
  )
}
