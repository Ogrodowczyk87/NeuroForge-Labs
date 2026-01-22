import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { FormEvent } from 'react'

export function SignUpPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const successMessage = 'Account created. You can now sign in.'

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    navigate('/sign-in', { replace: true, state: { email, message: successMessage } })
  }

  return (
    <div className="mx-auto max-w-lg space-y-8 text-slate-900">
      <div className="space-y-3 text-center">
        <p className="tag inline-flex">Account</p>
        <h1 className="font-display text-3xl md:text-4xl">Create your workspace access</h1>
        <p className="text-slate-400">Provision your NeuroForge cockpit credentials in seconds.</p>
      </div>

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
            autoComplete="new-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-slate-900 outline-none transition focus:border-core"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-700">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
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
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-400">
        Already have access?{' '}
        <Link to="/sign-in" className="font-semibold text-core">
          Sign in instead
        </Link>
      </p>
    </div>
  )
}
