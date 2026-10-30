import { useState } from 'react';
import { useSessionStore } from '@/store/sessionStore';
import { useProfileStore } from '@/store/profileStore';
import { generateShareCard } from '@/share/generateShareCard';
import Typewriter from '@/components/Typewriter';

export default function EndingScreen() {
  const { generatedEnding, resetGame, seed, situationId, calibration, state, overflow, years, unchosen } = useSessionStore();
  const { profile, saveArchive } = useProfileStore();
  
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [nickname, setNickname] = useState('');
  const [isSharing, setIsSharing] = useState(false);

  if (!generatedEnding || !state || !overflow) return null;

  const handleSave = () => {
    if (!profile) {
      setShowProfileModal(true);
      return;
    }
    
    saveArchive({
      archiveId: `arc-${Date.now()}`,
      profileId: profile.id,
      session: { seed, situationId: situationId!, calibration, state, overflow, years, unchosen, outcomeId: generatedEnding.endingId, version: '0.1.0' },
      createdAt: new Date().toISOString(),
    });
    alert('档案已保存至本地。');
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const dataUrl = await generateShareCard(generatedEnding);
      const link = document.createElement('a');
      link.download = `deduce-${generatedEnding.endingId}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error(e);
      alert('生成分享卡失败');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div style={{ paddingTop: 40, paddingBottom: 60, animation: 'fadeUp 1s var(--ease)' }}>
      
      {/* 档案头 */}
      <div style={{ marginBottom: 40, borderBottom: '1px solid var(--line)', paddingBottom: 24 }}>
        <p className="mono faint" style={{ marginBottom: 8 }}>平行人生档案 · 终局</p>
        <h1 className="serif" style={{ fontSize: 32, color: 'var(--accent)', marginBottom: 16 }}>{generatedEnding.title}</h1>
        <p className="serif" style={{ fontSize: 18, lineHeight: 1.8, color: 'var(--text)' }}>{generatedEnding.summary}</p>
      </div>

      {/* 五维权衡 */}
      <div style={{ marginBottom: 40 }}>
        <h3 className="mono faint" style={{ marginBottom: 16 }}>五维权衡</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {Object.entries(generatedEnding.fiveDimensions).map(([key, val]) => {
            const labels: Record<string, string> = { career: '事业', relationship: '关系', health: '健康', freedom: '自由', meaning: '意义' };
            return (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 14 }}>
                <span style={{ width: 40, color: 'var(--text-dim)' }}>{labels[key]}</span>
                <div style={{ flex: 1, height: 4, background: 'var(--line)', borderRadius: 2 }}>
                  <div style={{ width: `${val}%`, height: '100%', background: 'var(--accent)', borderRadius: 2, animation: 'fadeIn 1.5s var(--ease)' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 收获与代价 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
        <div className="card" style={{ background: 'var(--bg-soft)', border: 'none', padding: 20 }}>
          <h3 className="mono faint" style={{ marginBottom: 12 }}>得到了</h3>
          <ul style={{ paddingLeft: 16, fontSize: 14, color: 'var(--text)', lineHeight: 1.8 }}>
            {generatedEnding.gains.map((g, i) => <li key={i}>{g}</li>)}
          </ul>
        </div>
        <div className="card" style={{ background: 'var(--bg-soft)', border: 'none', padding: 20 }}>
          <h3 className="mono faint" style={{ marginBottom: 12 }}>付出了</h3>
          <ul style={{ paddingLeft: 16, fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.8 }}>
            {generatedEnding.costs.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      </div>

      {/* 卡点与后悔 */}
      <div style={{ marginBottom: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p style={{ fontSize: 15 }}><strong style={{ color: 'var(--danger)' }}>最可能卡住的点：</strong><span className="dim">{generatedEnding.stuckPoint}</span></p>
        <p style={{ fontSize: 15 }}><strong style={{ color: 'var(--text-dim)' }}>最后悔的选择：</strong><span className="dim">{generatedEnding.regret}</span></p>
      </div>

      {/* 忠告 (打字机效果) */}
      <div style={{ padding: 24, background: 'rgba(217, 164, 65, 0.08)', borderLeft: '3px solid var(--accent)', marginBottom: 40, minHeight: 100 }}>
        <Typewriter 
          text={`“${generatedEnding.advice}”`}
          speed={70}
          className="serif" 
          style={{ fontSize: 18, color: 'var(--accent)', fontWeight: 'bold', lineHeight: 1.8 }}
        />
      </div>

      {/* 没走的路 */}
      <div style={{ marginBottom: 40 }}>
        <h3 className="mono faint" style={{ marginBottom: 16 }}>你没走的路</h3>
        <div style={{ display: 'grid', gap: 12 }}>
          {generatedEnding.alternativePaths.map((p, i) => (
             <div key={i} className="card" style={{ background: 'transparent', borderStyle: 'dashed', padding: 16 }}>
               <p className="dim" style={{ fontSize: 14 }}>{p}</p>
             </div>
          ))}
        </div>
      </div>

      {/* 操作按钮 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button className="btn btn-primary" onClick={handleSave}>保存档案</button>
        <button className="btn" onClick={handleShare} disabled={isSharing}>
          {isSharing ? '生成中...' : '生成分享卡'}
        </button>
        <button className="btn btn-ghost" onClick={resetGame}>再推演一次</button>
      </div>

      {/* 创建昵称弹窗 */}
      {showProfileModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, animation: 'fadeIn 0.3s var(--ease)' }}>
          <div className="card" style={{ width: '100%', maxWidth: 340, background: 'var(--bg-card)', animation: 'fadeUp 0.4s var(--ease)' }}>
            <h3 className="serif" style={{ marginBottom: 16 }}>给这份档案起个名字</h3>
            <input 
              type="text" 
              placeholder="输入昵称（默认匿名旅人）" 
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-soft)', border: '1px solid var(--line)', borderRadius: 'var(--radius)', color: 'var(--text)', marginBottom: 20, outline: 'none' }}
            />
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn" onClick={() => setShowProfileModal(false)} style={{ flex: 1 }}>取消</button>
              <button className="btn btn-primary" onClick={() => {
                useProfileStore.getState().createProfile(nickname || '匿名旅人', '#D9A441');
                setShowProfileModal(false);
                handleSave();
              }} style={{ flex: 1 }}>确认</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}