import type { ConversationItem, TeamMember, PlaybookItem, OutcomeItem } from '../types';


export const MOCK_CONVERSATIONS: ConversationItem[] = [
  {
    id: 'conv-1',
    customerName: 'Avery Chen',
    company: 'Acme Labs',
    avatarBg: 'bg-[#a3e635] text-[#0b0e14]',
    channel: 'Email',
    topic: 'Expansion signal & Enterprise quota inquiry',
    confidence: 94,
    time: '2m ago',
    status: 'Needs Attention',
    lastMessage: 'We are rolling out the workflow to our LATAM division next month and need 150 additional seats.',
    draftReply: 'Hi Avery, that is fantastic news! I have pre-applied the Enterprise volume tier (15% discount for 100+ seats). Would tomorrow at 3 PM IST work to finalize the contract?',
    aiAnalysis: 'High-intent expansion signal. Customer intent score: 96%. Recommended action: Approve pre-drafted quote and offer executive priority onboarding.'
  },
  {
    id: 'conv-2',
    customerName: 'Samir Patel',
    company: 'Nexus FinTech',
    avatarBg: 'bg-amber-400 text-[#0b0e14]',
    channel: 'Intercom',
    topic: 'Payment gateway API failure & duplicate invoice',
    confidence: 88,
    time: '5m ago',
    status: 'Needs Attention',
    lastMessage: 'I was billed twice for invoice #INV-9902 during gateway timeout yesterday.',
    draftReply: 'Hello Samir, I have verified the dual transaction charge in billing logs. Refund request #RF-4412 has been queued and credited back to your primary card.',
    aiAnalysis: 'Billing dissatisfaction risk. Priority: Urgent. Recommended action: Issue instant credit & escalate to Senior Finance Rep.'
  },
  {
    id: 'conv-3',
    customerName: 'Elena Rostova',
    company: 'Vanguard Systems',
    avatarBg: 'bg-indigo-400 text-white',
    channel: 'Email',
    topic: 'Custom SAML 2.0 SSO Integration docs request',
    confidence: 91,
    time: '12m ago',
    status: 'Needs Attention',
    lastMessage: 'Our infosec team requires SAML 2.0 configuration guide and SOC2 Type II compliance certificate.',
    draftReply: 'Hi Elena, attached are the Ivy SAML 2.0 setup guide and our latest SOC2 Type II audit report. Let me know if your security auditor needs a dedicated review call.',
    aiAnalysis: 'Security review stage. Recommended action: Send compliance packet and cc Security Lead.'
  },
  {
    id: 'conv-4',
    customerName: 'Marcus Vance',
    company: 'Apex Logistics',
    avatarBg: 'bg-cyan-400 text-[#0b0e14]',
    channel: 'WhatsApp',
    topic: 'Demo schedule request for 50 student licenses',
    confidence: 96,
    time: '18m ago',
    status: 'Needs Attention',
    lastMessage: 'Kannada voice note translated: "We want a demo call tomorrow afternoon for our campus team."',
    draftReply: 'Hello Marcus, I have reserved a 30-minute demo slot for tomorrow at 2:30 PM IST. Here is your calendar invite link.',
    aiAnalysis: 'High urgency inbound WhatsApp voice lead. Recommended action: Auto-book Google Calendar event.'
  }
];

export const MOCK_TEAM: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Jordan Pravin',
    role: 'Revenue Ops Lead',
    focus: 'Enterprise Expansion & Pipeline Risk',
    playbook: 'Enterprise Deal Closer v2',
    availability: 'Available',
    capacity: 45,
    avatar: 'JP'
  },
  {
    id: 'team-2',
    name: 'Avery Chen',
    role: 'Senior Account Executive',
    focus: 'Acme Labs & LATAM Accounts',
    playbook: 'Inbound Qualified Lead Nudge',
    availability: 'In Call',
    capacity: 80,
    avatar: 'AC'
  },
  {
    id: 'team-3',
    name: 'Samir Patel',
    role: 'Customer Support Lead',
    focus: 'Urgent Ticket Escalations',
    playbook: 'Billing Dispute Auto-Refund',
    availability: 'Focus Mode',
    capacity: 65,
    avatar: 'SP'
  },
  {
    id: 'team-4',
    name: 'Priya Sharma',
    role: 'Solutions Architect',
    focus: 'SAML 2.0 & Infosec Security Audits',
    playbook: 'Infosec Security Packet',
    availability: 'Available',
    capacity: 30,
    avatar: 'PS'
  }
];

export const MOCK_PLAYBOOKS: PlaybookItem[] = [
  {
    id: 'pb-1',
    name: 'Inbound Expansion Signal Nudge',
    category: 'Sales',
    trigger: 'Customer mentions seat increase or division rollout',
    action: 'Draft volume discount quote & offer executive demo',
    activeRuns: 42,
    successRate: 94.8,
    enabled: true
  },
  {
    id: 'pb-2',
    name: 'Duplicate Billing Auto-Verification',
    category: 'Support',
    trigger: 'Negative sentiment ticket + payment timeout',
    action: 'Verify billing logs & queue instant manager refund card',
    activeRuns: 18,
    successRate: 91.2,
    enabled: true
  },
  {
    id: 'pb-3',
    name: 'Cold Deal Proactive Nudge',
    category: 'Retention',
    trigger: '14 days idle in CRM + PDF re-opened >2 times',
    action: 'Draft personalized ROI update & case study email',
    activeRuns: 29,
    successRate: 88.5,
    enabled: true
  }
];

export const MOCK_OUTCOMES: OutcomeItem[] = [
  {
    id: 'out-1',
    title: 'Acme Labs $184.2k Expansion Proposal Sent',
    category: 'Revenue Influenced',
    impact: '$184.2k pipeline added',
    date: 'Today, 10:42 AM',
    status: 'Completed'
  },
  {
    id: 'out-2',
    title: 'Nexus FinTech Dispute Resolved without Rep Rework',
    category: 'Support Speed',
    impact: 'Saved 4.2h rep triage time',
    date: 'Today, 09:15 AM',
    status: 'Completed'
  },
  {
    id: 'out-3',
    title: 'Vanguard Systems SAML 2.0 Infosec Packet Delivered',
    category: 'Deal Velocity',
    impact: 'Security cycle reduced by 3 days',
    date: 'Yesterday',
    status: 'Completed'
  }
];
