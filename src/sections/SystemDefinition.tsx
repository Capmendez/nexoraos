import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    num: '01',
    title: "You don't just plan your life. You execute it.",
    desc: 'Every plan is worthless without a verification loop.',
  },
  {
    num: '02',
    title: "You don't just set goals. You verify actions.",
    desc: 'Proof of execution is the only metric that matters.',
  },
  {
    num: '03',
    title: "You don't just improve. You evolve.",
    desc: 'Identity is earned through verified action, not intention.',
  },
];

export default function SystemDefinition() {
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
      id="system-definition"
      ref={sectionRef}
      style={{
        backgroundColor: '#0A0A0A',
        padding: 'clamp(4.5rem, 8vw, 8rem) clamp(1.25rem, 4vw, 3rem)',
      }}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
        <p className="section-label reveal-item">MODULE: SYSTEM_DEFINITION</p>
        <h2 className="section-heading reveal-item" style={{ marginTop: '1rem' }}>
          Nexora is a structured system that turns real-life actions into measurable progression.
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1100px',
          margin: '4rem auto 0',
        }}
      >
        {CARDS.map((card) => (
          <div
            key={card.num}
            className="reveal-item"
            style={{
              background: '#050505',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              padding: '2rem',
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
              className="font-display"
              style={{
                fontSize: '3rem',
                fontWeight: 300,
                color: '#00E5C7',
                lineHeight: 1,
              }}
            >
              {card.num}
            </span>
            <p
              className="font-body"
              style={{
                fontWeight: 500,
                fontSize: '1rem',
                color: '#F4F4F0',
                marginTop: '1rem',
                lineHeight: 1.4,
              }}
            >
              {card.title}
            </p>
            <p
              className="font-body"
              style={{
                fontSize: '0.9375rem',
                color: 'rgba(244, 244, 240, 0.5)',
                marginTop: '0.75rem',
                lineHeight: 1.6,
              }}
            >
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}