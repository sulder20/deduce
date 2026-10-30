import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Choice, GameEvent, GeneratedEnding, Session, StateRecord, YearRecord } from '@/content/types';
import { initState, applyEffects } from '@/engine/state';
import { drawChoicesForYear } from '@/engine/choices';
import { checkEvents } from '@/engine/events';
import { matchEnding, generateEnding } from '@/engine/endings';
import { situations } from '@/content/situations';
import { calibrationQuestions } from '@/content/calibration';

export type Step = 'opening' | 'situation' | 'calibration' | 'deduction' | 'ending';

interface SessionState {
  step: Step;
  seed: number;
  situationId: string | null;
  calibration: Record<string, string>;
  state: StateRecord | null;
  overflow: StateRecord | null;
  years: YearRecord[];
  unchosen: string[];
  
  currentYear: number;
  currentChoices: Choice[];
  currentEvent: GameEvent | null;
  hasMadeChoice: boolean;
  generatedEnding: GeneratedEnding | null;

  startGame: () => void;
  setSituation: (id: string) => void;
  setCalibrationAnswer: (questionId: string, optionId: string) => void;
  finishCalibration: () => void;
  makeChoice: (choiceId: string) => void;
  nextYear: () => void;
  finishGame: () => void;
  resetGame: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      step: 'opening',
      seed: 0,
      situationId: null,
      calibration: {},
      state: null,
      overflow: null,
      years: [],
      unchosen: [],
      currentYear: 1,
      currentChoices: [],
      currentEvent: null,
      hasMadeChoice: false,
      generatedEnding: null,

      startGame: () => {
        set({
          step: 'situation',
          seed: Date.now() % 1000000,
          situationId: null,
          calibration: {},
          state: null,
          overflow: null,
          years: [],
          unchosen: [],
          currentYear: 1,
          currentChoices: [],
          currentEvent: null,
          hasMadeChoice: false,
          generatedEnding: null,
        });
      },

      setSituation: (id) => set({ situationId: id, step: 'calibration' }),

      setCalibrationAnswer: (questionId, optionId) => {
        set((prev) => ({
          calibration: { ...prev.calibration, [questionId]: optionId },
        }));
      },

      finishCalibration: () => {
        const { situationId, calibration, seed } = get();
        const situation = situations.find((s) => s.id === situationId);
        if (!situation) return;

        const init = initState(situation, calibrationQuestions, calibration);
        const firstChoices = drawChoicesForYear(1, seed);

        set({
          step: 'deduction',
          state: init.state,
          overflow: init.overflow,
          currentYear: 1,
          currentChoices: firstChoices,
          currentEvent: null,
          hasMadeChoice: false,
        });
      },

      makeChoice: (choiceId) => {
        const { state, overflow, years, unchosen, currentYear, seed, currentChoices } = get();
        const choice = currentChoices.find((c) => c.id === choiceId);
        if (!choice || !state || !overflow) return;

        const newUnchosen = [...unchosen];
        currentChoices
          .filter((c) => c.id !== choiceId)
          .forEach((c) => newUnchosen.push(...c.tags));

        const afterChoice = applyEffects(state, overflow, choice.effects);
        
        const event = checkEvents({
          state: afterChoice.state,
          year: currentYear,
          currentChoiceTags: choice.tags,
          previousYears: years,
          firedEventIds: years.filter((y) => y.eventId).map((y) => y.eventId!),
          seed,
        });

        let finalState = afterChoice.state;
        let finalOverflow = afterChoice.overflow;
        let eventId = undefined;

        if (event) {
          const afterEvent = applyEffects(finalState, finalOverflow, event.effects);
          finalState = afterEvent.state;
          finalOverflow = afterEvent.overflow;
          eventId = event.id;
        }

        const newYearRecord: YearRecord = {
          year: currentYear,
          choiceId: choice.id,
          eventId,
          stateAfter: finalState,
          narration: choice.narration,
        };

        set({
          state: finalState,
          overflow: finalOverflow,
          unchosen: newUnchosen,
          years: [...years, newYearRecord],
          currentEvent: event || null,
          hasMadeChoice: true,
        });
      },

      nextYear: () => {
        const { currentYear, seed } = get();
        if (currentYear >= 5) {
          get().finishGame();
          return;
        }

        const nextYearNumber = currentYear + 1;
        const nextChoices = drawChoicesForYear(nextYearNumber, seed);

        set({
          currentYear: nextYearNumber,
          currentChoices: nextChoices,
          currentEvent: null,
          hasMadeChoice: false,
        });
      },

      finishGame: () => {
        const { seed, situationId, calibration, state, overflow, years, unchosen } = get();
        if (!state || !overflow || !situationId) return;

        const session: Session = {
          seed,
          situationId,
          calibration,
          state,
          overflow,
          years,
          unchosen,
          version: '0.1.0',
        };

        const ending = matchEnding(session);
        session.outcomeId = ending.id;
        const generatedEnding = generateEnding(session, ending);

        set({
          generatedEnding,
          step: 'ending',
        });
      },

      resetGame: () => {
        // 重置并清空本地存储的当前进度
        set({
          step: 'opening',
          state: null,
          overflow: null,
          years: [],
          unchosen: [],
          generatedEnding: null,
        });
      },
    }),
    {
      name: 'deduce-session-storage', // 存入 localStorage 的 key
      partialize: (state) => {
        // 如果处于开屏状态，不保存进度，保持干净
        if (state.step === 'opening') return { step: 'opening' };
        return state; // 其他状态全部持久化
      }
    }
  )
);