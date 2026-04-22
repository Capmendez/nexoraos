import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function NXRFuel() {
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
      id="nxr-fuel"
      ref={sectionRef}
      style={{
        backgroundColor: '#0A0A0A',
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
          alignItems: 'center',
        }}
      >
        {/* Left column */}
        <div>
          <p className="section-label reveal-item">MODULE: NXR_ENGINE</p>
          <h2 className="section-heading reveal-item" style={{ marginTop: '1rem' }}>
            NXR is Nexora's internal fuel system.
          </h2>
          <p
            className="body-text reveal-item"
            style={{ marginTop: '1.5rem', fontSize: '1rem' }}
          >
            It is used for unlocking advanced system features, retrying failed execution attempts, accessing higher progression layers, and reinforcing commitment to actions.
          </p>

          {/* Core rule statement */}
          <div
            className="reveal-item"
            style={{
              borderLeft: '2px solid #00E5C7',
              paddingLeft: '1rem',
              marginTop: '2rem',
            }}
          >
            <p
              className="font-display"
              style={{
                fontWeight: 500,
                fontSize: '1.25rem',
                color: '#F4F4F0',
                lineHeight: 1.3,
              }}
            >
              No commitment → no progression.
            </p>
            <p
              className="font-body"
              style={{
                fontSize: '0.9375rem',
                color: 'rgba(244, 244, 240, 0.5)',
                marginTop: '0.75rem',
              }}
            >
              NXR is not cosmetic currency — it represents commitment cost.
            </p>
          </div>
        </div>

        {/* Right column - NXR visual */}
        <div
          className="reveal-item"
          style={{
            background: '#050505',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            padding: '3rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '250px',
          }}
        >
          <span
            className="font-display"
            style={{
              fontWeight: 300,
              fontSize: 'clamp(4rem, 8vw, 6rem)',
              color: '#F4F4F0',
              lineHeight: 1,
              borderBottom: '2px solid rgba(255, 215, 0, 0.4)',
              paddingBottom: '0.5rem',
            }}
            className-override="animate-gold-pulse"
          >
            <span className="animate-gold-pulse" style={{ display: 'inline-block', borderBottom: '2px solid rgba(255, 215, 0, 0.4)', paddingBottom: '0.5rem' }}>
              NXR
            </span>
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: '0.75rem',
              color: '#666',
              marginTop: '1.5rem',
              letterSpacing: '0.08em',
            }}
          >
            FUEL RESERVE: ∞
          </span>
        </div>
      </div>
    </section>
  );
}