import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, ArrowRight } from 'lucide-react'

export function ProfileSetupPrompt() {
  return (
    <Card className="border-orange-200 bg-orange-50/50">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-orange-100 p-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">
              Complete Your Profile to Get Started
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Before you can start applying to jobs, we need some information to
              help us tailor your resumes and cover letters. Set up your profile
              with your work experience, skills, and preferences.
            </p>
            <Button asChild>
              <Link href="/dashboard/profile">
                Set Up Profile
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
