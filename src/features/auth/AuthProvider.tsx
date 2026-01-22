import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { AuthContext, type AuthContextValue } from '@/features/auth/AuthContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (!isMounted) return

      if (error) {
        console.error('Failed to fetch Supabase session', error)
      }

      setSession(session ?? null)
      setLoading(false)
    }

    fetchSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      loading,
      signOut: async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
          console.error('Supabase sign-out failed', error)
        }
      },
    }),
    [session, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

