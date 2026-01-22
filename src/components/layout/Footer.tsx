import { NavLink, useLocation } from 'react-router-dom'
import { navLinks } from '@/app/nav-links'

const footerContentByPath = {
  '/': {
    stack: [
      { title: 'EDA stack', value: 'OpenROAD · VPR · custom RTL' },
      { title: 'Fab pipeline', value: 'GF 12LP · multi project wafer' },
      { title: 'Quality control', value: 'PyTorch + Edge TPU testers' },
    ],
    signals: [
      { label: 'Tape-out', value: 'Q2 · 97% coverage', tone: 'bg-orbit/70' },
      { label: 'RTL optimization', value: 'Loop 7/9', tone: 'bg-core/70' },
      { label: 'Monte Carlo', value: 'stable jitter', tone: 'bg-plasma/60' },
    ],
  },
  '/architecture': {
    stack: [
      { title: 'Design suite', value: 'SystemVerilog · Chisel · SDC' },
      { title: 'Modeling', value: 'UVM · cocotb · formal checks' },
      { title: 'Libraries', value: 'RISC-V IP · cache macros' },
    ],
    signals: [
      { label: 'Spec lock', value: 'Rev 3 · sign-off', tone: 'bg-orbit/70' },
      { label: 'RTL lint', value: '92% coverage', tone: 'bg-core/70' },
      { label: 'Clock plan', value: 'phase 2/4', tone: 'bg-plasma/60' },
    ],
  },
  '/fabrication': {
    stack: [
      { title: 'Process', value: 'GF 12LP · MPW slot' },
      { title: 'Sign-off', value: 'DRC/LVS · EM/IR' },
      { title: 'Packaging', value: 'FCBGA · thermal stack' },
    ],
    signals: [
      { label: 'Mask set', value: 'Queued · 3 days', tone: 'bg-orbit/70' },
      { label: 'Wafer run', value: 'Lot 18 · active', tone: 'bg-core/70' },
      { label: 'Yield', value: 'Projected 91%', tone: 'bg-plasma/60' },
    ],
  },
  '/optimization': {
    stack: [
      { title: 'Perf tuning', value: 'PPA sweeps · LLVM' },
      { title: 'Power', value: 'DVFS · clock gating' },
      { title: 'Verification', value: 'Coverage · fuzzing' },
    ],
    signals: [
      { label: 'PPA delta', value: '-12% power', tone: 'bg-orbit/70' },
      { label: 'Hotspots', value: '3 blocks left', tone: 'bg-core/70' },
      { label: 'Regression', value: 'Run 5/8', tone: 'bg-plasma/60' },
    ],
  },
  '/community': {
    stack: [
      { title: 'Validation', value: 'Board bring-up · OEM' },
      { title: 'Test rigs', value: 'ATE · HIL benches' },
      { title: 'Feedback', value: 'Telemetry · issue triage' },
    ],
    signals: [
      { label: 'Field tests', value: 'Pilot batch 2', tone: 'bg-orbit/70' },
      { label: 'OEM status', value: 'Integration 80%', tone: 'bg-core/70' },
      { label: 'RMA rate', value: '0.7% trending', tone: 'bg-plasma/60' },
    ],
  },
} as const

export function Footer() {
  const year = new Date().getFullYear()
  const { pathname } = useLocation()
  const footerContent = footerContentByPath[pathname as keyof typeof footerContentByPath] ?? footerContentByPath['/']

  return (
    <footer className="mt-16 text-slate-700">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-gradient-to-br from-slate-100 via-white to-slate-50 px-8 py-10 shadow-[0_40px_100px_rgba(15,23,42,0.12)]">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -left-12 top-0 h-48 w-48 rounded-full bg-orbit/30 blur-[100px]" aria-hidden />
          <div className="absolute bottom-0 right-0 h-40 w-64 rounded-full bg-plasma/30 blur-[120px]" aria-hidden />
        </div>

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.5em] text-slate-400">NeuroForge</p>
            <h2 className="font-display text-3xl text-slate-900">Chip project wrap-up</h2>
            <p className="max-w-xl text-sm text-slate-400">
              We curate the entire journey from RTL to wafer, connecting interdisciplinary EDA, backend, and lab teams. Invite us for an audit or plug us into your existing pipeline.
            </p>
          </div>
          <button className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-core hover:bg-core hover:text-white">
            Book a process demo
          </button>
        </div>

        <div className="relative mt-10 grid gap-8 md:grid-cols-3">
          <section>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Navigation</p>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `inline-flex items-center gap-2 rounded-full px-4 py-2 transition ${
                        isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-core'
                      }`
                    }
                  >
                    <span className="h-1 w-1 rounded-full bg-core" aria-hidden />
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Stack</p>
            <ul className="mt-4 space-y-4 text-sm text-slate-600">
              {footerContent.stack.map((item) => (
                <li key={item.title} className="rounded-2xl border border-slate-200/70 bg-white px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.title}</p>
                  <p className="font-mono text-[0.85rem] text-slate-900">{item.value}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Status</p>
            <ul className="mt-4 space-y-4 text-sm">
              {footerContent.signals.map((signal) => (
                <li key={signal.label} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <span className="text-xs text-slate-400">{signal.label}</span>
                  <p className="font-mono text-slate-900">{signal.value}</p>
                  <span className={`mt-2 inline-flex h-2 w-16 rounded-full ${signal.tone}`} aria-hidden />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-4 text-xs text-slate-600 md:flex-row md:items-center md:justify-between">
        <p>© {year} NeuroForge · neuromorphic systems research.</p>
        <p className="font-mono text-[0.75rem] text-slate-500">React · Vite · Tailwind · Radix tokens</p>
      </div>
    </footer>
  )
}
