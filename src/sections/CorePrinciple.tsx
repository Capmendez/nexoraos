import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CorePrinciple() {
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
      id="core-principle"
      ref={sectionRef}
      style={{
        backgroundColor: '#0A0A0A',
        padding: 'clamp(4.5rem, 8vw, 8rem) clamp(1.25rem, 4vw, 3rem)',
      }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
        <p className="section-label reveal-item">MODULE: CORE_RULESET</p>
        <p
          className="reveal-item font-display"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            fontWeight: 400,
            color: '#F4F4F0',
            lineHeight: 1.2,
            marginTop: '1.5rem',
          }}
        >
          Nexora is not motivation-based. It is{' '}
          <span style={{ color: '#00E5C7' }}>execution-based</span>. If you execute → you progress. If
          you don't → nothing changes. The system only responds to{' '}
          <span style={{ color: '#00E5C7' }}>action, not intention</span>.
        </p>
      </div>
    </section>
  );
}