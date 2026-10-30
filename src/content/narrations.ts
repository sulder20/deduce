import type { YearNarration, StateKey } from './types';

// ============================================
// 年度旁白
// 每年 7 个状态维度 × 4 档 = 28 条/年
// 引擎每年挑 2-3 条拼成旁白
// ============================================

export const narrations: YearNarration[] = [
  // ==========================================
  // 第一年
  // ==========================================
  { year: 1, stateKey: 'timeFreedom', tier: 'low', text: '你的时间被填满了。日历上几乎没有空白。' },
  { year: 1, stateKey: 'timeFreedom', tier: 'midLow', text: '时间很紧，但还能挤出一点。' },
  { year: 1, stateKey: 'timeFreedom', tier: 'midHigh', text: '你还有一些余量，够做一两件想做的事。' },
  { year: 1, stateKey: 'timeFreedom', tier: 'high', text: '时间是自由的。你开始有点不知道拿它怎么办。' },
  { year: 1, stateKey: 'energy', tier: 'low', text: '你累得有点麻木了。' },
  { year: 1, stateKey: 'energy', tier: 'midLow', text: '精力不太够，靠咖啡撑着。' },
  { year: 1, stateKey: 'energy', tier: 'midHigh', text: '精力还行，能应付日常。' },
  { year: 1, stateKey: 'energy', tier: 'high', text: '你难得地觉得身体是自己的。' },
  { year: 1, stateKey: 'cashflow', tier: 'low', text: '钱开始紧了。你嘴上说没事，但晚上会多刷几次余额。' },
  { year: 1, stateKey: 'cashflow', tier: 'midLow', text: '现金有点紧，但不至于慌。' },
  { year: 1, stateKey: 'cashflow', tier: 'midHigh', text: '钱够用。你没有太担心。' },
  { year: 1, stateKey: 'cashflow', tier: 'high', text: '现金流宽裕。你第一次觉得有点底气。' },
  { year: 1, stateKey: 'relationship', tier: 'low', text: '你和一些人的聊天，慢慢变成了“改天约”。改天一直没来。' },
  { year: 1, stateKey: 'relationship', tier: 'midLow', text: '关系有点变薄。你偶尔会想起某个很久没联系的人。' },
  { year: 1, stateKey: 'relationship', tier: 'midHigh', text: '你还有几个人可以随时打扰。' },
  { year: 1, stateKey: 'relationship', tier: 'high', text: '关系是暖的。你知道有人站在你这边。' },
  { year: 1, stateKey: 'skill', tier: 'low', text: '技能上没什么进展。你有点着急。' },
  { year: 1, stateKey: 'skill', tier: 'midLow', text: '你在起步，但还不够。' },
  { year: 1, stateKey: 'skill', tier: 'midHigh', text: '你在长。虽然慢，但在长。' },
  { year: 1, stateKey: 'skill', tier: 'high', text: '你开始有了一点壁垒。' },
  { year: 1, stateKey: 'emotion', tier: 'low', text: '情绪低落。你不太想说话。' },
  { year: 1, stateKey: 'emotion', tier: 'midLow', text: '情绪有点起伏。' },
  { year: 1, stateKey: 'emotion', tier: 'midHigh', text: '情绪还算平稳。' },
  { year: 1, stateKey: 'emotion', tier: 'high', text: '你难得地觉得踏实。' },
  { year: 1, stateKey: 'riskExposure', tier: 'low', text: '你走得很稳。没什么风险。' },
  { year: 1, stateKey: 'riskExposure', tier: 'midLow', text: '风险可控。' },
  { year: 1, stateKey: 'riskExposure', tier: 'midHigh', text: '风险开始偏高了。' },
  { year: 1, stateKey: 'riskExposure', tier: 'high', text: '一切悬着。你不知道下一步会怎样。' },

  // ==========================================
  // 第二年
  // ==========================================
  { year: 2, stateKey: 'timeFreedom', tier: 'low', text: '第二年，你的时间还是不够用。' },
  { year: 2, stateKey: 'timeFreedom', tier: 'midLow', text: '时间紧，但你学会了偷一点。' },
  { year: 2, stateKey: 'timeFreedom', tier: 'midHigh', text: '你有了一点余量。' },
  { year: 2, stateKey: 'timeFreedom', tier: 'high', text: '时间自由，但你开始觉得空。' },
  { year: 2, stateKey: 'energy', tier: 'low', text: '身体在提醒你，这样下去不行。' },
  { year: 2, stateKey: 'energy', tier: 'midLow', text: '你有点累，但还能撑。' },
  { year: 2, stateKey: 'energy', tier: 'midHigh', text: '精力还撑得住。' },
  { year: 2, stateKey: 'energy', tier: 'high', text: '你状态不错，做事有劲。' },
  { year: 2, stateKey: 'cashflow', tier: 'low', text: '钱还是紧。你开始算着花。' },
  { year: 2, stateKey: 'cashflow', tier: 'midLow', text: '现金有点压力，但不至于断。' },
  { year: 2, stateKey: 'cashflow', tier: 'midHigh', text: '现金流够用。' },
  { year: 2, stateKey: 'cashflow', tier: 'high', text: '钱不是问题了。你松了口气。' },
  { year: 2, stateKey: 'relationship', tier: 'low', text: '你发现有些人已经很久没联系了。' },
  { year: 2, stateKey: 'relationship', tier: 'midLow', text: '关系有点疏远，你注意到了。' },
  { year: 2, stateKey: 'relationship', tier: 'midHigh', text: '还有几个人在。' },
  { year: 2, stateKey: 'relationship', tier: 'high', text: '关系在升温。你开始愿意依赖别人。' },
  { year: 2, stateKey: 'skill', tier: 'low', text: '技能上还是原地。你有点慌。' },
  { year: 2, stateKey: 'skill', tier: 'midLow', text: '你在起步，但还没到能拿出手的程度。' },
  { year: 2, stateKey: 'skill', tier: 'midHigh', text: '你在长。能感觉到。' },
  { year: 2, stateKey: 'skill', tier: 'high', text: '你的技能开始有壁垒了。' },
  { year: 2, stateKey: 'emotion', tier: 'low', text: '情绪低落。你不太想解释。' },
  { year: 2, stateKey: 'emotion', tier: 'midLow', text: '情绪有点起伏。' },
  { year: 2, stateKey: 'emotion', tier: 'midHigh', text: '情绪还算平稳。' },
  { year: 2, stateKey: 'emotion', tier: 'high', text: '你踏实了一些。' },
  { year: 2, stateKey: 'riskExposure', tier: 'low', text: '你走得稳。' },
  { year: 2, stateKey: 'riskExposure', tier: 'midLow', text: '风险可控。' },
  { year: 2, stateKey: 'riskExposure', tier: 'midHigh', text: '风险偏高。你知道。' },
  { year: 2, stateKey: 'riskExposure', tier: 'high', text: '风险悬着。你有点怕，也有点兴奋。' },

  // ==========================================
  // 第三年
  // ==========================================
  { year: 3, stateKey: 'timeFreedom', tier: 'low', text: '第三年，你的时间被自己安排得密不透风。' },
  { year: 3, stateKey: 'timeFreedom', tier: 'midLow', text: '时间紧，你已经习惯了。' },
  { year: 3, stateKey: 'timeFreedom', tier: 'midHigh', text: '你有了一点余量。' },
  { year: 3, stateKey: 'timeFreedom', tier: 'high', text: '时间自由，你开始想拿它做点什么。' },
  { year: 3, stateKey: 'energy', tier: 'low', text: '你累了。真的累了。' },
  { year: 3, stateKey: 'energy', tier: 'midLow', text: '精力不太够，但你还在撑。' },
  { year: 3, stateKey: 'energy', tier: 'midHigh', text: '精力还行。' },
  { year: 3, stateKey: 'energy', tier: 'high', text: '你状态不错。' },
  { year: 3, stateKey: 'cashflow', tier: 'low', text: '现金在断裂边缘。你开始算最坏的情况。' },
  { year: 3, stateKey: 'cashflow', tier: 'midLow', text: '现金紧张。你不太敢乱花。' },
  { year: 3, stateKey: 'cashflow', tier: 'midHigh', text: '钱够用。' },
  { year: 3, stateKey: 'cashflow', tier: 'high', text: '现金流宽裕。你有点安心。' },
  { year: 3, stateKey: 'relationship', tier: 'low', text: '关系疏离了。你有时候一整天没跟人说话。' },
  { year: 3, stateKey: 'relationship', tier: 'midLow', text: '关系在变薄。你知道，但没力气去修。' },
  { year: 3, stateKey: 'relationship', tier: 'midHigh', text: '还有几个人在。' },
  { year: 3, stateKey: 'relationship', tier: 'high', text: '关系很暖。你知道有人在。' },
  { year: 3, stateKey: 'skill', tier: 'low', text: '技能还是原地。你开始怀疑自己。' },
  { year: 3, stateKey: 'skill', tier: 'midLow', text: '你在起步，但不够。' },
  { year: 3, stateKey: 'skill', tier: 'midHigh', text: '你在长。' },
  { year: 3, stateKey: 'skill', tier: 'high', text: '你的技能有壁垒了。有人开始找你。' },
  { year: 3, stateKey: 'emotion', tier: 'low', text: '情绪低落。你在撑。' },
  { year: 3, stateKey: 'emotion', tier: 'midLow', text: '情绪有点起伏。' },
  { year: 3, stateKey: 'emotion', tier: 'midHigh', text: '情绪还算平稳。' },
  { year: 3, stateKey: 'emotion', tier: 'high', text: '你踏实了。' },
  { year: 3, stateKey: 'riskExposure', tier: 'low', text: '你走得很稳。' },
  { year: 3, stateKey: 'riskExposure', tier: 'midLow', text: '风险可控。' },
  { year: 3, stateKey: 'riskExposure', tier: 'midHigh', text: '风险偏高。' },
  { year: 3, stateKey: 'riskExposure', tier: 'high', text: '一切悬着。' },

  // ==========================================
  // 第四年
  // ==========================================
  { year: 4, stateKey: 'timeFreedom', tier: 'low', text: '第四年，时间还是不够。' },
  { year: 4, stateKey: 'timeFreedom', tier: 'midLow', text: '时间很紧。' },
  { year: 4, stateKey: 'timeFreedom', tier: 'midHigh', text: '你有一点余量。' },
  { year: 4, stateKey: 'timeFreedom', tier: 'high', text: '时间自由，你开始挑想做的事。' },
  { year: 4, stateKey: 'energy', tier: 'low', text: '你透支了。' },
  { year: 4, stateKey: 'energy', tier: 'midLow', text: '疲惫。你很久没睡好了。' },
  { year: 4, stateKey: 'energy', tier: 'midHigh', text: '精力还行。' },
  { year: 4, stateKey: 'energy', tier: 'high', text: '你状态不错。' },
  { year: 4, stateKey: 'cashflow', tier: 'low', text: '现金断裂边缘。你开始想退路。' },
  { year: 4, stateKey: 'cashflow', tier: 'midLow', text: '现金紧张。' },
  { year: 4, stateKey: 'cashflow', tier: 'midHigh', text: '钱够用。' },
  { year: 4, stateKey: 'cashflow', tier: 'high', text: '现金流宽裕。' },
  { year: 4, stateKey: 'relationship', tier: 'low', text: '关系疏离。你有点孤独。' },
  { year: 4, stateKey: 'relationship', tier: 'midLow', text: '关系变薄。' },
  { year: 4, stateKey: 'relationship', tier: 'midHigh', text: '还有几个人在。' },
  { year: 4, stateKey: 'relationship', tier: 'high', text: '关系很暖。' },
  { year: 4, stateKey: 'skill', tier: 'low', text: '技能原地。' },
  { year: 4, stateKey: 'skill', tier: 'midLow', text: '技能在起步。' },
  { year: 4, stateKey: 'skill', tier: 'midHigh', text: '技能在长。' },
  { year: 4, stateKey: 'skill', tier: 'high', text: '技能有壁垒。' },
  { year: 4, stateKey: 'emotion', tier: 'low', text: '情绪低落。' },
  { year: 4, stateKey: 'emotion', tier: 'midLow', text: '情绪起伏。' },
  { year: 4, stateKey: 'emotion', tier: 'midHigh', text: '情绪平稳。' },
  { year: 4, stateKey: 'emotion', tier: 'high', text: '情绪踏实。' },
  { year: 4, stateKey: 'riskExposure', tier: 'low', text: '你走得很稳。' },
  { year: 4, stateKey: 'riskExposure', tier: 'midLow', text: '风险可控。' },
  { year: 4, stateKey: 'riskExposure', tier: 'midHigh', text: '风险偏高。' },
  { year: 4, stateKey: 'riskExposure', tier: 'high', text: '风险悬着。你有点怕。' },

  // ==========================================
  // 第五年
  // ==========================================
  { year: 5, stateKey: 'timeFreedom', tier: 'low', text: '第五年，时间还是紧。' },
  { year: 5, stateKey: 'timeFreedom', tier: 'midLow', text: '时间紧，但你习惯了。' },
  { year: 5, stateKey: 'timeFreedom', tier: 'midHigh', text: '你有了一点余量。' },
  { year: 5, stateKey: 'timeFreedom', tier: 'high', text: '时间自由。你终于能挑想做的事。' },
  { year: 5, stateKey: 'energy', tier: 'low', text: '你透支了。但你知道。' },
  { year: 5, stateKey: 'energy', tier: 'midLow', text: '疲惫。' },
  { year: 5, stateKey: 'energy', tier: 'midHigh', text: '精力还行。' },
  { year: 5, stateKey: 'energy', tier: 'high', text: '状态不错。' },
  { year: 5, stateKey: 'cashflow', tier: 'low', text: '现金断裂边缘。' },
  { year: 5, stateKey: 'cashflow', tier: 'midLow', text: '现金紧张。' },
  { year: 5, stateKey: 'cashflow', tier: 'midHigh', text: '钱够用。' },
  { year: 5, stateKey: 'cashflow', tier: 'high', text: '现金流宽裕。' },
  { year: 5, stateKey: 'relationship', tier: 'low', text: '关系疏离。' },
  { year: 5, stateKey: 'relationship', tier: 'midLow', text: '关系变薄。' },
  { year: 5, stateKey: 'relationship', tier: 'midHigh', text: '还有几个人在。' },
  { year: 5, stateKey: 'relationship', tier: 'high', text: '关系很暖。' },
  { year: 5, stateKey: 'skill', tier: 'low', text: '技能原地。' },
  { year: 5, stateKey: 'skill', tier: 'midLow', text: '技能在起步。' },
  { year: 5, stateKey: 'skill', tier: 'midHigh', text: '技能在长。' },
  { year: 5, stateKey: 'skill', tier: 'high', text: '技能有壁垒。' },
  { year: 5, stateKey: 'emotion', tier: 'low', text: '情绪低落。' },
  { year: 5, stateKey: 'emotion', tier: 'midLow', text: '情绪起伏。' },
  { year: 5, stateKey: 'emotion', tier: 'midHigh', text: '情绪平稳。' },
  { year: 5, stateKey: 'emotion', tier: 'high', text: '情绪踏实。' },
  { year: 5, stateKey: 'riskExposure', tier: 'low', text: '你走得很稳。' },
  { year: 5, stateKey: 'riskExposure', tier: 'midLow', text: '风险可控。' },
  { year: 5, stateKey: 'riskExposure', tier: 'midHigh', text: '风险偏高。' },
  { year: 5, stateKey: 'riskExposure', tier: 'high', text: '风险悬着。' },
];

// ============================================
// 查询辅助
// ============================================

// 按 年份 + 状态维度 + 档位 查一条旁白
export function getNarration(
  year: number,
  stateKey: StateKey,
  tier: string
): string | undefined {
  const found = narrations.find(
    (n) => n.year === year && n.stateKey === stateKey && n.tier === tier
  );
  return found?.text;
}

// 按年份取该年所有旁白
export function getNarrationsByYear(year: number) {
  return narrations.filter((n) => n.year === year);
}