import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = ['X', 'DISCORD', 'TELEGRAM', 'GITHUB'];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.reveal-item'), {
        opacity: 0,
        y: 10,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{
        backgroundColor: '#0A0A0A',
        padding: '4rem clamp(1.25rem, 4vw, 3rem)',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top row */}
        <div
          className="reveal-item"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <span
            className="font-display"
            style={{ fontWeight: 500, fontSize: '1.25rem', color: '#F4F4F0' }}
          >
            NEXORA
          </span>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {SOCIALS.map((social) => (
              <a
                key={social}
                href="#"
                className="font-mono"
                style={{
                  fontSize: '0.75rem',
                  color: '#A1A1A1',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  cursor: 'none',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = '#F4F4F0';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = '#A1A1A1';
                }}
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="reveal-item"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '2rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <span
            className="font-body"
            style={{ fontSize: '0.8125rem', color: 'rgba(244, 244, 240, 0.4)' }}
          >
            A Life Operating System for structured execution.
          </span>
          <span className="font-mono" style={{ fontSize: '0.6875rem', color: '#666' }}>
            © 2025 NEXORA
          </span>
        </div>
      </div>
    </footer>
  );
}