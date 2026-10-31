import { useState } from 'react';
import { useSessionStore } from './store/sessionStore';
import OpeningScreen from './screens/OpeningScreen';
import SituationScreen from './screens/SituationScreen';
import CalibrationScreen from './screens/CalibrationScreen';
import DeductionScreen from './screens/DeductionScreen';
import EndingScreen from './screens/EndingScreen';
import ArchivesScreen from './screens/ArchivesScreen';

export default function App() {
  const step = useSessionStore((s) => s.step);
  const resetGame = useSessionStore((s) => s.resetGame);
  const [showArchives, setShowArchives] = useState(false);

  return (
    <div className="app-shell">
      <nav className="top-nav">
        {/* 如果在档案页，就不显示“重新开始”，因为档案页底部有了 */}
        {!showArchives && step !== 'opening' && step !== 'ending' && (
          <button className="btn btn-ghost" onClick={resetGame}>重新开始</button>
        )}
        {/* 如果不在档案页，显示切换按钮 */}
        {!showArchives && (
          <button className="btn btn-ghost" onClick={() => setShowArchives(true)}>
            我的档案
          </button>
        )}
      </nav>

      <div className="page">
        {showArchives ? (
          <ArchivesScreen onClose={() => setShowArchives(false)} />
        ) : (
          <div key={step} style={{ animation: 'fadeUp 0.6s var(--ease)' }}>
            {step === 'opening' && <OpeningScreen />}
            {step === 'situation' && <SituationScreen />}
            {step === 'calibration' && <CalibrationScreen />}
            {step === 'deduction' && <DeductionScreen />}
            {step === 'ending' && <EndingScreen />}
          </div>
        )}
      </div>
    </div>
  );
}