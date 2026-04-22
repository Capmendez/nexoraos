import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatRowProps {
  label: string;
  value: string;
  suffix?: string;
  editable?: boolean;
  onChange?: (val: number) => void;
}

function animateValue(element: HTMLElement, start: number, end: number, duration: number) {
  const startTime = performance.now();
  const diff = end - start;

  function update(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + diff * eased);
    element.textContent = String(current);
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function StatRow({ label, value, suffix = '', editable = false, onChange }: StatRowProps) {
  const valRef = useRef<HTMLSpanElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    setIsFocused(false);
    if (!valRef.current || !onChange) return;
    const newVal = parseInt(valRef.current.textContent || '0', 10);
    if (!isNaN(newVal)) {
      const oldVal = parseInt(value, 10);
      if (oldVal !== newVal) {
        animateValue(valRef.current, oldVal, newVal, 800);
        onChange(newVal);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      (e.target as HTMLElement).blur();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 0',
      }}
    >
      <span
        className="font-mono"
        style={{ fontSize: '0.625rem', color: '#666', textTransform: 'uppercase' }}
      >
        {label}:
      </span>
      <span
        ref={valRef}
        className="font-mono"
        contentEditable={editable}
        suppressContentEditableWarning
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        style={{
          fontSize: '1rem',
          color: '#F4F4F0',
          outline: 'none',
          borderBottom: isFocused ? '1px solid #00E5C7' : '1px solid rgba(0, 229, 199, 0.2)',
          minWidth: '2ch',
          textAlign: 'right',
          caretColor: '#00E5C7',
          cursor: editable ? 'text' : 'default',
          backgroundColor: isFocused ? 'rgba(0, 229, 199, 0.05)' : 'transparent',
          padding: '0 0.25rem',
        }}
      >
        {value}
        {suffix}
      </span>
    </div>
  );
}

export default function StatusWindow() {
  const sectionRef = useRef<HTMLElement>(null);
  const [time, setTime] = useState(new Date());
  const [xp, setXp] = useState(0);
  const [stats, setStats] = useState({
    focus: 0,
    discipline: 0,
    execution: 0,
    credibility: 0,
    consistency: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll('.reveal-item');
      gsap.from(items, {
        opacity: 0,
        y: 10,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const level = Math.floor(xp / 100) + 1;
  const xpProgress = Math.min((xp % 100), 100);

  const getRank = useCallback((lvl: number) => {
    if (lvl >= 31) return 'MYTHIC';
    if (lvl >= 16) return 'LORD';
    if (lvl >= 6) return 'NOBLE';
    return 'COMMONER';
  }, []);

  return (
    <section
      id="status-window"
      ref={sectionRef}
      style={{
        backgroundColor: '#0A0A0A',
        padding: 'clamp(4.5rem, 8vw, 8rem) clamp(1.25rem, 4vw, 3rem)',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          background: '#050505',
          border: '1px solid rgba(0, 229, 199, 0.15)',
        }}
      >
        {/* Panel header */}
        <div
          className="reveal-item"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.5rem 2rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: '#00E5C7' }}>
              MODULE: USER_STATUS
            </span>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: '#A1A1A1' }}>
              SYNC: ENABLED
            </span>
          </div>
          <span className="font-mono" style={{ fontSize: '0.75rem', color: '#A1A1A1' }}>
            {time.toLocaleTimeString('en-US', { hour12: false })}
          </span>
        </div>

        {/* Panel body */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem',
            padding: '2rem',
          }}
        >
          {/* Left column */}
          <div className="reveal-item">
            <p className="font-mono" style={{ fontSize: '0.875rem', color: '#F4F4F0' }}>
              USER: UNREGISTERED
            </p>
            <p className="font-mono" style={{ fontSize: '0.875rem', color: '#A1A1A1', marginTop: '0.5rem' }}>
              RANK: {getRank(level)}
            </p>
            <p
              className="font-display"
              style={{
                fontSize: 'clamp(3rem, 6vw, 4rem)',
                fontWeight: 500,
                color: '#00E5C7',
                marginTop: '1rem',
                lineHeight: 1,
              }}
            >
              LEVEL: {String(level).padStart(2, '0')}
            </p>
            <div style={{ marginTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="font-mono" style={{ fontSize: '0.75rem', color: '#A1A1A1' }}>
                  XP: {xp} / 100
                </span>
              </div>
              <div
                style={{
                  height: '4px',
                  backgroundColor: '#1a1a1a',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${xpProgress}%`,
                    backgroundColor: '#00E5C7',
                    transition: 'width 0.5s ease',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right column - stat grid */}
          <div
            className="reveal-item"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.5rem 1.5rem',
            }}
          >
            <StatRow
              label="FOCUS"
              value={String(stats.focus)}
              editable
              onChange={(v) => setStats((s) => ({ ...s, focus: v }))}
            />
            <StatRow
              label="DISCIPLINE"
              value={String(stats.discipline)}
              editable
              onChange={(v) => setStats((s) => ({ ...s, discipline: v }))}
            />
            <StatRow
              label="EXECUTION"
              value={String(stats.execution)}
              editable
              onChange={(v) => setStats((s) => ({ ...s, execution: v }))}
            />
            <StatRow
              label="CREDIBILITY"
              value={String(stats.credibility)}
              suffix="%"
              editable
              onChange={(v) => setStats((s) => ({ ...s, credibility: v }))}
            />
            <StatRow
              label="CONSISTENCY"
              value={String(stats.consistency)}
              suffix=" DAYS"
              editable
              onChange={(v) => setStats((s) => ({ ...s, consistency: v }))}
            />
            <StatRow
              label="XP"
              value={String(xp)}
              editable
              onChange={(v) => setXp(v)}
            />
          </div>
        </div>

        {/* Status footer */}
        <div
          className="reveal-item"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem 2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 229, 199, 0.5)',
            }}
            className="animate-pulse-dot"
          />
          <span className="font-mono" style={{ fontSize: '0.6875rem', color: '#A1A1A1' }}>
            STATUS: LOCKED
          </span>
        </div>
      </div>
    </section>
  );
}