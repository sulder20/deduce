import { endings, FALLBACK_ENDING_ID } from '@/content/endings';
import { allChoices } from '@/content/choices';
import type { Ending, GeneratedEnding, Session, StateKey, RiskLevel } from '@/content/types';

export function matchEnding(session: Session): Ending {
  let bestEnding: Ending | null = null;
  let bestScore = -Infinity;

  for (const ending of endings) {
    if (ending.id === FALLBACK_ENDING_ID) continue;
    const score = scoreEnding(ending, session);
    if (score > bestScore) {
      bestScore = score;
      bestEnding = ending;
    }
  }

  if (!bestEnding || bestScore < 5) {
    return endings.find((e) => e.id === FALLBACK_ENDING_ID)!;
  }
  return bestEnding;
}

function scoreEnding(ending: Ending, session: Session): number {
  let score = 0;
  const t = ending.triggers;

  if (t.state) {
    for (const key of Object.keys(t.state) as StateKey[]) {
      const range = t.state[key]!;
      const value = session.state[key];
      const inRange =
        (range.min === undefined || value >= range.min) &&
        (range.max === undefined || value <= range.max);
      score += inRange ? 2 : -1;
    }
  }

  if (t.choiceTagRatio) {
    const total = session.years.length || 1;
    for (const [tag, req] of Object.entries(t.choiceTagRatio)) {
      const count = session.years.filter((yr) => {
        const c = allChoices.find((x) => x.id === yr.choiceId);
        return c?.tags.includes(tag);
      }).length;
      if (count / total >= (req.min ?? 0)) score += 3;
    }
  }

  if (t.riskLevel) {
    const avg = session.state.riskExposure;
    const level: RiskLevel = avg <= 40 ? 'low' : avg <= 60 ? 'mid' : 'high';
    if (level === t.riskLevel) score += 2;
  }

  return score;
}

export function generateEnding(session: Session, ending: Ending): GeneratedEnding {
  return {
    endingId: ending.id,
    title: ending.title,
    summary: ending.summary,
    pathKeywords: generatePathKeywords(session),
    gains: ending.gains.slice(0, 3),
    costs: ending.costs.slice(0, 3),
    stuckPoint: ending.stuckPoint,
    regret: findRegret(session),
    advice: pickAdvice(ending, session),
    alternativePaths: generateAlternativePaths(session),
    fiveDimensions: computeFiveDimensions(session),
  };
}

function generatePathKeywords(session: Session): string[] {
  const kw: string[] = [];
  const avgRisk = session.state.riskExposure;
  kw.push(avgRisk >= 60 ? '高风险' : avgRisk <= 35 ? '稳' : '中风险');

  const counts: Record<string, number> = {};
  for (const yr of session.years) {
    const c = allChoices.find((x) => x.id === yr.choiceId);
    c?.tags.forEach((tag) => { counts[tag] = (counts[tag] ?? 0) + 1; });
  }

  if ((counts.highInvest ?? 0) >= 2) kw.push('高投入');
  if ((counts.relationInvest ?? 0) >= 2) kw.push('关系投入');
  if ((counts.relationWithdraw ?? 0) >= 2) kw.push('关系收缩');
  if ((counts.pivot ?? 0) >= 1) kw.push('换轨');
  if ((counts.rest ?? 0) >= 1) kw.push('减速');
  if ((counts.conservative ?? 0) >= 3) kw.push('保守');

  return kw.slice(0, 4);
}

function findRegret(session: Session): string {
  let worstYear = 0;
  let worstNarration = '';
  let worstScore = -1;

  for (const yr of session.years) {
    const c = allChoices.find((x) => x.id === yr.choiceId);
    if (!c) continue;
    const score = (c.risk === 'high' ? 2 : c.risk === 'mid' ? 1 : 0) + c.hiddenCostTags.length;
    if (score > worstScore) {
      worstScore = score;
      worstYear = yr.year;
      worstNarration = c.narration;
    }
  }

  if (!worstNarration) return '没有。你走的每一步，都是当时能走的最好的一步。';
  return `第${worstYear}年：${worstNarration}`;
}

function pickAdvice(ending: Ending, session: Session): string {
  const emotion = session.state.emotion;
  const idx = emotion <= 40 ? 0 : emotion <= 70 ? 1 : 2;
  return ending.advice[Math.min(idx, ending.advice.length - 1)];
}

function computeFiveDimensions(session: Session): GeneratedEnding['fiveDimensions'] {
  const s = session.state;
  return {
    career: Math.round(s.skill * 0.6 + s.cashflow * 0.4),
    relationship: Math.round(s.relationship),
    health: Math.round(s.energy),
    freedom: Math.round(s.timeFreedom),
    meaning: Math.round(s.emotion * 0.7 + s.skill * 0.3),
  };
}

function generateAlternativePaths(session: Session): string[] {
  const counts: Record<string, number> = {};
  for (const tag of session.unchosen) {
    counts[tag] = (counts[tag] ?? 0) + 1;
  }

  const top = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([tag]) => tag);

  const map: Record<string, string> = {
    highRisk: '你差点选了那条更冒险的路。它可能给你更大的舞台，也可能让你更早地感到害怕。',
    conservative: '你差点选了那条更稳的路。它可能让你更安全，也可能让你更早地问自己“就这样了吗”。',
    relationInvest: '你差点把更多时间还给了关系。它可能让你更暖，也可能让你慢一点。',
    relationWithdraw: '你差点更早地离开了一段消耗。它可能让你更轻，也可能让你更孤独。',
    pivot: '你差点更早地换了一次轨。它可能让你重新开始，也可能让你失去一些已经积累的东西。',
    rest: '你差点更早地停下来。它可能让你恢复，也可能让你错过一个窗口。',
  };

  const paths = top.map((t) => map[t] ?? `你差点走了另一条路：${t}。`);
  if (paths.length === 0) paths.push('你没有太多犹豫。你走了一条很确定的路。');
  if (paths.length === 1) paths.push('另一条路，你没有多想。也许那也是一种答案。');
  return paths;
}