import { useEffect, useRef } from 'react';

const SIM = {
  width: 30,
  height: 20,
  gridSpacing: 28,
  mouseForce: 800,
  springStiffness: 0.08,
  lineTension: 0.4,
};

function index(x: number, y: number, width: number): number {
  return (y * (width + 1) + x) * 8;
}

export default function HeroLattice() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = SIM.width;
    const height = SIM.height;
    const gridSpacing = SIM.gridSpacing;
    const totalVerts = (width + 1) * (height + 1);
    const vertices = new Float32Array(totalVerts * 8);

    // Initialize vertices
    for (let y = 0; y <= height; y++) {
      for (let x = 0; x <= width; x++) {
        const i = index(x, y, width);
        vertices[i] = vertices[i + 3] = (x - width / 2) * gridSpacing;
        vertices[i + 1] = vertices[i + 4] = (y - height / 2) * gridSpacing;
        vertices[i + 2] = vertices[i + 5] = 0;
        vertices[i + 6] = vertices[i + 7] = 0;
      }
    }

    // Precompute lines
    const lines: number[][] = [];
    for (let y = 0; y <= height; y++) {
      for (let x = 0; x < width; x++) {
        lines.push([x, y, x + 1, y]);
      }
    }
    for (let y = 0; y < height; y++) {
      for (let x = 0; x <= width; x++) {
        lines.push([x, y, x, y + 1]);
      }
    }

    const v = vertices;

    function getMouseForce(mx: number, my: number, screenX: number, screenY: number): number {
      const dx = screenX - mx;
      const dy = screenY - my;
      const distSq = dx * dx + dy * dy;
      if (distSq < 1) return 0;
      return 8000 / distSq;
    }

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      mouseRef.current.x = e.touches[0].clientX;
      mouseRef.current.y = e.touches[0].clientY;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    function update(time: number) {
      if (!canvas) return;

      const timeX = time * 0.0013;
      const timeY = time * 0.001;
      const waveAmp = 16;
      const waveFreq = 0.08;
      const perspective = 800;
      const centerX = canvas.width / 2;

      const mouse = mouseRef.current;

      // Mobile auto-oscillation when no recent mouse
      const isTouchDevice = window.matchMedia('(hover: none)').matches;
      let mx = mouse.x;
      let my = mouse.y;
      if (isTouchDevice) {
        mx = canvas.width * 0.5 + Math.sin(time * 0.0006) * 100;
        my = canvas.height * 0.5 + Math.cos(time * 0.0007) * 80;
      }

      // Update each vertex
      for (let y = 0; y <= height; y++) {
        for (let x = 0; x <= width; x++) {
          const i = index(x, y, width);
          const baseZ = Math.sin(x * waveFreq + timeX) * Math.cos(y * waveFreq + timeY) * waveAmp;
          const baseX = v[i];
          const baseY = v[i + 1];

          const screenX = centerX + baseX * (perspective / (perspective - baseZ));
          const screenY = canvas.height * 0.4 + baseY * (perspective / (perspective - baseZ));

          const force = getMouseForce(mx, my, screenX, screenY);
          const displaceX = screenX - mx;
          const displaceY = screenY - my;
          const len = Math.sqrt(displaceX * displaceX + displaceY * displaceY) || 1;
          const ndx = (displaceX / len) * force * 0.5;
          const ndy = (displaceY / len) * force * 0.5;

          const targetX = baseX + ndx * 0.1;
          const targetY = baseY + ndy * 0.1;

          const ax = (targetX - v[i + 3]) * 0.08 - v[i + 6] * 0.4;
          const ay = (targetY - v[i + 4]) * 0.08 - v[i + 7] * 0.4;

          v[i + 6] += ax;
          v[i + 7] += ay;
          v[i + 3] += v[i + 6];
          v[i + 4] += v[i + 7];
          v[i + 5] = baseZ + Math.sqrt(v[i + 6] * v[i + 6] + v[i + 7] * v[i + 7]) * 0.5;
        }
      }

      // Spring relaxation
      for (let l = 0; l < lines.length; l++) {
        const [x1, y1, x2, y2] = lines[l];
        const ia = index(x1, y1, width);
        const ib = index(x2, y2, width);
        const dx = v[ib + 3] - v[ia + 3];
        const dy = v[ib + 4] - v[ia + 4];
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist === 0) continue;
        const diff = (dist - gridSpacing) * 0.08 / dist;
        v[ia + 3] += dx * diff * 0.5;
        v[ia + 4] += dy * diff * 0.5;
        v[ib + 3] -= dx * diff * 0.5;
        v[ib + 4] -= dy * diff * 0.5;
      }
    }

    function render() {
      if (!canvas || !ctx) return;

      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const perspective = 800;
      const centerX = canvas.width / 2;

      // Compute screen positions and avgZ for each line
      const lineData: { x1: number; y1: number; x2: number; y2: number; avgZ: number }[] = [];

      for (let l = 0; l < lines.length; l++) {
        const [x1, y1, x2, y2] = lines[l];
        const ia = index(x1, y1, width);
        const ib = index(x2, y2, width);

        const az = v[ia + 5];
        const bz = v[ib + 5];

        const ax = v[ia + 3];
        const ay = v[ia + 4];
        const bx = v[ib + 3];
        const by = v[ib + 4];

        const screenX1 = centerX + ax * (perspective / (perspective - az));
        const screenY1 = canvas.height * 0.4 + ay * (perspective / (perspective - az));
        const screenX2 = centerX + bx * (perspective / (perspective - bz));
        const screenY2 = canvas.height * 0.4 + by * (perspective / (perspective - bz));

        lineData.push({
          x1: screenX1,
          y1: screenY1,
          x2: screenX2,
          y2: screenY2,
          avgZ: (az + bz) / 2,
        });
      }

      // Sort by avgZ descending (Painter's algorithm)
      lineData.sort((a, b) => b.avgZ - a.avgZ);

      // Draw lines
      for (let i = 0; i < lineData.length; i++) {
        const ld = lineData[i];
        const t = Math.max(0, Math.min(1, (ld.avgZ + 10) / 40));
        const alpha = 0.1 + t * 0.7;

        const grad = ctx.createLinearGradient(ld.x1, ld.y1, ld.x2, ld.y2);
        grad.addColorStop(0, `rgba(0, 229, 199, ${alpha})`);
        grad.addColorStop(1, `rgba(0, 255, 136, ${alpha * 0.3})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1 + t * 1.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(ld.x1, ld.y1);
        ctx.lineTo(ld.x2, ld.y2);
        ctx.stroke();
      }
    }

    function loop(time: number) {
      update(time);
      render();
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}