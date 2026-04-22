import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  { num: 1, title: 'Core System', desc: 'Task execution, proof verification, XP system', status: 'COMPLETED' },
  { num: 2, title: 'Identity System', desc: 'Rank progression structure', status: 'COMPLETED' },
  { num: 3, title: 'Execution Expansion', desc: 'Advanced discipline systems', status: 'QUEUED' },
  { num: 4, title: 'NXR Economy', desc: 'System fuel integration', status: 'QUEUED' },
  { num: 5, title: 'Beta Release', desc: 'Early user testing', status: 'QUEUED' },
  { num: 6, title: 'Ecosystem Expansion', desc: 'Advanced modules and scaling', status: 'QUEUED' },
];

export default function Roadmap() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll('.reveal-item');
      gsap.from(items, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
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
      id="roadmap"
      ref={sectionRef}
      style={{
        backgroundColor: '#050505',
        padding: 'clamp(4.5rem, 8vw, 8rem) clamp(1.25rem, 4vw, 3rem)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal-item" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <p className="section-label">MODULE: SYSTEM_EVOLUTION</p>
          <span className="font-mono" style={{ fontSize: '0.6875rem', color: '#A1A1A1', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            STATE: PROGRESSING
          </span>
        </div>
        <h2 className="section-heading reveal-item" style={{ marginTop: '1rem' }}>
          Six phases. One direction.
        </h2>

        {/* Timeline */}
        <div
          style={{
            position: 'relative',
            marginTop: '3rem',
            paddingLeft: '2rem',
          }}
        >
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: '0',
              top: '0',
              bottom: '0',
              width: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
          />

          {PHASES.map((phase) => (
            <div
              key={phase.num}
              className="reveal-item"
              style={{
                position: 'relative',
                marginBottom: '1.5rem',
              }}
            >
              {/* Timeline dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '-2rem',
                  top: '1.5rem',
                  transform: 'translateX(-50%)',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: phase.status === 'COMPLETED' ? '#00E5C7' : 'transparent',
                  border: phase.status === 'COMPLETED' ? 'none' : '1px solid rgba(0, 229, 199, 0.3)',
                }}
              />

              {/* Phase card */}
              <div
                style={{
                  background: '#0A0A0A',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  padding: '1.5rem',
                  marginLeft: '0.5rem',
                  transition: 'border-color 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 229, 199, 0.2)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.06)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <span className="font-mono" style={{ fontSize: '0.75rem', color: '#00E5C7' }}>
                    Phase {phase.num}
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '0.625rem',
                      color: phase.status === 'COMPLETED' ? '#00E5C7' : '#666',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {phase.status}
                  </span>
                </div>
                <p
                  className="font-display"
                  style={{ fontWeight: 500, fontSize: '1.125rem', color: '#F4F4F0', marginTop: '0.5rem' }}
                >
                  {phase.title}
                </p>
                <p
                  className="font-body"
                  style={{ fontSize: '0.875rem', color: 'rgba(244, 244, 240, 0.5)', marginTop: '0.25rem' }}
                >
                  {phase.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}