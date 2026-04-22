import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RANKS = [
  {
    name: 'Commoner',
    subtitle: 'Starting state',
    unlock: 'UNLOCK: REGISTER',
  },
  {
    name: 'Noble',
    subtitle: 'Proven executor',
    unlock: 'UNLOCK: 500 XP + 7 DAY STREAK',
  },
  {
    name: 'Lord',
    subtitle: 'Elite operator',
    unlock: 'UNLOCK: 5000 XP + 30 DAY STREAK',
  },
  {
    name: 'Mythic',
    subtitle: 'System master',
    unlock: 'UNLOCK: 50000 XP + 365 DAY STREAK',
  },
];

function ConstellationBg() {
  const dots = Array.from({ length: 12 }, (_, i) => ({
    x: 20 + Math.random() * 60,
    y: 20 + Math.random() * 60,
    id: i,
  }));

  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity: 0.05,
        pointerEvents: 'none',
      }}
    >
      {dots.map((dot, i) =>
        dots.slice(i + 1).map((other, j) => {
          const dist = Math.sqrt(
            Math.pow(dot.x - other.x, 2) + Math.pow(dot.y - other.y, 2)
          );
          if (dist < 40) {
            return (
              <line
                key={`${i}-${j}`}
                x1={`${dot.x}%`}
                y1={`${dot.y}%`}
                x2={`${other.x}%`}
                y2={`${other.y}%`}
                stroke="#00E5C7"
                strokeWidth="0.5"
              />
            );
          }
          return null;
        })
      )}
      {dots.map((dot) => (
        <circle
          key={dot.id}
          cx={`${dot.x}%`}
          cy={`${dot.y}%`}
          r="1.5"
          fill="#00E5C7"
        />
      ))}
    </svg>
  );
}

export default function IdentitySystem() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll('.reveal-item');
      gsap.from(items, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
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

  return (
    <section
      id="identity-system"
      ref={sectionRef}
      style={{
        backgroundColor: '#050505',
        padding: 'clamp(4.5rem, 8vw, 8rem) clamp(1.25rem, 4vw, 3rem)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p className="section-label reveal-item">MODULE: IDENTITY_LAYER</p>
        <h2 className="section-heading reveal-item" style={{ marginTop: '1rem', maxWidth: '700px' }}>
          Your identity is not chosen. It is earned through execution.
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem',
          }}
        >
          {RANKS.map((rank) => (
            <div
              key={rank.name}
              className="reveal-item card-base"
              style={{
                position: 'relative',
                overflow: 'hidden',
                padding: '2rem',
              }}
            >
              <ConstellationBg />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p
                  className="font-display"
                  style={{
                    fontWeight: 500,
                    fontSize: '1.5rem',
                    color: '#F4F4F0',
                  }}
                >
                  {rank.name}
                </p>
                <p
                  className="font-body"
                  style={{
                    fontSize: '0.875rem',
                    color: 'rgba(244, 244, 240, 0.5)',
                    marginTop: '0.5rem',
                  }}
                >
                  {rank.subtitle}
                </p>
                <p
                  className="font-mono"
                  style={{
                    fontSize: '0.625rem',
                    color: '#00E5C7',
                    marginTop: '1.5rem',
                    letterSpacing: '0.04em',
                  }}
                >
                  {rank.unlock}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}