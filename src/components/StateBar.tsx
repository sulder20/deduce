import { STATE_KEYS, STATE_SHORT_LABELS, STATE_TIERS, type StateRecord } from '@/content/types';

export default function StateBar({ state }: { state: StateRecord }) {
  const tierOf = (value: number) => {
    if (value <= 25) return 'low';
    if (value <= 50) return 'midLow';
    if (value <= 75) return 'midHigh';
    return 'high';
  };

  return (
    <div className="state-bar">
      {STATE_KEYS.map((key) => {
        const value = state[key];
        const tier = tierOf(value);
        return (
          <span key={key} className="state-item" data-tier={tier}>
            <span className="dot" />
            {STATE_SHORT_LABELS[key]} · {STATE_TIERS[key][tier]}
          </span>
        );
      })}
    </div>
  );
}