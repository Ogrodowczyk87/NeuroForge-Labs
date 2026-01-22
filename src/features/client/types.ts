export type Metric = {
  label: string
  value: string
  detail: string
}

export type Project = {
  id: string
  title: string
  stage: string
  badgeClass: string
  created: string
  updated: string
  progress: number
  milestones: string[]
  focusIndex: number
  alerts: string[]
  budget: number
}

export type PipelineStage = {
  title: string
  due: string
  detail: string
  status: string
}

export type TimelineEvent = {
  title: string
  date: string
  tag: string
}

export type CartItem = {
  id: string
  title: string
  duration: string
  service: string
  tier: string
  qty: number
  unitCost: number
}

export type ActivityItem = {
  id: number
  author: string
  action: string
  timeAgo: string
}

export type InvoiceSummary = {
  id: string
  status: string
}
