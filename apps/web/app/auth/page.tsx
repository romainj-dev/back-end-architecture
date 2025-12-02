import { AuthForm } from '@/components/auth-form'
import Link from 'next/link'

export const metadata = {
  title: 'Sign In | ApplyMate',
  description:
    'Sign in to ApplyMate to create tailored job applications powered by AI.',
}

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Branding */}
      <div className="lg:w-1/2 bg-blue-600 p-8 lg:p-12 flex flex-col justify-between relative">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%">
            <pattern
              id="dots"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="2" fill="white" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="relative z-10">
          <Link href="/" className="text-2xl font-bold text-white inline-block">
            ApplyMate
          </Link>
        </div>

        <div className="relative z-10 space-y-6 my-8 lg:my-0">
          <h1 className="text-3xl lg:text-4xl font-bold text-white text-balance">
            Land your dream job with AI-powered applications
          </h1>
          <p className="text-lg lg:text-xl text-blue-100 text-pretty">
            Create tailored resumes and cover letters that beat AI filters and
            get you noticed by recruiters.
          </p>

          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-white">Beat AI filters and ATS systems</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-white">Generate applications in seconds</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-white">Track all your applications</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-6 lg:gap-8 text-sm">
          <div>
            <div className="text-xl lg:text-2xl font-bold text-white">
              10,000+
            </div>
            <div className="text-blue-100 text-sm">Applications</div>
          </div>
          <div className="h-10 lg:h-12 w-px bg-white/20" />
          <div>
            <div className="text-xl lg:text-2xl font-bold text-white">95%</div>
            <div className="text-blue-100 text-sm">Success rate</div>
          </div>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <AuthForm />
        </div>
      </div>
    </div>
  )
}
