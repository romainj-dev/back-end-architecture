export function DashboardHeader({
  title,
  subtitle,
}: {
  title: string | React.ReactNode
  subtitle: string
}) {
  return (
    <div className="mb-8 relative">
      <div className="relative z-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-2">
          {title}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">{subtitle}</p>
      </div>
    </div>
  )
}
