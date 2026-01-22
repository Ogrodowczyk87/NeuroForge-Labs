import { Outlet } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { Navigation } from '@/components/layout/Navigation'

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-8">
        <Navigation />
        <main className="rounded-[2.5rem] border border-slate-200 bg-white/70 p-8 shadow-[0_40px_90px_rgba(15,23,42,0.12)]">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
