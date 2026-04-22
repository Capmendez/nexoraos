import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BEFORE_ITEMS = [
  'Execution is inconsistent',
  'Effort is not tracked',
  'Progress is unclear',
];

const AFTER_ITEMS = [
  'Execution becomes structured',
  'Progress becomes visible',
  'Identity evolves through action',
];

export default function BeforeAfter() {
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
      id="before-after"
      ref={sectionRef}
      style={{
        backgroundColor: '#050505',
        padding: 'clamp(4.5rem, 8vw, 8rem) clamp(1.25rem, 4vw, 3rem)',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <p className="section-label reveal-item">MODULE: TRANSFORMATION_STATE</p>
        <h2 className="section-heading reveal-item" style={{ marginTop: '1rem' }}>
          The shift is structural.
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          maxWidth: '900px',
          margin: '3rem auto 0',
        }}
      >
        {/* Before card */}
        <div
          className="reveal-item"
          style={{
            background: '#0A0A0A',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            padding: '2rem',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          }}
        >
          <span
            className="font-mono"
            style={{ fontSize: '0.75rem', color: '#666', letterSpacing: '0.08em' }}
          >
            BEFORE
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
            {BEFORE_ITEMS.map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: '#666', fontSize: '0.875rem' }}>×</span>
                <span
                  className="font-body"
                  style={{ fontSize: '0.9375rem', color: 'rgba(244, 244, 240, 0.5)' }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* After card */}
        <div
          className="reveal-item"
          style={{
            background: '#0A0A0A',
            border: '1px solid rgba(0, 229, 199, 0.15)',
            padding: '2rem',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = 'translateY(-4px)';
            el.style.boxShadow = '0 0 30px rgba(0, 229, 199, 0.1)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = 'translateY(0)';
            el.style.boxShadow = 'none';
          }}
        >
          <span
            className="font-mono"
            style={{ fontSize: '0.75rem', color: '#00E5C7', letterSpacing: '0.08em' }}
          >
            AFTER
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
            {AFTER_ITEMS.map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: '#00E5C7', fontSize: '0.875rem' }}>✓</span>
                <span
                  className="font-body"
                  style={{ fontSize: '0.9375rem', color: '#F4F4F0' }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}