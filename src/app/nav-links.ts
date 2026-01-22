export interface AppNavLink {
  path: string
  label: string
}

export const navLinks: AppNavLink[] = [
  { path: '/', label: 'Home' },
  { path: '/architecture', label: 'Architecture' },
  { path: '/fabrication', label: 'Fabrication' },
  { path: '/optimization', label: 'Optimization' },
  { path: '/community', label: 'Validation & OEM' },
]
