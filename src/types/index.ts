export type TabType = 'overview' | 'conversations' | 'playbooks' | 'outcomes' | 'team' | 'settings';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ivy';
  text: string;
  timestamp: string;
  isError?: boolean;
}

export interface ConversationItem {
  id: string;
  customerName: string;
  company: string;
  avatarBg: string;
  channel: 'Email' | 'WhatsApp' | 'Intercom' | 'Slack';
  topic: string;
  confidence: number;
  time: string;
  status: 'Needs Attention' | 'In Progress' | 'Resolved';
  lastMessage: string;
  draftReply?: string;
  aiAnalysis?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  focus: string;
  playbook: string;
  availability: 'Available' | 'In Call' | 'Focus Mode';
  capacity: number; // percentage
  avatar: string;
}

export interface PlaybookItem {
  id: string;
  name: string;
  category: 'Sales' | 'Support' | 'Retention';
  trigger: string;
  action: string;
  activeRuns: number;
  successRate: number;
  enabled: boolean;
}

export interface OutcomeItem {
  id: string;
  title: string;
  category: string;
  impact: string;
  date: string;
  status: 'Completed' | 'In Progress';
}
