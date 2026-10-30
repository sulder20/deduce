import { useState } from 'react';
import { useSessionStore } from '@/store/sessionStore';
import { calibrationQuestions } from '@/content/calibration';

export default function CalibrationScreen() {
  const setCalibrationAnswer = useSessionStore((s) => s.setCalibrationAnswer);
  const finishCalibration = useSessionStore((s) => s.finishCalibration);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const question = calibrationQuestions[currentIndex];

  const handleSelect = (optionId: string) => {
    if (selectedId) return; // 防止连点
    
    // 1. 记录答案
    setSelectedId(optionId);
    setCalibrationAnswer(question.id, optionId);

    // 2. 停顿 400ms 后进入下一题
    setTimeout(() => {
      if (currentIndex < calibrationQuestions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedId(null);
      } else {
        // 最后一题结束，进入过渡态
        setIsTransitioning(true);
        // 停顿 1800ms 后正式进入推演
        setTimeout(() => {
          finishCalibration();
        }, 1800);
      }
    }, 400);
  };

  if (isTransitioning) {
    return (
      <div style={{ paddingTop: '30vh', textAlign: 'center' }}>
        <p className="serif" style={{ fontSize: 24, color: 'var(--accent)', animation: 'fadeUp 0.8s var(--ease)' }}>
          好了，我们开始。
        </p>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 60, paddingBottom: 40 }}>
      {/* 顶部进度点 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 48 }}>
        {calibrationQuestions.map((_, idx) => (
          <div
            key={idx}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: idx <= currentIndex ? 'var(--accent)' : 'var(--line)',
              transition: 'background 0.3s',
            }}
          />
        ))}
      </div>

      {/* 题目文字 */}
      <h2 
        key={`q-${question.id}`}
        className="serif" 
        style={{ 
          fontSize: 22, 
          textAlign: 'center', 
          marginBottom: 40,
          animation: 'fadeUp 0.6s var(--ease)'
        }}
      >
        {question.question}
      </h2>

      {/* 选项列表 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {question.options.map((opt, idx) => {
          const isSelected = selectedId === opt.id;
          const isOther = selectedId !== null && !isSelected;

          return (
            <div
              key={opt.id}
              className={`card selectable ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelect(opt.id)}
              style={{
                textAlign: 'center',
                padding: '16px',
                animation: `fadeUp 0.5s var(--ease) forwards`,
                animationDelay: `${idx * 0.1}s`,
                opacity: 0, // 初始隐藏，靠动画浮现
                ...(isOther && { opacity: 0.3, pointerEvents: 'none' }),
                ...(isSelected && { 
                  transform: 'scale(1.02)',
                  borderColor: 'var(--accent)',
                  boxShadow: '0 0 12px rgba(217, 164, 65, 0.2)'
                })
              }}
            >
              <span style={{ fontSize: 16 }}>{opt.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}