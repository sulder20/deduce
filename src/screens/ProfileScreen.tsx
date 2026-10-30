interface Props {
  onBack: () => void;
}

export default function ProfileScreen({ onBack }: Props) {
  return (
    <div style={{ paddingTop: 80, textAlign: 'center' }}>
      <p className="dim">身份卡（占位）</p>
      <button className="btn" onClick={onBack} style={{ marginTop: 24 }}>
        返回
      </button>
    </div>
  );
}