import { situations } from '@/content/situations';
import { calibrationQuestions } from '@/content/calibration';
import type { Choice, Session, YearRecord } from '@/content/types';
import { initState, applyEffects, getTier } from './state';
import { drawChoicesForYear } from './choices';
import { checkEvents } from './events';
import { matchEnding, generateEnding } from './endings';
import { createRandom, hashSeed } from './random';

export interface SimulationOptions {
  seed: number;
  situationId: string;
  calibration: Record<string, string>;
  strategy?: 'first' | 'random';
}

export interface SimulationResult {
  session: Session;
  generatedEnding: ReturnType<typeof generateEnding>;
  log: string[];
}

export function runSimulation(opts: SimulationOptions): SimulationResult {
  const situation = situations.find((s) => s.id === opts.situationId);
  if (!situation) throw new Error(`Situation not found: ${opts.situationId}`);

  const init = initState(situation, calibrationQuestions, opts.calibration);
  let state = init.state;
  let overflow = init.overflow;

  const years: YearRecord[] = [];
  const unchosen: string[] = [];
  const firedEventIds: string[] = [];
  const log: string[] = [];

  log.push(`种子: ${opts.seed}`);
  log.push(`处境: ${situation.title}`);
  log.push(`初始状态: ${JSON.stringify(state)}`);

  for (let year = 1; year <= 5; year++) {
    const choices = drawChoicesForYear(year, opts.seed);
    const choice: Choice =
      opts.strategy === 'random'
        ? choices[Math.floor(createRandom(hashSeed(opts.seed, `pick-${year}`))() * choices.length)]
        : choices[0];

    log.push(`\n第${year}年 选择: ${choice.title}`);

    choices
      .filter((c) => c.id !== choice.id)
      .forEach((c) => unchosen.push(...c.tags));

    const afterChoice = applyEffects(state, overflow, choice.effects);
    state = afterChoice.state;
    overflow = afterChoice.overflow;

    const event = checkEvents({
      state,
      year,
      currentChoiceTags: choice.tags,
      previousYears: years,
      firedEventIds,
      seed: opts.seed,
    });

    let eventId: string | undefined;
    if (event) {
      log.push(`  事件: ${event.name} — ${event.narration}`);
      const afterEvent = applyEffects(state, overflow, event.effects);
      state = afterEvent.state;
      overflow = afterEvent.overflow;
      eventId = event.id;
      firedEventIds.push(event.id);
    }

    years.push({
      year,
      choiceId: choice.id,
      eventId,
      stateAfter: { ...state },
      narration: choice.narration,
    });

    log.push(
      `  年末: 精力 ${state.energy}(${getTier(state.energy)}) 现金 ${state.cashflow} 关系 ${state.relationship} 风险 ${state.riskExposure}`
    );
  }

  const session: Session = {
    seed: opts.seed,
    situationId: opts.situationId,
    calibration: opts.calibration,
    state,
    overflow,
    years,
    unchosen,
    version: '0.1.0',
  };

  const ending = matchEnding(session);
  session.outcomeId = ending.id;
  const generatedEnding = generateEnding(session, ending);

  log.push(`\n结局: ${generatedEnding.title}`);
  log.push(`摘要: ${generatedEnding.summary}`);
  log.push(`路径: ${generatedEnding.pathKeywords.join(' · ')}`);
  log.push(`五维: ${JSON.stringify(generatedEnding.fiveDimensions)}`);
  log.push(`忠告: ${generatedEnding.advice}`);
  log.push(`没走的路: ${generatedEnding.alternativePaths.join(' / ')}`);

  return { session, generatedEnding, log };
}