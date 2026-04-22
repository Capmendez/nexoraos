import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
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
      id="final-cta"
      ref={sectionRef}
      style={{
        backgroundColor: '#050505',
        padding: 'clamp(6rem, 10vw, 10rem) clamp(1.25rem, 4vw, 3rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Portal ring background */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          pointerEvents: 'none',
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle, rgba(0,229,199,0.05) 0%, transparent 70%)',
          }}
          className="animate-breathe"
        />
        {/* Outer ring */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            border: '1px solid rgba(0, 229, 199, 0.08)',
            borderRadius: '50%',
          }}
          className="animate-rotate-slow"
        />
        {/* Inner ring */}
        <div
          style={{
            position: 'absolute',
            inset: '15%',
            border: '1px solid rgba(0, 229, 199, 0.05)',
            borderRadius: '50%',
          }}
          className="animate-breathe"
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <p className="section-label reveal-item">MODULE: ACCESS_GATE</p>
        <h2
          className="reveal-item font-display"
          style={{
            fontWeight: 500,
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            color: '#F4F4F0',
            marginTop: '1.5rem',
            lineHeight: 1.1,
          }}
        >
          Enter Nexora
        </h2>
        <p
          className="reveal-item font-body"
          style={{
            fontSize: '1.125rem',
            color: 'rgba(244, 244, 240, 0.6)',
            marginTop: '1rem',
          }}
        >
          Start structuring your real life.
        </p>
        <button
          className="reveal-item font-body"
          style={{
            backgroundColor: '#00E5C7',
            color: '#050505',
            padding: '1rem 3rem',
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            border: 'none',
            marginTop: '2.5rem',
            transition: 'all 0.2s ease',
            cursor: 'none',
          }}
          onMouseEnter={(e) => {
            const el = e.target as HTMLElement;
            el.style.backgroundColor = '#00F5D7';
            el.style.boxShadow = '0 0 30px rgba(0, 229, 199, 0.4)';
          }}
          onMouseLeave={(e) => {
            const el = e.target as HTMLElement;
            el.style.backgroundColor = '#00E5C7';
            el.style.boxShadow = 'none';
          }}
        >
          ENTER SYSTEM
        </button>
      </div>
    </section>
  );
}