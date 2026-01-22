import { Link, NavLink, useNavigate } from 'react-router-dom'
import { navLinks } from '@/app/nav-links'
import { useAuth } from '@/features/auth/AuthContext'

export function Navigation() {
  const navigate = useNavigate()
  const { session, loading, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    navigate('/', { replace: true })
  }

  return (
    <header className="mb-10 space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.5em] text-slate-400">NeuroForge</p>
          <h1 className="font-display text-3xl text-slate-900 md:text-4xl">Processor Design Laboratory</h1>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-mono uppercase tracking-[0.4em] text-slate-600">
          LIVE STATUS
          <span
            className={`h-2 w-2 rounded-full ${
              session ? 'bg-orbit shadow-aurora' : 'bg-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.6)]'
            }`}
            aria-hidden
          />
        </span>
      </div>
      <nav className="flex flex-wrap items-center gap-3">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/'}
            className={({ isActive }) =>
              `inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
                isActive ? 'bg-core text-white shadow-core' : 'border border-slate-200 text-slate-700 hover:border-core/60'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
        {loading ? (
          <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600">
            Checking session…
          </span>
        ) : session ? (
          <div className="ml-auto flex w-full flex-col gap-3 md:w-auto md:flex-row">
            <Link
              to="/client-panel"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-core/40 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:border-core"
            >
              Dashboard
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5"
            >
              Log out
            </button>
          </div>
        ) : (
          <Link
            to="/sign-in"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 md:ml-auto md:w-auto"
          >
            Log in
          </Link>
        )}
      </nav>
    </header>
  )
}
