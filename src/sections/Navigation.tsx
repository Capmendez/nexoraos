import { useEffect, useState } from 'react';

export default function Navigation() {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const vh = window.innerHeight;

      setScrolled(currentY > 50);

      if (currentY > vh * 0.5) {
        setVisible(currentY < lastScrollY || currentY < vh);
      } else {
        setVisible(false);
      }

      lastScrollY = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToCTA = () => {
    const el = document.getElementById('final-cta');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(1.25rem, 4vw, 3rem)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        backdropFilter: 'blur(12px)',
        backgroundColor: scrolled ? 'rgba(5, 5, 5, 0.85)' : 'rgba(5, 5, 5, 0)',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease, background-color 0.3s ease',
      }}
    >
      <button
        onClick={scrollToTop}
        style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontWeight: 500,
          fontSize: '1.25rem',
          color: '#F4F4F0',
          background: 'none',
          border: 'none',
          cursor: 'none',
          letterSpacing: '-0.02em',
        }}
      >
        NEXORA
      </button>

      <button
        onClick={scrollToCTA}
        className="font-body"
        style={{
          border: '1px solid rgba(0, 229, 199, 0.4)',
          color: '#00E5C7',
          padding: '0.5rem 1.25rem',
          fontSize: '0.8125rem',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          backgroundColor: 'transparent',
          transition: 'all 0.2s ease',
          cursor: 'none',
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.backgroundColor = 'rgba(0, 229, 199, 0.1)';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.backgroundColor = 'transparent';
        }}
      >
        ENTER SYSTEM
      </button>
    </nav>
  );
}