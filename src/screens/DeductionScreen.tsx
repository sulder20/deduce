import { useState } from 'react';
import { useSessionStore } from '@/store/sessionStore';
import StateBar from '@/components/StateBar';
import Typewriter from '@/components/Typewriter';
import type { Choice } from '@/content/types';

export default function DeductionScreen() {
  const { 
    currentYear, 
    currentChoices, 
    state, 
    makeChoice, 
    hasMadeChoice, 
    currentEvent, 
    nextYear,
  } = useSessionStore();

  const [activeChoice, setActiveChoice] = useState<Choice | null>(null);
  const [showSettlement, setShowSettlement] = useState(false);

  const handleSelect = (choice: Choice) => {
    if (hasMadeChoice) return;
    setActiveChoice(choice);
    setTimeout(() => {
      makeChoice(choice.id);
      // 等待卡牌揭示动画完成，再显示年度结算
      setTimeout(() => setShowSettlement(true), 1500);
    }, 400);
  };

  const handleNext = () => {
    setActiveChoice(null);
    setShowSettlement(false);
    nextYear();
  };

  if (!state) return null;

  const yearTitles = ['', '第一年 · 方向', '第二年 · 投入', '第三年 · 关系与代价', '第四年 · 危机与转折', '第五年 · 收束'];

  return (
    <div style={{ paddingTop: 20, paddingBottom: 40 }}>
      <StateBar state={state} />

      <h2 className="serif" style={{ fontSize: 24, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ width: 24, height: 2, background: 'var(--accent)' }} />
        {yearTitles[currentYear]}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {currentChoices.map((c) => {
          const isSelected = activeChoice?.id === c.id;
          const isDimmed = activeChoice !== null && !isSelected;

          return (
            <div
              key={c.id}
              className={`card ${!hasMadeChoice ? 'selectable' : ''} ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelect(c)}
              style={{
                opacity: isDimmed ? 0.2 : 1,
                transform: isDimmed ? 'scale(0.98)' : 'scale(1)',
                transition: 'all 0.5s var(--ease)',
                pointerEvents: hasMadeChoice ? 'none' : 'auto',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <strong style={{ fontSize: 18 }}>{c.title}</strong>
                <span className="mono faint" style={{ 
                  color: c.risk === 'high' ? 'var(--danger)' : c.risk === 'mid' ? 'var(--accent)' : 'var(--text-dim)'
                }}>
                  {c.risk === 'high' ? '高风险' : c.risk === 'mid' ? '中风险' : '低风险'}
                </span>
              </div>
              <p className="dim" style={{ fontSize: 14, marginBottom: 12 }}>
                {c.surfaceGain}
              </p>

              {/* 揭示隐藏代价与旁白 */}
              <div style={{
                maxHeight: isSelected ? 200 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.6s ease',
                opacity: isSelected ? 1 : 0,
              }}>
                <div style={{ borderTop: '1px solid var(--line)', paddingTop: 16, marginTop: 16 }}>
                  <p style={{ fontSize: 13, color: 'var(--danger)', marginBottom: 12, fontWeight: 'bold' }}>
                    隐藏代价：{c.hiddenCostTags.join(' / ')}
                  </p>
                  <p className="serif" style={{ fontStyle: 'italic', color: 'var(--text)', fontSize: 16 }}>
                    “{c.narration}”
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 事件卡弹出 */}
      {hasMadeChoice && currentEvent && (
        <div style={{ 
          marginTop: 24, 
          padding: 24, 
          background: currentEvent.type === 'pressure' ? 'rgba(181, 84, 74, 0.08)' : currentEvent.type === 'support' ? 'rgba(217, 164, 65, 0.08)' : 'var(--bg-soft)',
          border: `1px solid ${currentEvent.type === 'pressure' ? 'var(--danger)' : currentEvent.type === 'support' ? 'var(--accent)' : 'var(--line)'}`,
          borderRadius: 'var(--radius-lg)',
          animation: 'fadeUp 0.6s var(--ease)'
        }}>
          <p className="mono faint" style={{ marginBottom: 8 }}>突发事件 · {currentEvent.type === 'pressure' ? '压力' : currentEvent.type === 'support' ? '支持' : '转折'}</p>
          <h3 style={{ fontSize: 20, marginBottom: 12, color: currentEvent.type === 'pressure' ? 'var(--danger)' : 'var(--accent)', fontFamily: 'var(--font-serif)' }}>
            {currentEvent.name}
          </h3>
          <Typewriter 
            text={`“${currentEvent.narration}”`} 
            className="serif" 
            style={{ fontSize: 16, lineHeight: 1.8 }} 
          />
        </div>
      )}

      {/* 年度结算 / 下一题按钮 */}
      {showSettlement && (
        <div style={{ marginTop: 32, animation: 'fadeUp 0.8s var(--ease)' }}>
          <div className="card" style={{ background: 'transparent', borderStyle: 'dashed', marginBottom: 24, padding: 20 }}>
             <p className="dim" style={{ fontSize: 14 }}>
               这一年，你的精力变成了「{state.energy <= 25 ? '透支' : state.energy <= 50 ? '疲惫' : '还行'}」，关系变成了「{state.relationship <= 25 ? '疏离' : state.relationship <= 50 ? '变薄' : '有支撑'}」。
             </p>
          </div>

          <button className="btn btn-primary" onClick={handleNext} style={{ width: '100%', padding: '16px' }}>
            {currentYear === 5 ? '查看人生档案' : '进入下一年'}
          </button>
        </div>
      )}
    </div>
  );
}