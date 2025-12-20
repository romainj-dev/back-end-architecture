import { Plus } from 'lucide-react'
import { GlassCard, GlassCardContent } from '@/components/ui/glass-card'
import { Role } from './data'
import { RolesCard } from './card'

interface RolesListProps {
  roles: Role[]
  selectedRoleId: string | null
  onSelectRole: (id: string) => void
}

export function RolesList({
  roles,
  selectedRoleId,
  onSelectRole,
}: RolesListProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2">
      {roles.map((role) => (
        <RolesCard
          key={role.id}
          role={role}
          isSelected={selectedRoleId === role.id}
          onClick={() => onSelectRole(role.id)}
        />
      ))}

      {/* Add new role card */}
      <GlassCard
        interactive={true}
        variant="dashed"
        className="shrink-0 w-80"
        onClick={() => {
          // Logic to add new role
          // console.log("Add new role")
        }}
      >
        <GlassCardContent className="p-5 flex items-center justify-center h-full min-h-[200px]">
          <div className="text-center space-y-2">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <p className="font-medium text-foreground">Add New Role</p>
            <p className="text-xs text-muted-foreground">
              Document another position
            </p>
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  )
}
