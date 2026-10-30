import type { Choice } from '../types';
import { year1Choices } from './year1';
import { year2Choices } from './year2';
import { year3Choices } from './year3';
import { year4Choices } from './year4';
import { year5Choices } from './year5';

export const allChoices: Choice[] = [
  ...year1Choices,
  ...year2Choices,
  ...year3Choices,
  ...year4Choices,
  ...year5Choices,
];

export const choicesByYear: Record<number, Choice[]> = {
  1: year1Choices,
  2: year2Choices,
  3: year3Choices,
  4: year4Choices,
  5: year5Choices,
};

export const choicesById: Record<string, Choice> = Object.fromEntries(
  allChoices.map((c) => [c.id, c])
);