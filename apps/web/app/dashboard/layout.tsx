import { DashboardSidebar } from '@/components/features/dashboard/dashboard-sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <main className="ml-64 px-8 py-8">{children}</main>
    </div>
  )
}
