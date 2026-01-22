import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { FormEvent } from 'react'

type SignInLocationState = {
  email?: string
  message?: string
  redirectTo?: string
} | null

export function SignInPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = (location.state as SignInLocationState) ?? null
  const redirectTo = locationState?.redirectTo ?? '/client-panel'
  const [email, setEmail] = useState(locationState?.email ?? '')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const successMessage = locationState?.message ?? null

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    navigate(redirectTo, { replace: true })
  }

  return (
    <div className="mx-auto max-w-lg space-y-8 text-slate-900">
      <div className="space-y-3 text-center">
        <p className="tag inline-flex">Account</p>
        <h1 className="font-display text-3xl md:text-4xl">Sign in to your workspace</h1>
        <p className="text-slate-400">Access the processor cockpit, reports, and lab integrations.</p>
      </div>

      {successMessage && (
        <p className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {successMessage}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-slate-200 bg-white p-8">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-slate-900 outline-none transition focus:border-core"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-semibold text-slate-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-slate-900 outline-none transition focus:border-core"
          />
        </div>

        {error && (
          <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-core px-6 py-3 font-semibold text-white shadow-core transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-400">
        Need an account?{' '}
        <Link to="/sign-up" className="font-semibold text-core">
          Create one now
        </Link>
        .
      </p>
    </div>
  )
}
