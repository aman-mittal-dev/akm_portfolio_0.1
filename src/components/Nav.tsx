import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Notes', href: '#notes' },
  { label: 'Contact', href: '#contact' },
];

interface NavProps {
  activeSection: string;
}

export default function Nav({ activeSection }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        background: scrolled ? 'rgba(8, 12, 24, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          {/* Brand */}
          <button
            onClick={() => handleNav('#home')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}
          >
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'var(--color-foreground)', letterSpacing: '-0.01em' }}>
              Dev<span style={{ color: 'var(--color-primary)' }}>.</span>
            </span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: 'var(--color-muted-foreground)', letterSpacing: '0.08em' }}>
              python backend
            </span>
          </button>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* External links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }} className="desktop-nav">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-ghost" aria-label="GitHub">
                <GitHubIcon />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn-ghost" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
            </div>

            <button
              onClick={() => handleNav('#projects')}
              className="btn-primary"
              style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
            >
              View Projects
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              style={{ background: 'none', border: '1px solid var(--color-border)', borderRadius: 6, padding: '0.375rem', cursor: 'pointer', display: 'none', color: 'var(--color-foreground)' }}
              className="mobile-menu-btn"
              aria-label="Toggle menu"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            borderTop: '1px solid var(--color-border)',
            padding: '1rem 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}>
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  textAlign: 'left', padding: '0.625rem 0.5rem',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: 500,
                  color: activeSection === link.href.slice(1) ? 'var(--color-primary)' : 'var(--color-foreground)',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                {link.label}
              </button>
            ))}
            <div style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem 0.5rem 0' }}>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <GitHubIcon /> GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <LinkedInIcon /> LinkedIn
              </a>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
