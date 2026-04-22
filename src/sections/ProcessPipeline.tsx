import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { num: '01', title: 'EXECUTE', desc: 'Complete a real-world task' },
  { num: '02', title: 'SUBMIT', desc: 'Upload proof of execution' },
  { num: '03', title: 'VERIFY', desc: 'System validates action' },
  { num: '04', title: 'REWARD', desc: 'Earn XP' },
  { num: '05', title: 'EVOLVE', desc: 'Progress identity' },
];

export default function ProcessPipeline() {
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
      id="process-pipeline"
      ref={sectionRef}
      style={{
        backgroundColor: '#050505',
        padding: 'clamp(4.5rem, 8vw, 8rem) clamp(1.25rem, 4vw, 3rem)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p className="section-label reveal-item">MODULE: PROCESS_PIPELINE</p>
        <h2 className="section-heading reveal-item" style={{ marginTop: '1rem' }}>
          Five Steps. One Pipeline.
        </h2>

        <div
          className="reveal-item"
          style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '3rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            scrollbarWidth: 'none',
          }}
        >
          {STEPS.map((step, idx) => (
            <div key={step.num} style={{ display: 'flex', alignItems: 'stretch' }}>
              <div
                style={{
                  background: '#0A0A0A',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  padding: '1.5rem',
                  minWidth: '180px',
                  maxWidth: '220px',
                  flex: '1',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  transition: 'border-color 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 229, 199, 0.3)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.06)';
                }}
              >
                <span
                  className="font-mono"
                  style={{ fontSize: '0.75rem', color: '#00E5C7' }}
                >
                  [{step.num}]
                </span>
                <p
                  className="font-display"
                  style={{
                    fontWeight: 500,
                    fontSize: '1.125rem',
                    color: '#F4F4F0',
                    marginTop: '0.75rem',
                  }}
                >
                  {step.title}
                </p>
                <p
                  className="font-body"
                  style={{
                    fontSize: '0.875rem',
                    color: 'rgba(244, 244, 240, 0.5)',
                    marginTop: '0.5rem',
                  }}
                >
                  {step.desc}
                </p>
              </div>

              {idx < STEPS.length - 1 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '1px',
                      backgroundColor: '#333',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: '-3px',
                        width: 0,
                        height: 0,
                        borderTop: '3.5px solid transparent',
                        borderBottom: '3.5px solid transparent',
                        borderLeft: '5px solid #333',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <p
          className="font-mono reveal-item"
          style={{
            fontSize: '0.6875rem',
            color: 'rgba(244, 244, 240, 0.4)',
            marginTop: '2rem',
          }}
        >
          SYSTEM NOTE: If it is not executed, it does not exist in the system.
        </p>
      </div>
    </section>
  );
}