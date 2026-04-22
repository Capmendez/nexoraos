import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Problem() {
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
      id="problem"
      ref={sectionRef}
      style={{
        backgroundColor: '#050505',
        padding: 'clamp(4.5rem, 8vw, 8rem) clamp(1.25rem, 4vw, 3rem)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
        }}
      >
        {/* Left column */}
        <div style={{ maxWidth: '560px' }}>
          <p className="section-label reveal-item" style={{ marginBottom: '1.5rem' }}>
            MODULE: EXECUTION_GAP
          </p>
          <h2 className="section-heading reveal-item" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
            People already know what to do. The problem is they don't have a system that verifies if they actually did it.
          </h2>
          <p
            className="body-text reveal-item"
            style={{ maxWidth: '440px', marginTop: '1.5rem', fontSize: '1rem' }}
          >
            Without structure, intentions replace execution. Discipline becomes inconsistent. Progress feels invisible. Nexora exists to make execution visible and measurable.
          </p>
        </div>

        {/* Right column - visual card */}
        <div
          className="reveal-item"
          style={{
            background: '#0A0A0A',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            padding: '2rem',
            maxWidth: '500px',
          }}
        >
          {/* Before state */}
          <div>
            <span
              className="font-mono"
              style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.08em' }}
            >
              BEFORE
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
              {['INTENTION', 'INTENTION', 'INTENTION'].map((label, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      height: '6px',
                      width: `${60 + i * 20}%`,
                      backgroundColor: '#333',
                      borderRadius: 0,
                    }}
                  />
                  <span className="font-mono" style={{ fontSize: '0.625rem', color: '#666' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              height: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              margin: '1.5rem 0',
            }}
          />

          {/* After state */}
          <div>
            <span
              className="font-mono"
              style={{ fontSize: '0.75rem', color: '#00E5C7', textTransform: 'uppercase', letterSpacing: '0.08em' }}
            >
              AFTER
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
              {['EXECUTION', 'EXECUTION', 'EXECUTION'].map((label, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      height: '6px',
                      width: `${60 + i * 20}%`,
                      backgroundColor: '#00E5C7',
                      boxShadow: '0 0 8px rgba(0, 229, 199, 0.3)',
                      animation: `executionFill 2s ease-out ${i * 0.3}s both`,
                    }}
                  />
                  <span className="font-mono" style={{ fontSize: '0.625rem', color: '#00E5C7' }}>
                    ✓ {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <style>{`
            @keyframes executionFill {
              from { width: 0%; }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}