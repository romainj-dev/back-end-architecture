export type Step = 'input' | 'processing'

export function ProgressSteps({ step }: { step: Step }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step === 'input'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground'
          }`}
        >
          1
        </div>
        <span className="text-sm font-medium text-foreground">Share</span>
      </div>
      <div className="h-0.5 w-12 bg-border"></div>
      <div className="flex items-center gap-2">
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step === 'processing'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground'
          }`}
        >
          2
        </div>
        <span className="text-sm font-medium text-foreground">Process</span>
      </div>
      <div className="h-0.5 w-12 bg-border"></div>
      <div className="flex items-center gap-2">
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium bg-secondary text-secondary-foreground`}
        >
          3
        </div>
        <span className="text-sm font-medium text-foreground">Review</span>
      </div>
    </div>
  )
}
