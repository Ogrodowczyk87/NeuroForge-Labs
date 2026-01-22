export type StageId = 'architecture' | 'fabrication' | 'optimization' | 'community'

export interface StageCard {
  id: StageId
  label: string
  path: string
  description: string
  accent: string
  metricLabel: string
  metricValue: string
  signal: string
}

export interface StageDetail {
  id: StageId
  title: string
  kicker: string
  summary: string
  description: string
  checklist: string[]
  metrics: { label: string; value: string }[]
  insights: { title: string; body: string }[]
  quote: string
  next: StageId | null
}

export const stageCards: StageCard[] = [
  {
    id: 'architecture',
    label: 'Core architecture',
    path: '/architecture',
    description:
      'Build ALU modules, pipelines, and memory controllers and validate them instantly in simulations.',
    accent: 'from-core/40 via-core/10 to-white/5',
    metricLabel: 'Simulation coverage',
    metricValue: '92%',
    signal: '12 pipeline variants / week',
  },
  {
    id: 'fabrication',
    label: 'Fabrication & masks',
    path: '/fabrication',
    description:
      'Turn the design into masks, prepare lithography recipes, and schedule foundry slots.',
    accent: 'from-orbit/50 via-ink to-white/5',
    metricLabel: 'Production windows',
    metricValue: '4 / quarter',
    signal: 'prep time < 36 h',
  },
  {
    id: 'optimization',
    label: 'Binning & optimization',
    path: '/optimization',
    description: 'Collect wafer-test data and dynamically tune voltage and frequency.',
    accent: 'from-plasma/40 via-plasma/10 to-white/5',
    metricLabel: 'Clock stability',
    metricValue: '99.2%',
    signal: 'TDP reduction -18%',
  },
  {
    id: 'community',
    label: 'System tests',
    path: '/community',
    description: 'Connect firmware, QA, and OEM partners during platform validation.',
    accent: 'from-white/20 via-orbit/20 to-transparent',
    metricLabel: 'Feedback time',
    metricValue: '48 min',
    signal: '57 active labs',
  },
]

export const stageDetails: Record<StageId, StageDetail> = {
  architecture: {
    id: 'architecture',
    title: 'Architecture & simulations',
    kicker: 'Level 01',
    summary: 'From an ISA sketch to a full RTL model powered by regression suites.',
    description:
      'Define core modules, balance pipelines, and stitch IP libraries without leaving the browser. Clock-network and cache templates accelerate every new iteration.',
    checklist: [
      'Generate ISA documentation and AXI/CHI interfaces',
      'Waveform simulations with dynamic power tracking',
      'Library of RISC-V, ARM, and custom accelerator blocks',
      'One-click netlist export to P&R flows',
    ],
    metrics: [
      { label: 'Average iteration time', value: '38 min' },
      { label: 'Test scenarios', value: '640+' },
      { label: 'Power consumption', value: '-14% vs previous gen' },
    ],
    insights: [
      {
        title: 'Automatic pipeline balancing',
        body: 'ML models suggest register moves to stay within the target clock budget.',
      },
      {
        title: 'Cache topology control',
        body: 'Compare L2/L3 variants in one dashboard and inject real-world workloads instantly.',
      },
      {
        title: 'Generated PDF reports',
        body: 'Share power, area, and risk reports with decision makers in minutes.',
      },
    ],
    quote: '“Simulating a 24-core design went from days to hours.”',
    next: 'fabrication',
  },
  fabrication: {
    id: 'fabrication',
    title: 'Fabrication & masks',
    kicker: 'Level 02',
    summary: 'Keep the design in sync with the fab, manage mask variants, and control production windows.',
    description:
      'The process panel exposes every step—from DRC to mask generation and run-card sign-off. Automated checklists remind teams about hot-spot analysis and wafer baking.',
    checklist: [
      'Integrate with DRC/LVS flows',
      'Generate run cards for foundry partners',
      'Monitor chamber temperatures straight from the browser',
      'Track mask history alongside approval revisions',
    ],
    metrics: [
      { label: 'Yield on first pass', value: '91%' },
      { label: 'GDS-to-mask time', value: '26 h' },
      { label: 'Quality alerts', value: '<1% of lots' },
    ],
    insights: [
      {
        title: 'Digital fab twin',
        body: 'See line load in real time and shift wafer slots dynamically.',
      },
      {
        title: 'Lithography recipes',
        body: 'Store exposure parameters and share them with PDK teams.',
      },
      {
        title: 'Automated SPC reports',
        body: 'Quality reports hit Slack/Teams within five minutes of measurement.',
      },
    ],
    quote: '“Preparing a new wafer lot no longer blocks the entire NPI crew.”',
    next: 'optimization',
  },
  optimization: {
    id: 'optimization',
    title: 'Binning & optimization',
    kicker: 'Level 03',
    summary: 'Process prober data and automatically create performance bins.',
    description:
      'The analytics engine compares temperature, voltage, and ECC error profiles to suggest new DVFS curves. Push the results into firmware systems with a single click.',
    checklist: [
      'Aggregate logs from probers and package testers',
      'Use ML algorithms to propose new operating points',
      'Track wafer lots down to individual dies',
      'Trigger TDP alerts for custom configurations',
    ],
    metrics: [
      { label: 'Scrap reduction', value: '-11%' },
      { label: 'Average binning time', value: '14 min' },
      { label: 'Voltage stability', value: '±8 mV' },
    ],
    insights: [
      {
        title: 'Power panel',
        body: 'Compare power and thermal curves for hundreds of dies simultaneously.',
      },
      {
        title: 'Firmware profile generator',
        body: 'Export DVFS settings into the firmware repo with one click.',
      },
      {
        title: '3D wafer map',
        body: 'Visualize localized risks and diagnose placement issues quickly.',
      },
    ],
    quote: '“We deploy new DVFS profiles in hours instead of weeks.”',
    next: 'community',
  },
  community: {
    id: 'community',
    title: 'System tests & community',
    kicker: 'Level 04',
    summary: 'Firmware, QA, and OEM partners test platforms in a single dashboard.',
    description:
      'The validation panel aggregates BIOS logs, power measurements, and pilot-customer feedback so you can close corrective actions faster.',
    checklist: [
      'Collaborative QA scenario library',
      'Integration with firmware CI and issue trackers',
      'Real-time feedback channels for OEM partners',
      'Auto-generated executive-ready status reports',
    ],
    metrics: [
      { label: 'Bug response time', value: '45 min' },
      { label: 'Scenario coverage', value: '96%' },
      { label: 'Pilot labs', value: '57 active' },
    ],
    insights: [
      {
        title: 'Firmware-hardware bridge',
        body: 'Correlate kernel logs with power data to pinpoint culprits faster.',
      },
      {
        title: 'Exec demo mode',
        body: 'Share KPI-friendly views for leadership status meetings.',
      },
      {
        title: 'Expert community',
        body: 'Invite partners and consultants to co-analyze risks.',
      },
    ],
    quote: '“OEM feedback is visible before the QA sprint even ends.”',
    next: null,
  },
}
