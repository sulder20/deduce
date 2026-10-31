import { useEffect, useState } from 'react';
import { useSessionStore } from '@/store/sessionStore';

const LINES = [
  '你有没有，在某个安静的晚上，回头看过自己走过的路？',
  '你现在的人生，如果用一个词形容，会是什么？',
  '你有没有偷偷想过，五年后的自己，会在哪里，和谁，过着怎样的日子？',
  '那些你曾经做过的选择，有多少，悄悄改变了你？',
  '欢迎来到岁窦推演所。',
  '这里不预测未来。\n只陪你走一遍，那些你没走的路。',
];

export default function OpeningScreen() {
  const startGame = useSessionStore((s) => s.startGame);
  const [visibleLines, setVisibleLines] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const playSequence = async () => {
      // 1. 立即显示第一句
      if (!isCancelled) setVisibleLines(1);

      // 2. 依次显示剩下的句子（延迟时间：2.5s, 2.5s, 2.5s, 2.5s, 2s, 3s）
      const delays = [2500, 2500, 2500, 2500, 2000, 3000];
      
      for (let i = 1; i < LINES.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, delays[i - 1]));
        if (isCancelled) return;
        setVisibleLines(i + 1);
      }

      // 3. 最后一句出现后，延迟 1 秒显示按钮
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!isCancelled) setShowButton(true);
    };

    playSequence();

    return () => {
      isCancelled = true; // 组件卸载时中断动画
    };
  }, []);

  const handleSkip = () => {
    setVisibleLines(LINES.length);
    setShowButton(true);
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '15vh', position: 'relative', minHeight: '80vh' }}>
      <button 
        onClick={handleSkip} 
        className="btn btn-ghost" 
        style={{ position: 'absolute', top: -20, left: 0, zIndex: 10 }}
      >
        跳过开场
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {LINES.map((line, idx) => {
          const isVisible = idx < visibleLines;
          const isWelcome = idx === 4;
          const isSub = idx === 5;

          return (
            <p
              key={idx}
              className={isWelcome ? 'serif' : ''}
              style={{
                fontSize: isWelcome ? 24 : isSub ? 16 : 15,
                color: isWelcome ? 'var(--accent)' : isSub ? 'var(--text-dim)' : 'var(--text)',
                letterSpacing: isWelcome ? '0.1em' : 'normal',
                whiteSpace: 'pre-wrap',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
              }}
            >
              {line}
            </p>
          );
        })}
      </div>

      <div style={{ marginTop: 60, opacity: showButton ? 1 : 0, transition: 'opacity 1s', pointerEvents: showButton ? 'auto' : 'none' }}>
        <button className="btn btn-primary" onClick={startGame} style={{ padding: '16px 40px', fontSize: 16 }}>
          推演一条平行人生
        </button>
        <p className="faint" style={{ marginTop: 16, fontSize: 12 }}>
          虚构推演，不是预测；默认本地保存，不上传。
        </p>
      </div>
    </div>
  );
}