import { useState, useEffect } from 'react';

interface Props {
  text: string;
  speed?: number; // 每字毫秒数
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

export default function Typewriter({ text, speed = 50, className = '', style = {}, onComplete }: Props) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className={className} style={style}>
      {displayedText}
      {displayedText.length < text.length && <span style={{ opacity: 0.5, animation: 'fadeIn 0.5s infinite alternate' }}>|</span>}
    </span>
  );
}