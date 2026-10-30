import type { Ending } from './types';

// ============================================
// 10 个结局原型
// 引擎对每个原型打分，取最高分
// 分数低于阈值走兜底 end-nothing-changed
// ============================================

export const endings: Ending[] = [
  {
    id: 'end-pivot-success',
    title: '换轨成功，但关系变薄',
    summary: '你走出来了，走得比想象中远。但回头时，有些人已经不在了。',
    triggers: {
      state: {
        skill: { min: 65 },
        relationship: { max: 45 },
        riskExposure: { min: 50 },
      },
      choiceTagRatio: {
        highRisk: { min: 0.4 },
        highInvest: { min: 0.3 },
      },
      riskLevel: 'high',
    },
    gains: [
      '更大的舞台',
      '更强的能力',
      '更清楚自己要什么',
      '一个能拿出手的作品',
      '一次真正的离开',
    ],
    costs: [
      '两个能深夜打电话的人',
      '一段没来得及修的关系',
      '身体的某个信号',
      '一些没参加的场合',
      '一个越来越短的聊天列表',
    ],
    stuckPoint: '第三年，现金流和自我怀疑同时到来。',
    advice: [
      '你证明了自己能走远。接下来要学的，是怎么带着人一起走。',
      '你不需要用“忙”来证明自己在认真生活。',
      '给那个很久没联系的人发条消息吧，不用解释太多。',
      '走远不是错，但记得偶尔回头看。',
    ],
  },
  {
    id: 'end-stable-numb',
    title: '稳住了，但意义感下降',
    summary: '你没输，但也没赢。日子过得去，只是你偶尔会问自己“就这样了吗”。',
    triggers: {
      state: {
        cashflow: { min: 55 },
        emotion: { max: 50 },
        skill: { max: 55 },
      },
      choiceTagRatio: {
        conservative: { min: 0.5 },
      },
      riskLevel: 'low',
    },
    gains: [
      '稳定的现金流',
      '可控的生活',
      '没有大起大落的安心',
      '一个不会被轻易打乱的家',
      '别人眼里的“还不错”',
    ],
    costs: [
      '没试过的那条路',
      '慢慢变淡的好奇心',
      '某个凌晨三点的自我提问',
      '一次没敢答应的邀约',
      '一个被搁置很久的念头',
    ],
    stuckPoint: '第四年，你发现自己已经很久没有期待过周一。',
    advice: [
      '稳定不是错，但别把稳定当成不再出发的理由。',
      '你还有时间，真的。',
      '找一个小的、低风险的“不一样”，先做一个月。',
      '不需要推翻一切，只需要给生活开一道小口子。',
    ],
  },
  {
    id: 'end-split-effort',
    title: '两头都想要，两头都半吊子',
    summary: '你哪边都没放下，哪边都没走太远。你很累，但说不清累在哪。',
    triggers: {
      state: {
        energy: { max: 45 },
        skill: { max: 60 },
        riskExposure: { min: 40 },
      },
      choiceTagRatio: {
        highInvest: { min: 0.4 },
        stabilityFocus: { min: 0.2 },
      },
    },
    gains: [
      '两条路都还在',
      '没有彻底失去任何一边',
      '学会了协调和切换',
      '一种“我还能扛”的错觉',
      '很多个没白过的晚上',
    ],
    costs: [
      '深度不够',
      '精力被切碎',
      '两个方向都卡在中段',
      '一个没敢做的决定',
      '一些被拖延的承诺',
    ],
    stuckPoint: '第三年，你发现两边都在等你表态，而你哪边都不敢承诺。',
    advice: [
      '不是所有路都要同时走。选一条，先走深一点。',
      '你怕选错，但一直不选，也是一种选。',
      '给自己设一个期限，到期就做决定。',
      '放弃一边不等于浪费，留着力气走远更重要。',
    ],
  },
  {
    id: 'end-pause-clarity',
    title: '停下来，反而看清了方向',
    summary: '你按了暂停，世界没塌。你反而在空白里，找到了真正想做的事。',
    triggers: {
      state: {
        energy: { min: 55 },
        emotion: { min: 55 },
        riskExposure: { max: 45 },
      },
      choiceTagRatio: {
        rest: { min: 0.3 },
        reflective: { min: 0.3 },
      },
    },
    gains: [
      '更清楚的方向',
      '恢复的精力',
      '一段属于自己的时间',
      '一个可以慢慢想清楚的空间',
      '一种不着急的底气',
    ],
    costs: [
      '进度落后',
      '收入减少',
      '别人的不理解',
      '一个错过的窗口',
      '一些重新开始的成本',
    ],
    stuckPoint: '第一年停下来的时候，你花了三个月才不慌。',
    advice: [
      '停下来不是浪费。你只是把时间还给了自己。',
      '下次再慌的时候，记得你曾经停过，也活下来了。',
      '把“休息”写进日程，别等身体替你安排。',
      '方向不是想出来的，是在安静里长出来的。',
    ],
  },
  {
    id: 'end-pushed-accept',
    title: '被推着走，最后认了',
    summary: '你走的是一条“应该走”的路。走到第五年，你分不清这是不是自己的愿望，但你决定认了。',
    triggers: {
      state: {
        relationship: { min: 55 },
        riskExposure: { max: 40 },
        emotion: { max: 55 },
      },
      choiceTagRatio: {
        conservative: { min: 0.4 },
        stabilityFocus: { min: 0.3 },
      },
      riskLevel: 'low',
    },
    gains: [
      '家人的安心',
      '稳定的生活',
      '一段没有太大冲突的关系',
      '一个外人看着不错的样子',
      '一种“终于不折腾了”的平静',
    ],
    costs: [
      '没试过的那条路',
      '某个“如果当初”的念头',
      '一次没说的坦白',
      '一个被压下去的声音',
      '一些没问出口的问题',
    ],
    stuckPoint: '第三年，你向家人坦白，但没说出口的那半句，一直留在心里。',
    advice: [
      '认了不是输。但认了之后，试着在里面找到一点自己的东西。',
      '你还有机会说那半句话，不用等到下一个五年。',
      '问问自己：如果没人会失望，你会选什么？',
      '稳定可以是选择，但别让它变成默认。',
    ],
  },
  {
    id: 'end-success-no-stop',
    title: '小有成就，但不敢停',
    summary: '外面看着不错。但你知道自己一直在跑，不敢停。停下来会让你面对一些事。',
    triggers: {
      state: {
        skill: { min: 65 },
        cashflow: { min: 55 },
        energy: { max: 40 },
        emotion: { max: 45 },
      },
      choiceTagRatio: {
        highInvest: { min: 0.5 },
        careerFocus: { min: 0.3 },
      },
      riskLevel: 'high',
    },
    gains: [
      '可见的成就',
      '别人的认可',
      '更强的能力',
      '一个能拿得出手的履历',
      '一种“我还能跑”的错觉',
    ],
    costs: [
      '精力透支',
      '关系收缩',
      '一个不敢面对的问题',
      '一些错过的日常',
      '一个很久没休息的身体',
    ],
    stuckPoint: '第四年，身体替你按了暂停，你才发现自己有多累。',
    advice: [
      '你不欠任何人一个“一直很好”。',
      '停下来不会让你失去什么，真的。',
      '找一个可以说话的人，把那个不敢面对的问题说出来。',
      '成就不是证明，你可以只是休息。',
    ],
  },
  {
    id: 'end-loss-regrow',
    title: '失去之后，重新长出来',
    summary: '你失去了一些东西。但五年后回头看，你也在失去的地方，长出了新的东西。',
    triggers: {
      state: {
        emotion: { min: 45 },
        relationship: { min: 45 },
      },
      choiceTagRatio: {
        healthFocus: { min: 0.2 },
        reflective: { min: 0.2 },
        relationInvest: { min: 0.2 },
      },
    },
    gains: [
      '更强的韧性',
      '更真实的关系',
      '对自己的了解',
      '一种不急着证明的安静',
      '一些新的可能',
    ],
    costs: [
      '一段回不去的过去',
      '一个不会消失的空位',
      '一些变慢的时刻',
      '一个偶尔还会疼的地方',
      '一些需要重新学的事',
    ],
    stuckPoint: '第一年，你还在适应“少了一个人/一件事”的生活。',
    advice: [
      '你不用急着“走出来”。有些东西会一直带着，但会变轻。',
      '你比你想象中更能扛。',
      '让一个人陪你走这段，不用一个人扛完。',
      '慢一点没关系，你已经在长了。',
    ],
  },
  {
    id: 'end-free-anchorless',
    title: '自由了，但还在找锚',
    summary: '你自由了。没有硬约束，也没有方向。你在很多地方待过，但还没找到那个让你想停下来的地方。',
    triggers: {
      state: {
        timeFreedom: { min: 60 },
        relationship: { max: 45 },
        cashflow: { max: 50 },
      },
      choiceTagRatio: {
        pivot: { min: 0.3 },
        highRisk: { min: 0.3 },
      },
      riskLevel: 'high',
    },
    gains: [
      '自由度',
      '多种体验',
      '对自己的了解',
      '一些别人没有的故事',
      '一种“我可以去任何地方”的轻盈',
    ],
    costs: [
      '不稳定的现金流',
      '浅关系多深关系少',
      '一个还没找到的锚',
      '一些没有下文的相遇',
      '一个越来越轻的行李',
    ],
    stuckPoint: '第三年，你发现“自由”和“漂浮”之间，只差一个让你留下的人或事。',
    advice: [
      '自由很好。但自由也需要一个锚，不然会变成漂。',
      '试着在一个地方待久一点，看看会发生什么。',
      '你不需要马上找到答案，但可以开始留意什么让你想留下。',
      '轻盈不是错，但偶尔落地，也不是背叛自由。',
    ],
  },
  {
    id: 'end-relation-priority',
    title: '关系优先，事业让路，但不后悔',
    summary: '你把时间还给了人。事业慢了一点，但你不后悔。你终于知道什么对你最重要。',
    triggers: {
      state: {
        relationship: { min: 65 },
        emotion: { min: 55 },
        cashflow: { max: 55 },
      },
      choiceTagRatio: {
        relationInvest: { min: 0.4 },
        conservative: { min: 0.2 },
      },
    },
    gains: [
      '更深的关系',
      '情绪的稳定',
      '一个清楚的价值排序',
      '一些被认真对待的人',
      '一种不后悔的踏实',
    ],
    costs: [
      '事业上的机会成本',
      '别人的不理解',
      '一个“如果当初拼一把”的念头',
      '一些被放下的野心',
      '一个变慢的进度条',
    ],
    stuckPoint: '第四年，你看到同龄人跑得更快，心里动了一下。',
    advice: [
      '你选了你认为重要的东西，这需要勇气。',
      '但记得也对自己好一点，关系不是单向的付出。',
      '事业可以晚一点，但别把它彻底关掉。',
      '你不是没野心，你只是把野心放在了别处。',
    ],
  },
  {
    id: 'end-nothing-changed',
    title: '什么都没大变，但你变了',
    summary: '五年过去，外面看什么都没大变。但你知道，你变了。你看事情的方式不一样了。',
    triggers: {
      // 兜底原型：匹配分数低于阈值时走这里
      state: {
        emotion: { min: 45 },
      },
      choiceTagRatio: {
        conservative: { min: 0.3 },
      },
    },
    gains: [
      '更稳的情绪',
      '更清楚自己不要什么',
      '一种安静的底气',
      '一些不慌的早晨',
      '一个更了解自己的你',
    ],
    costs: [
      '没有大突破',
      '一些没试过的可能性',
      '时间过去了',
      '一些没抓住的机会',
      '一个还没开始的计划',
    ],
    stuckPoint: '第二年，你选了“什么都不变，先观察半年”，然后一直在观察。',
    advice: [
      '不是所有五年都要有大故事。你安静地长了一些东西。',
      '下一个五年，试着让一件事被看见。',
      '你已经准备好了，比自己以为的更准备好。',
      '变化不一定要惊天动地，你已经不一样了。',
    ],
  },
];

export const endingsById: Record<string, Ending> = Object.fromEntries(
  endings.map((e) => [e.id, e])
);

export const FALLBACK_ENDING_ID = 'end-nothing-changed';