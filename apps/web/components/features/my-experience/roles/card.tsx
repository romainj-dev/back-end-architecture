import { Building2, Calendar, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { GlassCard, GlassCardContent } from '@/components/ui/glass-card'
import { Role } from './data'

interface RolesCardProps {
  role: Role
  isSelected: boolean
  onClick: () => void
}

export function RolesCard({ role, isSelected, onClick }: RolesCardProps) {
  const isComplete = role.status === 'Complete'

  return (
    <GlassCard
      interactive={true}
      variant={isComplete ? 'primary' : 'accent'}
      selected={isSelected}
      className={`shrink-0 w-80`}
      onClick={onClick}
    >
      <GlassCardContent className="p-5">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-2">
                <Badge
                  variant="secondary"
                  className={`text-xs ${
                    isComplete
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {role.status}
                </Badge>
                {role.isCurrent && (
                  <Badge variant="outline" className="text-xs">
                    Current
                  </Badge>
                )}
              </div>
              <h4 className="font-semibold text-foreground">{role.title}</h4>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <Building2 className="h-3.5 w-3.5" />
                {role.company}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            {role.period} · {role.duration}
          </div>

          {isComplete ? (
            <>
              {role.techStack && (
                <div className="flex flex-wrap gap-1.5">
                  {role.techStack.slice(0, 4).map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs bg-primary/10 text-primary"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  {role.projectsCount} Projects · {role.achievementsCount}{' '}
                  Achievements
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-xs text-orange-600 font-medium">
                <AlertCircle className="h-3.5 w-3.5" />
                {role.missingDetails}
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  {role.projectsCount} Projects · Add more info
                </p>
              </div>
            </>
          )}
        </div>
      </GlassCardContent>
    </GlassCard>
  )
}
