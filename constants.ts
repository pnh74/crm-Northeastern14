import { Lead, PipelineStage } from './types';

export const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    name: 'Elara Voke',
    company: 'Nebula Inc.',
    value: 12500,
    email: 'elara@nebula.io',
    stage: PipelineStage.NEW,
    avatarUrl: 'https://picsum.photos/64/64?random=1',
    lastActivity: '2h ago',
    streak: 3,
    tags: ['Enterprise', 'Q3']
  },
  {
    id: '2',
    name: 'Caelum Drift',
    company: 'Aero Dynamics',
    value: 8400,
    email: 'c.drift@aero.com',
    stage: PipelineStage.CONTACTED,
    avatarUrl: 'https://picsum.photos/64/64?random=2',
    lastActivity: '1d ago',
    streak: 5,
    tags: ['Referral']
  },
  {
    id: '3',
    name: 'Seren Kolda',
    company: 'Velocify',
    value: 24000,
    email: 's.kolda@velocify.net',
    stage: PipelineStage.QUALIFIED,
    avatarUrl: 'https://picsum.photos/64/64?random=3',
    lastActivity: '4h ago',
    streak: 12,
    tags: ['Hot Lead']
  },
  {
    id: '4',
    name: 'Jory Trel',
    company: 'Quantico',
    value: 5500,
    email: 'jory@quantico.ai',
    stage: PipelineStage.PROPOSAL,
    avatarUrl: 'https://picsum.photos/64/64?random=4',
    lastActivity: '30m ago',
    streak: 1,
    tags: ['SaaS']
  },
  {
    id: '5',
    name: 'Mira Solis',
    company: 'Lumina',
    value: 42000,
    email: 'mira@lumina.tech',
    stage: PipelineStage.PROPOSAL,
    avatarUrl: 'https://picsum.photos/64/64?random=5',
    lastActivity: '2d ago',
    streak: 8,
    tags: ['Enterprise', 'Q4']
  },
  {
    id: '6',
    name: 'Kian Vess',
    company: 'Orbital Structures',
    value: 18000,
    email: 'kian@orbital.com',
    stage: PipelineStage.NEW,
    avatarUrl: 'https://picsum.photos/64/64?random=6',
    lastActivity: '5m ago',
    streak: 0,
    tags: ['Inbound']
  },
];

export const PIPELINE_COLUMNS = [
  PipelineStage.NEW,
  PipelineStage.CONTACTED,
  PipelineStage.QUALIFIED,
  PipelineStage.PROPOSAL,
  PipelineStage.CLOSED_WON
];
