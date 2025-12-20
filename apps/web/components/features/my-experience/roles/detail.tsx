import {
  Calendar,
  Edit2,
  Code2,
  Target,
  Users,
  FolderGit2,
  Plus,
  AlertCircle,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  GlassCard,
  GlassCardContent,
  GlassCardHeader,
  GlassCardTitle,
} from '@/components/ui/glass-card'
import { Role } from './data'

interface RolesDetailProps {
  role: Role
}

export function RolesDetail({ role }: RolesDetailProps) {
  const isComplete = role.status === 'Complete'

  return (
    <GlassCard variant={!isComplete ? 'accent' : 'default'}>
      <GlassCardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <GlassCardTitle className="text-xl">{role.title}</GlassCardTitle>
            <p className="text-sm text-muted-foreground mt-1">{role.company}</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-primary" />
                {role.period} · {role.duration}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      </GlassCardHeader>
      <GlassCardContent className="space-y-6">
        {!isComplete ? (
          <div className="bg-orange-50/50 border border-orange-200 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  This role needs more details
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Add projects, tech stack, and achievements to strengthen your
                  profile
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit2 className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </div>
          </div>
        ) : null}

        {/* Role summary */}
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-2">
            Role Summary
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {role.summary}
          </p>
        </div>

        {isComplete && (
          <>
            {/* Tech Stack */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Code2 className="h-4 w-4 text-primary" />
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {role.techStack?.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Methodology & Team */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  Methodology
                </h4>
                <div className="flex flex-wrap gap-2">
                  {role.methodology?.map((method) => (
                    <Badge key={method} variant="outline">
                      {method}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  Team
                </h4>
                <p className="text-sm text-muted-foreground">
                  {role.teamStructure}
                </p>
              </div>
            </div>

            {/* Key achievements */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">
                Key Achievements
              </h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {role.keyAchievements?.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Projects */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <FolderGit2 className="h-4 w-4 text-primary" />
                  Notable Projects
                </h4>
                <Button variant="ghost" size="sm">
                  <Plus className="h-3 w-3 mr-1" />
                  Add Project
                </Button>
              </div>
              <div className="space-y-3">
                {role.projects?.map((project, i) => (
                  <GlassCard key={i} variant="primary">
                    <GlassCardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="font-semibold text-foreground">
                            {project.title}
                          </h5>
                          <p className="text-xs text-muted-foreground mt-1">
                            {project.period}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                      <div>
                        <p className="text-xs font-medium text-foreground mb-1.5">
                          Achievements
                        </p>
                        <ul className="space-y-1 text-xs text-muted-foreground">
                          {project.achievements.map((achievement, j) => (
                            <li key={j} className="flex items-start gap-1.5">
                              <span className="text-green-600 mt-0.5">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </GlassCardContent>
                  </GlassCard>
                ))}
              </div>
            </div>
          </>
        )}
      </GlassCardContent>
    </GlassCard>
  )
}
