import { useEffect, useRef, useState, useCallback } from 'react';

const LETTERS: Record<string, number[]> = {
  N: [1,0,0,0,1, 1,1,0,0,1, 1,0,1,0,1, 1,0,0,1,1, 1,0,0,0,1, 1,0,0,0,1, 1,0,0,0,1],
  E: [1,1,1,1,1, 1,0,0,0,0, 1,1,1,1,0, 1,0,0,0,0, 1,0,0,0,0, 1,0,0,0,0, 1,1,1,1,1],
  X: [1,0,0,0,1, 0,1,0,1,0, 0,0,1,0,0, 0,0,1,0,0, 0,0,1,0,0, 0,1,0,1,0, 1,0,0,0,1],
  O: [0,1,1,1,0, 1,0,0,0,1, 1,0,0,0,1, 1,0,0,0,1, 1,0,0,0,1, 1,0,0,0,1, 0,1,1,1,0],
  R: [1,1,1,1,0, 1,0,0,0,1, 1,0,0,0,1, 1,1,1,1,0, 1,0,1,0,0, 1,0,0,1,0, 1,0,0,0,1],
  A: [0,1,1,1,0, 1,0,0,0,1, 1,0,0,0,1, 1,1,1,1,1, 1,0,0,0,1, 1,0,0,0,1, 1,0,0,0,1],
};

const WORD = 'NEXORA';
const COLS = 5;
const ROWS = 7;
const GAP = 2;
const DOT_SIZE = 6;
const MARGIN = 3;

interface Dot {
  id: number;
  isActive: boolean;
  targetX: number;
  targetY: number;
}

export default function PhaseMatrix({
  className = '',
  alwaysAligned = false,
}: {
  className?: string;
  alwaysAligned?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dots, setDots] = useState<Dot[]>([]);
  const [isAligned, setIsAligned] = useState(alwaysAligned);
  const dotsRef = useRef<Dot[]>([]);

  const generateDots = useCallback(() => {
    const allDots: Dot[] = [];
    let dotId = 0;

    for (let li = 0; li < WORD.length; li++) {
      const letter = WORD[li];
      const bitmap = LETTERS[letter];

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const idx = r * COLS + c;
          const isActive = bitmap[idx] === 1;

          if (isActive || !isActive) {
            allDots.push({
              id: dotId++,
              isActive,
              targetX: 0,
              targetY: 0,
            });
          }
        }
      }

      // Add spacing columns between letters
      if (li < WORD.length - 1) {
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < GAP; c++) {
            allDots.push({
              id: dotId++,
              isActive: false,
              targetX: 0,
              targetY: 0,
            });
          }
        }
      }
    }

    return allDots;
  }, []);

  useEffect(() => {
    const allDots = generateDots();
    dotsRef.current = allDots;
    setDots(allDots);
  }, [generateDots]);

  useEffect(() => {
    if (alwaysAligned) return;

    const container = containerRef.current;
    if (!container) return;

    const onEnter = () => setIsAligned(true);
    const onLeave = () => setIsAligned(false);

    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);

    return () => {
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, [alwaysAligned]);

  const getDotStyle = (dot: Dot): React.CSSProperties => {
    if (!dot.isActive) {
      return { opacity: 0 };
    }

    if (isAligned || alwaysAligned) {
      return {
        opacity: 1,
        transform: 'translate3d(0, 0, 0)',
        transition: 'transform 1.5s ease-out, opacity 1.5s ease-out',
      };
    }

    const rx = Math.random() * 600 - 300;
    const ry = Math.random() * 600 - 300;
    return {
      opacity: 0.3,
      transform: `translate3d(${rx}px, ${ry}px, 0)`,
      transition: 'transform 1.5s ease-out, opacity 1.5s ease-out',
    };
  };

  const totalColsPerLetter = COLS + GAP;
  const totalWidth =
    WORD.length * COLS * (DOT_SIZE + MARGIN) +
    (WORD.length - 1) * GAP * (DOT_SIZE + MARGIN);
  const totalHeight = ROWS * (DOT_SIZE + MARGIN);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: 'inline-block',
        width: `${totalWidth}px`,
        height: `${totalHeight}px`,
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${WORD.length * totalColsPerLetter - GAP}, ${DOT_SIZE + MARGIN}px)`,
          gridTemplateRows: `repeat(${ROWS}, ${DOT_SIZE + MARGIN}px)`,
          gap: 0,
          fontSize: 0,
        }}
      >
        {dots.map((dot) => (
          <span
            key={dot.id}
            style={{
              display: 'inline-block',
              width: `${DOT_SIZE}px`,
              height: `${DOT_SIZE}px`,
              borderRadius: '50%',
              backgroundColor: '#F4F4F0',
              margin: `${MARGIN / 2}px`,
              willChange: 'transform',
              ...getDotStyle(dot),
            }}
          />
        ))}
      </div>
    </div>
  );
}