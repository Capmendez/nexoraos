import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  { role: 'System Architect', desc: 'Designing the core execution engine and verification protocols.' },
  { role: 'Product Designer', desc: 'Crafting the interface between human intent and system output.' },
  { role: 'Systems Engineer', desc: 'Building the infrastructure that makes progression measurable.' },
  { role: 'Community Lead', desc: 'Growing the network of operators executing at the highest level.' },
];

export default function SystemBuilders() {
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
      id="system-builders"
      ref={sectionRef}
      style={{
        backgroundColor: '#0A0A0A',
        padding: 'clamp(4.5rem, 8vw, 8rem) clamp(1.25rem, 4vw, 3rem)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p className="section-label reveal-item">MODULE: SYSTEM_BUILDERS</p>
        <h2 className="section-heading reveal-item" style={{ marginTop: '1rem' }}>
          Built by operators.
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem',
          }}
        >
          {TEAM.map((member) => (
            <div
              key={member.role}
              className="reveal-item"
              style={{
                background: '#050505',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                padding: '2rem',
                transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(0, 229, 199, 0.2)';
                el.style.boxShadow = '0 0 20px rgba(0, 229, 199, 0.05)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                el.style.boxShadow = 'none';
              }}
            >
              <p
                className="font-display"
                style={{ fontWeight: 500, fontSize: '1.25rem', color: '#F4F4F0' }}
              >
                {member.role}
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
                {member.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}