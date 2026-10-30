import type { CalibrationQuestion } from './types';

// ============================================
// 4 问校准
// 每问 3-4 个选项，effects 在初始状态上叠加
// tag 只做记录和后续可能的倾向分析，不直接触发事件
// ============================================

export const calibrationQuestions: CalibrationQuestion[] = [
  {
    id: 'cal-lack',
    question: '你现在最缺什么？',
    options: [
      {
        id: 'lack-time',
        label: '时间',
        effects: { timeFreedom: -12 },
        tag: 'lackTime',
      },
      {
        id: 'lack-direction',
        label: '方向',
        effects: { emotion: -8, riskExposure: 5 },
        tag: 'lackDirection',
      },
      {
        id: 'lack-ground',
        label: '底气（钱、技能、支持）',
        effects: { cashflow: -10, skill: -5 },
        tag: 'lackGround',
      },
    ],
  },
  {
    id: 'cal-fear',
    question: '你最怕失去什么？',
    options: [
      {
        id: 'fear-safety',
        label: '安全感',
        effects: { riskExposure: -10 },
        tag: 'fearSafety',
      },
      {
        id: 'fear-relation',
        label: '关系',
        effects: { relationship: 5, emotion: -5 },
        tag: 'fearRelation',
      },
      {
        id: 'fear-identity',
        label: '自我认同',
        effects: { emotion: -8, skill: 3 },
        tag: 'fearIdentity',
      },
    ],
  },
  {
    id: 'cal-fallback',
    question: '如果失败，谁兜底？',
    options: [
      {
        id: 'fallback-self',
        label: '只有自己',
        effects: { riskExposure: 10, emotion: -5 },
        tag: 'fallbackSelf',
      },
      {
        id: 'fallback-family',
        label: '家人或伴侣',
        effects: { relationship: 5, riskExposure: -5 },
        tag: 'fallbackFamily',
      },
      {
        id: 'fallback-friend',
        label: '朋友或伙伴',
        effects: { relationship: 3, riskExposure: -3 },
        tag: 'fallbackFriend',
      },
      {
        id: 'fallback-none',
        label: '没人，但也没负担',
        effects: { riskExposure: 5, timeFreedom: 5 },
        tag: 'fallbackNone',
      },
    ],
  },
  {
    id: 'cal-belief',
    question: '你更相信哪一种？',
    options: [
      {
        id: 'belief-stable',
        label: '先稳住，再谈想要',
        effects: { riskExposure: -10, cashflow: 5 },
        tag: 'riskConservative',
      },
      {
        id: 'belief-jump',
        label: '先跳出去，再想办法',
        effects: { riskExposure: 10, emotion: 3 },
        tag: 'riskAggressive',
      },
      {
        id: 'belief-adaptive',
        label: '边走边看，不预设',
        effects: { emotion: 3 },
        tag: 'riskAdaptive',
      },
    ],
  },
];