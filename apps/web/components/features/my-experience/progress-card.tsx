import { GlassCard, GlassCardContent } from '@/components/ui/glass-card'
import { Progress } from '@radix-ui/react-progress'
import { AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function ProgressCard() {
  const completionPercentage = 60

  return (
    <GlassCard variant="accent" className="border-orange-200">
      <GlassCardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-orange-100 p-2 shrink-0">
            <AlertCircle className="h-5 w-5 text-orange-600" />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-sm font-medium text-foreground">
                Profile {completionPercentage}% Complete
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                Add more projects and details to unlock high-quality
                applications
              </p>
            </div>
            <Progress value={completionPercentage} className="h-2" />
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="text-xs bg-green-100 text-green-700 border-green-200"
              >
                ✓ Basic Info
              </Badge>
              <Badge
                variant="outline"
                className="text-xs bg-green-100 text-green-700 border-green-200"
              >
                ✓ 1 Role Added
              </Badge>
              <Badge
                variant="outline"
                className="text-xs bg-orange-100 text-orange-700 border-orange-200"
              >
                ⚠ Projects Incomplete
              </Badge>
              <Badge
                variant="outline"
                className="text-xs bg-orange-100 text-orange-700 border-orange-200"
              >
                ⚠ Skills Need Details
              </Badge>
            </div>
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  )
}
