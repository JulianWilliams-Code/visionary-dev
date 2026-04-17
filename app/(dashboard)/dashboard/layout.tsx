import { redirect }       from 'next/navigation'
import { createClient }   from '@/lib/supabase/server'
import { DashboardNav }   from '@/components/dashboard/DashboardNav'
import type { SubscriptionPlan } from '@/lib/supabase/types'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // Auth guard — redirect unauthenticated users before rendering anything
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('plan')
    .eq('user_id', user.id)
    .maybeSingle()

  const plan = (subscription?.plan ?? 'free') as SubscriptionPlan

  return (
    <div className="min-h-screen bg-[--color-surface-2]">
      <DashboardNav plan={plan} />

      {/*
        pt-14  → clears the mobile sticky top bar (h-14)
        lg:pt-0 lg:pl-60 → desktop: no top offset, left offset for fixed sidebar
      */}
      <main className="pt-14 lg:pt-0 lg:pl-60">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}
