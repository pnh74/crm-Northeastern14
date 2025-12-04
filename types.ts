export enum PipelineStage {
  NEW = 'New',
  CONTACTED = 'Contacted',
  QUALIFIED = 'Qualified',
  PROPOSAL = 'Proposal',
  CLOSED_WON = 'Closed-Won',
  CLOSED_LOST = 'Closed-Lost'
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  value: number;
  email: string;
  stage: PipelineStage;
  avatarUrl: string;
  lastActivity: string;
  streak: number; // Gamification: Days active/engaged
  tags: string[];
}

export interface Metric {
  label: string;
  value: string;
  trend: number; // Percentage
  positive: boolean;
}

export interface ChartData {
  name: string;
  value: number;
}

export type ViewState = 'dashboard' | 'pipeline' | 'leads' | 'billing' | 'settings';