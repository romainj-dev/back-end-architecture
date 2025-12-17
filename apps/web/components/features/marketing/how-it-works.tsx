import { Upload, FileText, Sparkles } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: 'Upload resume & profile setup',
    description:
      'Upload your existing resume and connect your LinkedIn profile to get started in seconds.',
  },
  {
    icon: FileText,
    title: 'Paste job description',
    description:
      'Simply paste the job posting URL or description for any role you want to apply to.',
  },
  {
    icon: Sparkles,
    title: 'Get AI-generated materials',
    description:
      'Receive a tailored resume, cover letter, and application answers optimized for AI filters.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-32 border-t border-border"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 md:text-5xl text-balance">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Three simple steps to transform your job application process
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 border border-accent/20">
                  <step.icon className="h-8 w-8 text-accent" />
                </div>
                <div className="mb-2 text-sm font-medium text-accent">
                  Step {index + 1}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-balance">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-balance leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
