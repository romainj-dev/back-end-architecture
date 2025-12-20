import { DashboardSidebar } from '@/components/features/dashboard/commons/dashboard-sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background relative flex">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0 opacity-[0.2]" />
      <div className="fixed inset-0 bg-white pointer-events-none z-0" />

      <DashboardSidebar />
      <main className="flex-1 ml-72 px-6 py-10 z-10">{children}</main>
    </div>
  )
}
