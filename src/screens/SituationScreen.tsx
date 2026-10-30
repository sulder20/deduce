import { useState, useEffect } from 'react';
import { useSessionStore } from '@/store/sessionStore';
import { situations } from '@/content/situations';
import { STATE_SHORT_LABELS, STATE_TIERS, type StateKey } from '@/content/types';

export default function SituationScreen() {
  const seed = useSessionStore((s) => s.seed);
  const setSituation = useSessionStore((s) => s.setSituation);
  
  const [currentCard, setCurrentCard] = useState(situations[0]);
  const [hasSwapped, setHasSwapped] = useState(false);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    // 根据种子随机抽一张
    const idx = Math.floor((seed || Date.now()) % situations.length);
    setCurrentCard(situations[idx]);
  }, [seed]);

  const handleSwap = () => {
    if (hasSwapped) return;
    // 换一张，不能和当前一样
    let next = currentCard;
    while (next.id === currentCard.id && situations.length > 1) {
      next = situations[Math.floor(Math.random() * situations.length)];
    }
    setCurrentCard(next);
    setHasSwapped(true);
  };

  const tierOf = (value: number) => {
    if (value <= 25) return 'low';
    if (value <= 50) return 'midLow';
    if (value <= 75) return 'midHigh';
    return 'high';
  };

  if (showList) {
    return (
      <div style={{ paddingTop: 20, paddingBottom: 40 }}>
        <p className="mono faint" style={{ marginBottom: 16, textAlign: 'center' }}>
          选择处境
        </p>
        <div style={{ display: 'grid', gap: 12 }}>
          {situations.map(s => (
            <div 
              key={s.id} 
              className="card selectable" 
              onClick={() => setSituation(s.id)}
              style={{ padding: 16 }}
            >
              <strong>{s.title}</strong>
              <p className="dim" style={{ fontSize: 13, marginTop: 4 }}>{s.description}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button className="btn btn-ghost" onClick={() => setShowList(false)}>
            返回随机
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 40, paddingBottom: 40 }}>
      <p className="mono faint" style={{ marginBottom: 16, textAlign: 'center' }}>
        当前的处境
      </p>
      
      <div className="card" style={{ minHeight: 260, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 className="serif" style={{ fontSize: 28, marginBottom: 12, textAlign: 'center' }}>
          {currentCard.title}
        </h2>
        <p className="dim" style={{ marginBottom: 8, textAlign: 'center' }}>
          {currentCard.description}
        </p>
        <p className="faint" style={{ fontSize: 13, marginBottom: 24, textAlign: 'center' }}>
          {currentCard.fitIf}
        </p>

        <div className="state-bar" style={{ justifyContent: 'center' }}>
          {(Object.keys(currentCard.baseState) as StateKey[]).map((key) => {
            const value = currentCard.baseState[key] ?? 0;
            const tier = tierOf(value);
            return (
              <span key={key} className="state-item" data-tier={tier}>
                <span className="dot" />
                {STATE_SHORT_LABELS[key]} · {STATE_TIERS[key][tier]}
              </span>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        <button 
          className="btn" 
          onClick={handleSwap} 
          disabled={hasSwapped}
          style={{ flex: 1, opacity: hasSwapped ? 0.5 : 1 }}
        >
          {hasSwapped ? '不能再换了' : '换一张'}
        </button>
        <button 
          className="btn btn-primary" 
          onClick={() => setSituation(currentCard.id)}
          style={{ flex: 2 }}
        >
          就是这张
        </button>
      </div>

      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <button className="btn btn-ghost" onClick={() => setShowList(true)}>
          也可以自己选
        </button>
      </div>
    </div>
  );
}