import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '@/features/auth/AuthContext'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600">
        Checking credentials…
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/sign-in" replace state={{ redirectTo: location.pathname }} />
  }

  return <>{children}</>
}
