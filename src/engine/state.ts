import {
  STATE_KEYS,
  type StateKey,
  type StateRecord,
  type StateVector,
  type Tier,
  type Situation,
  type CalibrationQuestion,
} from '@/content/types';

export const STATE_MIN = 0;
export const STATE_MAX = 100;

export function clamp(v: number, min = STATE_MIN, max = STATE_MAX): number {
  return Math.max(min, Math.min(max, v));
}

export function getTier(value: number): Tier {
  if (value <= 25) return 'low';
  if (value <= 50) return 'midLow';
  if (value <= 75) return 'midHigh';
  return 'high';
}

export function createEmptyState(value = 50): StateRecord {
  const s = {} as StateRecord;
  for (const key of STATE_KEYS) s[key] = value;
  return s;
}

export function createEmptyOverflow(): StateRecord {
  const s = {} as StateRecord;
  for (const key of STATE_KEYS) s[key] = 0;
  return s;
}

export interface ApplyResult {
  state: StateRecord;
  overflow: StateRecord;
  changes: Partial<Record<StateKey, number>>;
}

export function applyEffects(
  current: StateRecord,
  overflow: StateRecord,
  effects: StateVector
): ApplyResult {
  const next = { ...current };
  const nextOverflow = { ...overflow };
  const changes: Partial<Record<StateKey, number>> = {};

  for (const key of STATE_KEYS) {
    const delta = effects[key] ?? 0;
    if (delta === 0) continue;
    const raw = next[key] + delta;
    const clamped = clamp(raw);
    const overflowAmount =
      raw > STATE_MAX ? raw - STATE_MAX : raw < STATE_MIN ? STATE_MIN - raw : 0;
    if (overflowAmount > 0) {
      nextOverflow[key] += overflowAmount;
    }
    changes[key] = clamped - next[key];
    next[key] = clamped;
  }

  return { state: next, overflow: nextOverflow, changes };
}

export function initState(
  situation: Situation,
  calibration: CalibrationQuestion[],
  answers: Record<string, string>
): { state: StateRecord; overflow: StateRecord } {
  let state: StateRecord = { ...createEmptyState(50), ...situation.baseState } as StateRecord;
  let overflow = createEmptyOverflow();

  for (const q of calibration) {
    const answerId = answers[q.id];
    const option = q.options.find((o) => o.id === answerId);
    if (!option) continue;
    const result = applyEffects(state, overflow, option.effects);
    state = result.state;
    overflow = result.overflow;
  }

  return { state, overflow };
}