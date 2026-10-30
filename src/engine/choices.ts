import { choicesByYear } from '@/content/choices';
import type { Choice } from '@/content/types';
import { hashSeed, createRandom, pickN } from './random';

export function drawChoicesForYear(year: number, seed: number): Choice[] {
  const pool = choicesByYear[year] ?? [];
  const rand = createRandom(hashSeed(seed, `year-${year}-choices`));
  return pickN(pool, Math.min(3, pool.length), rand);
}