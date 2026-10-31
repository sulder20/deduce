import { useProfileStore } from '@/store/profileStore';
import { useSessionStore } from '@/store/sessionStore';
import { endingsById } from '@/content/endings';

export default function ArchivesScreen({ onClose }: { onClose: () => void }) {
  const { archives, profile, deleteArchive } = useProfileStore();
  const resetGame = useSessionStore((s) => s.resetGame); 

  const handleRestart = () => {
    resetGame(); // 清空游戏状态
    onClose();   // 关闭档案页
  };

  return (
    <div style={{ paddingTop: 40, paddingBottom: 60, position: 'relative' }}>
      
      {/* 新增左上角返回按钮 */}
      <button 
        className="btn btn-ghost" 
        onClick={onClose} 
        style={{ position: 'absolute', top: 0, left: 0, paddingLeft: 0 }}
      >
        ← 返回
      </button>

      <h1 className="serif" style={{ fontSize: 28, marginBottom: 8, marginTop: 24 }}>我的档案</h1>
      <p className="mono faint" style={{ marginBottom: 32 }}>
        {profile ? `当前身份：${profile.nickname}` : '本地匿名身份'}
      </p>

      {archives.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-dim)' }}>
          <p>还没有保存的档案。</p>
          <button className="btn btn-ghost" onClick={handleRestart} style={{ marginTop: 16 }}>
            去推演一条平行人生
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {archives.map((arc) => {
            const ending = endingsById[arc.session.outcomeId || ''];
            return (
              <div key={arc.archiveId} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span className="mono faint">{new Date(arc.createdAt).toLocaleDateString()}</span>
                  <button className="btn btn-ghost" style={{ padding: 0, color: 'var(--danger)' }} onClick={() => deleteArchive(arc.archiveId)}>删除</button>
                </div>
                <h3 className="serif" style={{ fontSize: 20, color: 'var(--accent)', marginBottom: 8 }}>
                  {ending?.title || '未知结局'}
                </h3>
                <p className="dim" style={{ fontSize: 14 }}>{ending?.summary}</p>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ marginTop: 40 }}>
        <button className="btn btn-primary" onClick={handleRestart} style={{ width: '100%' }}>
          重新开始推演
        </button>
      </div>
    </div>
  );
}