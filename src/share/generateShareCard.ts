import QRCode from 'qrcode';
import type { GeneratedEnding } from '@/content/types';

export async function generateShareCard(ending: GeneratedEnding): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1440;
  const ctx = canvas.getContext('2d')!;

  // 1. 背景
  ctx.fillStyle = '#121212';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. 纸张噪点纹理（简单模拟，绘制一些极淡的圆点）
  ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
  for (let i = 0; i < 3000; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3. 顶部文字
  ctx.fillStyle = '#9A9288';
  ctx.font = '24px "JetBrains Mono", monospace';
  ctx.fillText('我推演了一条平行人生', 80, 120);

  const today = new Date().toISOString().split('T')[0];
  ctx.fillText(`NO. SD-${Date.now().toString().slice(-6)}  /  ${today}`, 80, 170);

  // 4. 路径关键词
  ctx.fillStyle = '#D9A441';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText(ending.pathKeywords.join(' · '), 80, 260);

  // 5. 一句话摘要（自动换行）
  ctx.fillStyle = '#E8E2D8';
  ctx.font = '52px "Noto Serif SC", serif';
  wrapText(ctx, ending.summary, 80, 360, 920, 80);

  // 6. 得到了什么 / 付出了什么
  let startY = 680;
  ctx.fillStyle = '#D9A441';
  ctx.font = '32px sans-serif';
  ctx.fillText('得到了', 80, startY);
  ctx.fillText('付出了', 540, startY);

  ctx.fillStyle = '#9A9288';
  ctx.font = '28px sans-serif';
  ending.gains.forEach((g, i) => ctx.fillText(`· ${g}`, 80, startY + 60 + i * 50));
  ending.costs.forEach((c, i) => ctx.fillText(`· ${c}`, 540, startY + 60 + i * 50));

  // 7. 最可能卡在
  ctx.fillStyle = '#E8E2D8';
  ctx.font = 'italic 32px "Noto Serif SC", serif';
  wrapText(ctx, `“${ending.stuckPoint}”`, 80, 980, 920, 50);

  // 8. 一句忠告
  ctx.fillStyle = '#D9A441';
  ctx.font = '36px "Noto Serif SC", serif';
  wrapText(ctx, ending.advice, 80, 1120, 920, 60);

  // 9. 底部和二维码
  ctx.fillStyle = '#6B645C';
  ctx.font = '24px "JetBrains Mono", monospace';
  ctx.fillText('deduce.sulder.top', 80, 1350);

  const qrDataUrl = await QRCode.toDataURL('https://deduce.sulder.top', {
    margin: 1,
    width: 120,
    color: { dark: '#121212', light: '#D9A441' }
  });
  const qrImg = new Image();
  qrImg.src = qrDataUrl;
  await new Promise((resolve) => (qrImg.onload = resolve));
  ctx.drawImage(qrImg, 880, 1250, 120, 120);

  return canvas.toDataURL('image/png');
}

// Canvas 文字自动换行工具
function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split('');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n];
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n];
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
}