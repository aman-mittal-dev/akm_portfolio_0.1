const FOOTER_LINKS = {
  Navigation: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Engineering Notes', href: '#notes' },
    { label: 'Contact', href: '#contact' },
  ],
  Connect: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Upwork', href: 'https://upwork.com' },
    { label: 'Email', href: 'mailto:hello@example.com' },
  ],
};

export default function Footer() {
  const scrollTo = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer style={{
      borderTop: '1px solid var(--color-border)',
      padding: '4rem 0 2rem',
      background: 'var(--color-card)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Top: brand + links */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto auto',
          gap: '3rem',
          marginBottom: '3rem',
          alignItems: 'start',
        }} className="footer-grid">
          {/* Brand */}
          <div style={{ maxWidth: 320 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.75rem' }}>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-foreground)', letterSpacing: '-0.02em' }}>
                Dev
              </span>
              <span style={{ color: 'var(--color-primary)', fontWeight: 800, fontSize: '1.25rem', fontFamily: 'Outfit, sans-serif' }}>.</span>
            </div>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--color-primary)', opacity: 0.7, marginBottom: '0.75rem' }}>
              Python Backend Developer
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-muted-foreground)', lineHeight: 1.65 }}>
              Building reliable backend systems with Python. Focused on clean APIs, solid database design, and maintainable code.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--color-muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              Navigation
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {FOOTER_LINKS.Navigation.map(link => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left', padding: 0,
                    fontSize: '0.875rem', color: 'var(--color-muted-foreground)',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-foreground)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted-foreground)'}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--color-muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              Connect
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {FOOTER_LINKS.Connect.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '0.875rem', color: 'var(--color-muted-foreground)',
                    textDecoration: 'none', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-foreground)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted-foreground)'}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: copyright */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid var(--color-border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '0.75rem',
        }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--color-muted-foreground)' }}>
            © {new Date().getFullYear()} Python Backend Developer. All rights reserved.
          </p>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'var(--color-muted-foreground)', opacity: 0.5 }}>
            Built with React + Vite
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </footer>
  );
}
