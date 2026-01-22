import type {
  Metric,
  Project,
  PipelineStage,
  TimelineEvent,
  CartItem,
  ActivityItem,
  InvoiceSummary,
} from './types'

export const METRICS: Metric[] = [
  { label: 'Active Projects', value: '10', detail: '+1 vs last quarter' },
  { label: 'In Progress Order', value: '86%', detail: 'RTL verification' },
  { label: 'Support Tickets', value: '1', detail: 'High priority' },
]

export const PROJECTS: Project[] = [
  {
    id: 'riscv',
    title: 'RISC-V Core A1',
    stage: 'Fabrication',
    badgeClass: 'bg-sky-500/15 text-sky-700',
    created: 'Jan 15, 2024',
    updated: 'Apr 10, 2024',
    progress: 62,
    milestones: ['Design', 'RTL', 'Fab', 'Validation'],
    focusIndex: 2,
    alerts: ['LVS test revisions pending', 'Specification due'],
    budget: 172120,
  },
  {
    id: 'arm',
    title: 'ARM SoC Rev.B',
    stage: 'RTL Model',
    badgeClass: 'bg-sky-500/15 text-sky-200',
    created: 'Feb 9, 2024',
    updated: 'Apr 9, 2024',
    progress: 48,
    milestones: ['Design', 'RTL', 'Fab', 'Validation'],
    focusIndex: 1,
    alerts: ['LVS check revisions pending', 'Build report shared'],
    budget: 126800,
  },
  {
    id: 'neurocore',
    title: 'NeuroCore Edge N5',
    stage: 'Design',
    badgeClass: 'bg-emerald-500/15 text-emerald-200',
    created: 'Mar 2, 2024',
    updated: 'Apr 12, 2024',
    progress: 28,
    milestones: ['Design', 'RTL', 'Fab', 'Validation'],
    focusIndex: 0,
    alerts: ['ISA draft review', 'Cache policy TBD'],
    budget: 98450,
  },
  {
    id: 'phoenix',
    title: 'Phoenix DSP Cluster',
    stage: 'Validation',
    badgeClass: 'bg-violet-500/15 text-violet-200',
    created: 'Jan 28, 2024',
    updated: 'Apr 11, 2024',
    progress: 72,
    milestones: ['Design', 'RTL', 'Fab', 'Validation'],
    focusIndex: 3,
    alerts: ['Vector tests failing', 'Thermal sweep queued'],
    budget: 163900,
  },
  {
    id: 'quantum',
    title: 'Quantum Accelerator QX1',
    stage: 'RTL Model',
    badgeClass: 'bg-pink-500/15 text-pink-200',
    created: 'Feb 20, 2024',
    updated: 'Apr 8, 2024',
    progress: 45,
    milestones: ['Design', 'RTL', 'Fab', 'Validation'],
    focusIndex: 1,
    alerts: ['Qubit mapping pending', 'Error correction review'],
    budget: 215300,
  },
  {
    id: 'zephyr',
    title: 'Zephyr IoT Z3',
    stage: 'Design',
    badgeClass: 'bg-cyan-500/15 text-cyan-200',
    created: 'Mar 5, 2024', 
    updated: 'Apr 10, 2024',
    progress: 30,
    milestones: ['Design', 'RTL', 'Fab', 'Validation'],
    focusIndex: 0,
    alerts: ['ISA draft review', 'Cache policy TBD'],
    budget: 98450,
  }  
]

export const EXTRA_PROJECTS: Project[] = [
  {
    id: 'neuro-edge',
    title: 'Neuro Edge V2',
    stage: 'Design',
    badgeClass: 'bg-emerald-500/15 text-emerald-200',
    created: 'Mar 18, 2024',
    updated: 'Apr 7, 2024',
    progress: 22,
    milestones: ['Design', 'RTL', 'Fab', 'Validation'],
    focusIndex: 0,
    alerts: ['Architectural review pending', 'DDR lane mapping'],
    budget: 89400,
  },
  {
    id: 'phoenix-io',
    title: 'Phoenix I/O Hub',
    stage: 'RTL Model',
    badgeClass: 'bg-sky-500/15 text-sky-200',
    created: 'Feb 27, 2024',
    updated: 'Apr 8, 2024',
    progress: 41,
    milestones: ['Design', 'RTL', 'Fab', 'Validation'],
    focusIndex: 1,
    alerts: ['CDC audit queued', 'I/O timing update'],
    budget: 116750,
  },
  {
    id: 'atlas-ai',
    title: 'Atlas AI Accelerator',
    stage: 'Validation',
    badgeClass: 'bg-violet-500/15 text-violet-200',
    created: 'Dec 12, 2023',
    updated: 'Apr 5, 2024',
    progress: 78,
    milestones: ['Design', 'RTL', 'Fab', 'Validation'],
    focusIndex: 3,
    alerts: ['Vector ops sign-off', 'Board bring-up'],
    budget: 214300,
  },
  {
    id: 'aurora-soc',
    title: 'Aurora SoC R3',
    stage: 'Fabrication',
    badgeClass: 'bg-sky-500/15 text-sky-700',
    created: 'Nov 2, 2023',
    updated: 'Apr 3, 2024',
    progress: 65,
    milestones: ['Design', 'RTL', 'Fab', 'Validation'],
    focusIndex: 2,
    alerts: ['Mask set delivery', 'Fab queue confirmed'],
    budget: 182640,
  },
]

export const ALL_PROJECTS: Project[] = [...PROJECTS, ...EXTRA_PROJECTS]

export const PIPELINE_STAGES: PipelineStage[] = [
  { title: 'Design', due: 'Apr 12', detail: 'Specification due', status: 'On schedule' },
  { title: 'RTL Model', due: 'Apr 16', detail: 'Timing report', status: 'Reviewing' },
  { title: 'Fabrication', due: 'Ongoing', detail: 'IP block setup', status: 'Awaiting masks' },
  { title: 'Validation & OEM', due: 'May 6', detail: 'Feeder board sign-off', status: 'Blocked' },
]

export const TIMELINE_EVENTS: TimelineEvent[] = [
  { title: 'Specification Due', date: 'Apr 11, 2024', tag: 'Design' },
  { title: 'RTL Sign-off', date: 'Apr 15, 2024', tag: 'RTL' },
  { title: 'Validation Slot', date: 'May 2, 2024', tag: 'Validation' },
]

export const CART_ITEMS: CartItem[] = [
  { id: 'rtl', title: 'RTL Code Review', duration: '8h', service: '24 hour support', tier: 'Medium', qty: 0, unitCost: 80 },
  { id: 'verification', title: 'Verification Sprint', duration: '24h', service: 'RISC-V · High', tier: 'Standard', qty: 0, unitCost: 140 },
  { id: 'drc', title: 'DRC/LVS Run', duration: 'Mask + LVS', service: 'Check package', tier: 'Medium', qty: 0, unitCost: 600 },
  { id: 'synthesis', title: 'Logic Synthesis', duration: '12h', service: 'EDA flow', tier: 'Standard', qty: 0, unitCost: 120 },
  { id: 'floorplan', title: 'Floorplanning Pass', duration: '10h', service: 'P&R setup', tier: 'Standard', qty: 0, unitCost: 120 },
  { id: 'timing', title: 'Timing Closure', duration: '16h', service: 'STA sweep', tier: 'High', qty: 0, unitCost: 170 },
  { id: 'power', title: 'Power Analysis', duration: '8h', service: 'Power + IR drop', tier: 'Medium', qty: 0, unitCost: 160 },
  { id: 'signoff', title: 'Sign-off Review', duration: '6h', service: 'Tape-out checklist', tier: 'High', qty: 0, unitCost: 250 },
  { id: 'bringup', title: 'Silicon Bring-up', duration: '14h', service: 'Lab validation', tier: 'High', qty: 0, unitCost: 250 },
]

export const ACTIVITY_FEED: ActivityItem[] = [
  { id: 1, author: 'Mindelay', action: 'adjusted verification scripts', timeAgo: '56m ago' },
  { id: 2, author: 'D.Vega', action: 'uploaded fabrication logs', timeAgo: '2h ago' },
  { id: 3, author: 'Automation Bot', action: 'completed regression suite 14', timeAgo: 'Yesterday' },
]

export const INVOICE_SUMMARY: InvoiceSummary = {
  id: '#DL-008807',
  status: 'Unpaid',
}
