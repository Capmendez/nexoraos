import HeroLattice from './HeroLattice';

export default function Hero() {
  const scrollToExplore = () => {
    const el = document.getElementById('problem');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCTA = () => {
    const el = document.getElementById('final-cta');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#050505',
      }}
    >
      <HeroLattice />

      {/* Text readability vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 30% 50%, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0) 70%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Hero content */}
      <div
        style={{
          position: 'absolute',
          left: 'clamp(1.25rem, 8vw, 8vw)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
          maxWidth: '560px',
        }}
      >
        <p
          className="font-mono"
          style={{
            fontSize: '0.6875rem',
            color: '#A1A1A1',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '1.5rem',
          }}
        >
          LIFE OPERATING SYSTEM v1.0
        </p>

        <h1
          className="font-display"
          style={{
            fontWeight: 500,
            fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#F4F4F0',
          }}
        >
          Turn Real-World
          <br />
          Actions Into
          <br />
          Verifiable Progress
        </h1>

        <p
          className="font-body"
          style={{
            fontSize: '1.125rem',
            color: 'rgba(244, 244, 240, 0.6)',
            maxWidth: '420px',
            marginTop: '1.5rem',
            lineHeight: 1.65,
          }}
        >
          Nexora is a structured execution engine. Task → Proof → Verify → XP → Level → Identity → NXR.
        </p>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={scrollToCTA}
            className="font-body"
            style={{
              backgroundColor: '#00E5C7',
              color: '#050505',
              padding: '0.875rem 2rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              border: 'none',
              transition: 'all 0.2s ease',
              cursor: 'none',
            }}
            onMouseEnter={(e) => {
              const el = e.target as HTMLElement;
              el.style.backgroundColor = '#00F5D7';
              el.style.boxShadow = '0 0 20px rgba(0, 229, 199, 0.3)';
            }}
            onMouseLeave={(e) => {
              const el = e.target as HTMLElement;
              el.style.backgroundColor = '#00E5C7';
              el.style.boxShadow = 'none';
            }}
          >
            INITIALIZE SYSTEM
          </button>

          <button
            onClick={scrollToExplore}
            className="font-body"
            style={{
              border: '1px solid rgba(244, 244, 240, 0.2)',
              color: '#F4F4F0',
              padding: '0.875rem 2rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              backgroundColor: 'transparent',
              transition: 'all 0.2s ease',
              cursor: 'none',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = 'rgba(244, 244, 240, 0.5)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = 'rgba(244, 244, 240, 0.2)';
            }}
          >
            VIEW DEMO
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '2rem' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#00E5C7',
            }}
            className="animate-pulse-dot"
          />
          <span
            className="font-mono"
            style={{
              fontSize: '0.6875rem',
              color: '#A1A1A1',
            }}
          >
            SYSTEM STATUS: ACTIVE ● SYNCING
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: '1px',
            height: '40px',
            backgroundColor: '#A1A1A1',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              backgroundColor: '#A1A1A1',
              position: 'absolute',
              left: '-1px',
            }}
            className="animate-scroll-line"
          />
        </div>
        <span
          className="font-mono"
          style={{
            fontSize: '0.625rem',
            color: '#A1A1A1',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          SCROLL TO EXPLORE
        </span>
      </div>
    </section>
  );
}