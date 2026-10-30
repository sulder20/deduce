// ============================================
// 状态维度
// ============================================

export type StateKey =
  | 'timeFreedom'
  | 'energy'
  | 'cashflow'
  | 'relationship'
  | 'skill'
  | 'emotion'
  | 'riskExposure';

export type StateVector = Partial<Record<StateKey, number>>;

export type StateRecord = Record<StateKey, number>;

export type Tier = 'low' | 'midLow' | 'midHigh' | 'high';

export const STATE_KEYS: StateKey[] = [
  'timeFreedom',
  'energy',
  'cashflow',
  'relationship',
  'skill',
  'emotion',
  'riskExposure',
];

export const STATE_LABELS: Record<StateKey, string> = {
  timeFreedom: '时间自由度',
  energy: '精力',
  cashflow: '现金流',
  relationship: '关系质量',
  skill: '技能积累',
  emotion: '情绪稳定',
  riskExposure: '风险敞口',
};

export const STATE_SHORT_LABELS: Record<StateKey, string> = {
  timeFreedom: '时间',
  energy: '精力',
  cashflow: '现金',
  relationship: '关系',
  skill: '技能',
  emotion: '情绪',
  riskExposure: '风险',
};

// 四档描述词
export const STATE_TIERS: Record<StateKey, Record<Tier, string>> = {
  timeFreedom: { low: '被填满', midLow: '很紧', midHigh: '有余量', high: '很自由' },
  energy: { low: '透支', midLow: '疲惫', midHigh: '还行', high: '充沛' },
  cashflow: { low: '断裂边缘', midLow: '紧张', midHigh: '够用', high: '宽裕' },
  relationship: { low: '疏离', midLow: '变薄', midHigh: '有支撑', high: '很暖' },
  skill: { low: '原地', midLow: '起步', midHigh: '在长', high: '有壁垒' },
  emotion: { low: '低落', midLow: '起伏', midHigh: '平稳', high: '踏实' },
  riskExposure: { low: '很稳', midLow: '可控', midHigh: '偏高', high: '悬着' },
};

// ============================================
// 风险等级
// ============================================

export type RiskLevel = 'low' | 'mid' | 'high';

// ============================================
// 处境卡
// ============================================

export interface Situation {
  id: string;
  title: string;
  description: string;
  fitIf: string;
  stateWords: string[];
  baseState: StateVector;
}

// ============================================
// 校准
// ============================================

export interface CalibrationOption {
  id: string;
  label: string;
  effects: StateVector;
  tag: string;
}

export interface CalibrationQuestion {
  id: string;
  question: string;
  options: CalibrationOption[];
}

// ============================================
// 年度选择卡
// ============================================

export interface Choice {
  id: string;
  year: 1 | 2 | 3 | 4 | 5;
  title: string;
  surfaceGain: string;
  hiddenCostTags: string[];
  risk: RiskLevel;
  narration: string;
  effects: StateVector;
  tags: string[];
}

// ============================================
// 事件卡
// ============================================

export type EventType = 'pressure' | 'support' | 'neutral';

export interface EventCondition {
  state?: Partial<Record<StateKey, { min?: number; max?: number }>>;
  choiceTags?: string[];
  year?: { min?: number; max?: number };
  consecutive?: { tag: string; years: number };
}

export interface GameEvent {
  id: string;
  name: string;
  type: EventType;
  narration: string;
  effects: StateVector;
  condition: EventCondition;
  baseProbability: number;
  maxOncePerSession: boolean;
}

// ============================================
// 结局原型
// ============================================

export interface EndingTriggers {
  state?: Partial<Record<StateKey, { min?: number; max?: number }>>;
  choiceTagRatio?: Record<string, { min?: number }>;
  riskLevel?: RiskLevel;
}

export interface Ending {
  id: string;
  title: string;
  summary: string;
  triggers: EndingTriggers;
  gains: string[];
  costs: string[];
  stuckPoint: string;
  advice: string[];
}

// ============================================
// 年度旁白
// ============================================

export interface YearNarration {
  year: 1 | 2 | 3 | 4 | 5;
  stateKey: StateKey;
  tier: Tier;
  text: string;
}

// ============================================
// 一局 Session
// ============================================

export interface YearRecord {
  year: number;
  choiceId: string;
  eventId?: string;
  stateAfter: StateRecord;
  narration: string;
}

export interface Session {
  seed: number;
  situationId: string;
  calibration: Record<string, string>;
  state: StateRecord;
  overflow: StateRecord;
  years: YearRecord[];
  unchosen: string[];
  outcomeId?: string;
  version: string;
}

// ============================================
// 身份与档案
// ============================================

export interface Profile {
  id: string;
  nickname: string;
  avatarColor: string;
  bio?: string;
  createdAt: string;
}

export interface Archive {
  archiveId: string;
  profileId: string;
  session: Session;
  createdAt: string;
}

// ============================================
// 结局生成结果（修饰后）
// ============================================

export interface GeneratedEnding {
  endingId: string;
  title: string;
  summary: string;
  pathKeywords: string[];
  gains: string[];
  costs: string[];
  stuckPoint: string;
  regret: string;
  advice: string;
  alternativePaths: string[];
  fiveDimensions: Record<'career' | 'relationship' | 'health' | 'freedom' | 'meaning', number>;
}