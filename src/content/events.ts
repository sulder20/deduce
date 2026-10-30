import type { GameEvent } from './types';

// ============================================
// 18 张事件卡
// 7 压力 / 7 支持 / 4 中性
// 条件满足后按 baseProbability 掷骰
// 每年最多触发 1 个，同事件一局最多 1 次
// ============================================

export const events: GameEvent[] = [
  // ==========================================
  // 压力类（7 张）
  // ==========================================
  {
    id: 'ev-cash-crunch',
    name: '现金流断裂',
    type: 'pressure',
    narration: '余额提醒弹出来的时候，你正在便利店结账。你把那瓶水放了回去。',
    effects: { cashflow: -20, emotion: -15, energy: -5 },
    condition: {
      state: { cashflow: { max: 25 } },
      choiceTags: ['highRisk'],
      year: { min: 3 },
    },
    baseProbability: 0.6,
    maxOncePerSession: true,
  },
  {
    id: 'ev-body-alarm',
    name: '身体报警',
    type: 'pressure',
    narration: '你在地铁上突然心慌。医生说没什么大事，但“没什么大事”让你更怕。',
    effects: { energy: -25, emotion: -10, cashflow: -5 },
    condition: {
      state: { energy: { max: 30 } },
      consecutive: { tag: 'highInvest', years: 2 },
    },
    baseProbability: 0.65,
    maxOncePerSession: true,
  },
  {
    id: 'ev-relation-cool',
    name: '关系降温',
    type: 'pressure',
    narration: '你翻聊天记录，发现上一次见面是去年。你打了个“在吗”，又删了。',
    effects: { relationship: -20, emotion: -10 },
    condition: {
      state: { relationship: { max: 35 } },
      consecutive: { tag: 'relationWithdraw', years: 2 },
    },
    baseProbability: 0.55,
    maxOncePerSession: true,
  },
  {
    id: 'ev-self-doubt',
    name: '自我怀疑',
    type: 'pressure',
    narration: '你在凌晨三点醒着，问自己这五年到底在干嘛。没有答案，只有天花板。',
    effects: { emotion: -18, skill: -5, riskExposure: 8 },
    condition: {
      state: { emotion: { max: 35 }, skill: { max: 45 } },
      consecutive: { tag: 'conservative', years: 2 },
    },
    baseProbability: 0.55,
    maxOncePerSession: true,
  },
  {
    id: 'ev-opportunity-lost',
    name: '机会被抢',
    type: 'pressure',
    narration: '那个位置给了别人。你笑着说恭喜，回家路上走得很慢。',
    effects: { skill: -12, emotion: -15, riskExposure: 10 },
    condition: {
      state: { skill: { max: 40 } },
      choiceTags: ['highRisk'],
      year: { min: 2 },
    },
    baseProbability: 0.5,
    maxOncePerSession: true,
  },
  {
    id: 'ev-family-misunderstand',
    name: '家人不理解',
    type: 'pressure',
    narration: '你妈说“我们都是为你好”。你说“我知道”。然后你们都沉默了。',
    effects: { relationship: -15, emotion: -15, riskExposure: 5 },
    condition: {
      state: { relationship: { max: 45 } },
      choiceTags: ['pivot'],
    },
    baseProbability: 0.55,
    maxOncePerSession: true,
  },
  {
    id: 'ev-loneliness',
    name: '孤独感袭来',
    type: 'pressure',
    narration: '周末下午，你一个人在家，突然不知道该给谁发消息。',
    effects: { emotion: -15, relationship: -10 },
    condition: {
      state: { relationship: { max: 35 }, timeFreedom: { min: 60 } },
    },
    baseProbability: 0.5,
    maxOncePerSession: true,
  },

  // ==========================================
  // 支持类（7 张）
  // ==========================================
  {
    id: 'ev-unexpected-support',
    name: '意外支持',
    type: 'support',
    narration: '你没想到他会借你钱。他说“先拿着，不急”。你差点没绷住。',
    effects: { cashflow: 20, emotion: 15, relationship: 10 },
    condition: {
      state: { relationship: { min: 60 }, cashflow: { max: 35 } },
    },
    baseProbability: 0.6,
    maxOncePerSession: true,
  },
  {
    id: 'ev-work-seen',
    name: '作品被看见',
    type: 'support',
    narration: '那条消息弹出来，你看了三遍才确认是找你。',
    effects: { skill: 15, emotion: 15, relationship: 8, cashflow: 5 },
    condition: {
      state: { skill: { min: 60 } },
      choiceTags: ['skillFocus', 'careerFocus'],
    },
    baseProbability: 0.55,
    maxOncePerSession: true,
  },
  {
    id: 'ev-mentor',
    name: '贵人出现',
    type: 'support',
    narration: '他给了你一个建议。你后来回想，那句话值很多钱。',
    effects: { skill: 15, relationship: 10, cashflow: 8, riskExposure: -5 },
    condition: {
      choiceTags: ['relationInvest', 'highRisk'],
      state: { relationship: { min: 50 } },
    },
    baseProbability: 0.45,
    maxOncePerSession: true,
  },
  {
    id: 'ev-body-recover',
    name: '身体恢复',
    type: 'support',
    narration: '你睡了八个小时，醒来的时候天还没亮。你很久没这种感觉了。',
    effects: { energy: 20, emotion: 12 },
    condition: {
      state: { energy: { max: 45 } },
      choiceTags: ['healthFocus', 'rest'],
    },
    baseProbability: 0.6,
    maxOncePerSession: true,
  },
  {
    id: 'ev-old-relation-back',
    name: '旧关系回流',
    type: 'support',
    narration: '他发来一句“最近怎么样”。你打了很长一段，又删到只剩“还行”。',
    effects: { relationship: 15, emotion: 8, timeFreedom: -5 },
    condition: {
      state: { relationship: { max: 45 } },
      choiceTags: ['relationWithdraw'],
      year: { min: 3 },
    },
    baseProbability: 0.5,
    maxOncePerSession: true,
  },
  {
    id: 'ev-windfall',
    name: '一笔意外收入',
    type: 'support',
    narration: '一笔你忘了的钱到账了。不多，但那天你走路轻了一点。',
    effects: { cashflow: 15, emotion: 8, riskExposure: -5 },
    condition: {
      state: { cashflow: { max: 40 } },
      choiceTags: ['moneyFocus', 'conservative'],
    },
    baseProbability: 0.5,
    maxOncePerSession: true,
  },
  {
    id: 'ev-clarity',
    name: '想通一件事',
    type: 'support',
    narration: '你在洗澡的时候突然想通了。没有为什么，就是通了。',
    effects: { emotion: 18, skill: 5, riskExposure: -8 },
    condition: {
      consecutive: { tag: 'reflective', years: 2 },
    },
    baseProbability: 0.55,
    maxOncePerSession: true,
  },

  // ==========================================
  // 中性 / 转折类（4 张）
  // ==========================================
  {
    id: 'ev-two-choices',
    name: '必须二选一',
    type: 'neutral',
    narration: '你站在路口，两边都有人朝你招手。你知道无论选哪边，都会辜负一边。',
    effects: { emotion: -10, relationship: -8, skill: 8, riskExposure: 10 },
    condition: {
      year: { min: 4 },
      choiceTags: ['highRisk'],
      state: { riskExposure: { min: 50 } },
    },
    baseProbability: 0.55,
    maxOncePerSession: true,
  },
  {
    id: 'ev-long-talk',
    name: '一次长谈',
    type: 'neutral',
    narration: '你们聊到凌晨四点。有些话，你从来没跟别人说过。',
    effects: { relationship: 15, emotion: 12, energy: -5 },
    condition: {
      state: { emotion: { max: 45 } },
      choiceTags: ['relationInvest'],
    },
    baseProbability: 0.5,
    maxOncePerSession: true,
  },
  {
    id: 'ev-minor-illness',
    name: '一场小病',
    type: 'neutral',
    narration: '发烧到 38.5 度。你躺在床上，突然觉得很多事没那么急。',
    effects: { energy: -12, emotion: 5, timeFreedom: 8, skill: -3 },
    condition: {
      state: { energy: { max: 40 } },
    },
    baseProbability: 0.4,
    maxOncePerSession: true,
  },
  {
    id: 'ev-stranger-words',
    name: '一个陌生人的话',
    type: 'neutral',
    narration: '便利店店员说“你看起来好累”。你笑了笑，出门以后站了一会儿。',
    effects: { emotion: -5, energy: -3, riskExposure: -3 },
    condition: {
      year: { min: 2 },
    },
    baseProbability: 0.35,
    maxOncePerSession: true,
  },
];

// ============================================
// 查询辅助
// ============================================

export const eventsById: Record<string, GameEvent> = Object.fromEntries(
  events.map((e) => [e.id, e])
);

export const eventsByType = {
  pressure: events.filter((e) => e.type === 'pressure'),
  support: events.filter((e) => e.type === 'support'),
  neutral: events.filter((e) => e.type === 'neutral'),
};