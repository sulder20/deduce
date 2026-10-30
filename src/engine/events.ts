import { events } from '@/content/events';
import { allChoices } from '@/content/choices';
import type { GameEvent, StateRecord, YearRecord, StateKey } from '@/content/types';
import { createRandom, hashSeed } from './random';

export interface EventCheckContext {
  state: StateRecord;
  year: number;
  currentChoiceTags: string[];
  previousYears: YearRecord[];
  firedEventIds: string[];
  seed: number;
}

export function checkEvents(ctx: EventCheckContext): GameEvent | null {
  const candidates = events.filter((ev) => {
    if (ev.maxOncePerSession && ctx.firedEventIds.includes(ev.id)) return false;
    return matchCondition(ev, ctx);
  });

  if (candidates.length === 0) return null;

  // 优先级：情绪 <= 30 时支持类优先；否则压力类优先
  const supportPriority = ctx.state.emotion <= 30;
  const sorted = [...candidates].sort((a, b) => rank(a, supportPriority) - rank(b, supportPriority));

  for (const ev of sorted) {
    const rand = createRandom(hashSeed(ctx.seed, `event-${ctx.year}-${ev.id}`));
    if (rand() < ev.baseProbability) {
      return ev;
    }
  }

  return null;
}

function rank(e: GameEvent, supportPriority: boolean): number {
  if (supportPriority && e.type === 'support') return 0;
  if (e.type === 'pressure') return 1;
  if (e.type === 'support') return 2;
  return 3;
}

function matchCondition(ev: GameEvent, ctx: EventCheckContext): boolean {
  const cond = ev.condition;

  if (cond.year) {
    if (cond.year.min !== undefined && ctx.year < cond.year.min) return false;
    if (cond.year.max !== undefined && ctx.year > cond.year.max) return false;
  }

  if (cond.state) {
    for (const key of Object.keys(cond.state) as StateKey[]) {
      const range = cond.state[key]!;
      const value = ctx.state[key];
      if (range.min !== undefined && value < range.min) return false;
      if (range.max !== undefined && value > range.max) return false;
    }
  }

  if (cond.choiceTags && cond.choiceTags.length > 0) {
    const hasTag = cond.choiceTags.some((t) => ctx.currentChoiceTags.includes(t));
    if (!hasTag) return false;
  }

  if (cond.consecutive) {
    const { tag, years } = cond.consecutive;
    if (!ctx.currentChoiceTags.includes(tag)) return false;
    if (years > 1) {
      if (ctx.previousYears.length < years - 1) return false;
      const recent = ctx.previousYears.slice(-(years - 1));
      const allHave = recent.every((yr) => {
        const c = allChoices.find((x) => x.id === yr.choiceId);
        return c?.tags.includes(tag);
      });
      if (!allHave) return false;
    }
  }

  return true;
}