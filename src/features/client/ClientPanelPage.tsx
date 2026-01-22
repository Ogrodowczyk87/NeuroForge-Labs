import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'
import { ClientPanelHeader } from '@/features/client/components/ClientPanelHeader'
import { ProjectsSection } from '@/features/client/components/ProjectsSection'
import { PipelineSection } from '@/features/client/components/PipelineSection'
import { CartSection } from '@/features/client/components/CartSection'
import { ActivitySection } from '@/features/client/components/ActivitySection'
import { AccountSection } from '@/features/client/components/AccountSection'
import type { CartItem } from '@/features/client/types'
import {
  ACTIVITY_FEED,
  CART_ITEMS,
  ALL_PROJECTS,
  INVOICE_SUMMARY,
  METRICS,
  PIPELINE_STAGES,
  TIMELINE_EVENTS,
} from '@/features/client/panelData'

export function ClientPanelPage() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [cartItems, setCartItems] = useState<CartItem[]>(() => CART_ITEMS.map((item) => ({ ...item })))

  const handleSignOut = useCallback(async () => {
    await signOut()
    navigate('/sign-in', { replace: true })
  }, [navigate, signOut])

  const adjustCartQuantity = useCallback((id: string, delta: number) => {
    setCartItems((previous) =>
      previous.map((item) => {
        if (item.id !== id) {
          return item
        }

        const nextQty = Math.max(0, item.qty + delta)
        if (nextQty === item.qty) {
          return item
        }

        return { ...item, qty: nextQty }
      }),
    )
  }, [])

  const handleIncrement = useCallback((id: string) => adjustCartQuantity(id, 1), [adjustCartQuantity])
  const handleDecrement = useCallback((id: string) => adjustCartQuantity(id, -1), [adjustCartQuantity])
  const totalCart = useMemo(() => cartItems.reduce((sum, item) => sum + item.qty * item.unitCost, 0), [cartItems])
  const handleCheckout = useCallback(() => {
    const checkoutItems =  cartItems.filter((item) => item.qty > 0)
    navigate('/checkout', { state: { items: checkoutItems, total: totalCart } })
  }, [cartItems, navigate, totalCart])
  const firstName = user?.email?.split('@')[0] ?? 'Engineer'

  return (
    <div className="relative space-y-10 text-slate-900">
      <GradientBackdrop />
      <ClientPanelHeader firstName={firstName} onSignOut={handleSignOut} metrics={METRICS} />

      <div className="grid gap-8 xl:grid-cols-[2.4fr_1fr]">
        <div className="space-y-8">
          <ProjectsSection projects={ALL_PROJECTS} />
          <PipelineSection stages={PIPELINE_STAGES} events={TIMELINE_EVENTS} />
        </div>
        <aside className="space-y-6">
          <CartSection
            items={cartItems}
            total={totalCart}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onCheckout={handleCheckout}
          />
          <ActivitySection entries={ACTIVITY_FEED} />
          <AccountSection invoice={INVOICE_SUMMARY} total={totalCart} />
        </aside>
      </div>
    </div>
  )
}

function GradientBackdrop() {
  return (
    <>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.08),_transparent_60%)]" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,_rgba(14,165,233,0.12),_transparent_55%)]" />
    </>
  )
}
