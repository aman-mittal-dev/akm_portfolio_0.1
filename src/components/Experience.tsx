import { experiences } from '../data';

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '6rem 0', borderTop: '1px solid var(--color-border)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ marginBottom: '3.5rem' }}>
          <p className="section-label" style={{ marginBottom: '0.75rem' }}>Experience</p>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 700,
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            letterSpacing: '-0.02em', color: 'var(--color-foreground)',
          }}>
            Professional Background
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="exp-grid">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .exp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const typeColors: Record<string, string> = {
    fulltime: 'var(--color-primary)',
    freelance: 'var(--color-accent)',
    contract: 'var(--color-warning)',
  };
  const typeLabels: Record<string, string> = {
    fulltime: 'Full-time',
    freelance: 'Freelance',
    contract: 'Contract',
  };

  return (
    <div style={{
      background: 'var(--color-card)',
      border: '1px solid var(--color-border)',
      borderRadius: 10,
      padding: '1.75rem',
      display: 'flex', flexDirection: 'column', gap: '1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Index marker */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        fontFamily: 'JetBrains Mono, monospace', fontSize: '4rem', fontWeight: 800,
        color: 'var(--color-foreground)', opacity: 0.025, lineHeight: 1,
        transform: 'translate(8px, -8px)',
        userSelect: 'none',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Header */}
      <div>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
            color: typeColors[exp.type],
            background: `${typeColors[exp.type]}14`,
            border: `1px solid ${typeColors[exp.type]}33`,
            padding: '2px 8px', borderRadius: 4,
          }}>
            {typeLabels[exp.type]}
          </span>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
            color: 'var(--color-muted-foreground)', padding: '2px 8px',
            border: '1px solid var(--color-border)', borderRadius: 4,
          }}>
            {exp.duration}
          </span>
        </div>

        <h3 style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 700,
          fontSize: '1.125rem', color: 'var(--color-foreground)',
          letterSpacing: '-0.01em', marginBottom: '0.25rem',
        }}>
          {exp.role}
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-primary)', fontWeight: 500 }}>
          {exp.company}
        </p>
      </div>

      {/* Tech stack */}
      <div>
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--color-muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.625rem' }}>
          Stack
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
          {exp.technologies.map(tech => (
            <span key={tech} className="tech-badge muted" style={{ fontSize: '0.65rem' }}>{tech}</span>
          ))}
        </div>
      </div>

      {/* Responsibilities */}
      <div>
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--color-muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
          Responsibilities
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {exp.responsibilities.map(r => (
            <li key={r} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--color-border)', marginTop: '0.45rem', flexShrink: 0 }}>
                <DotIcon />
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-secondary-foreground)', lineHeight: 1.6 }}>
                {r}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Highlights */}
      <div style={{
        padding: '1rem',
        background: 'rgba(56, 189, 248, 0.04)',
        border: '1px solid rgba(56, 189, 248, 0.12)',
        borderRadius: 6,
      }}>
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem', opacity: 0.8 }}>
          Technical Highlights
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {exp.highlights.map(h => (
            <li key={h} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--color-primary)', marginTop: '0.3rem', flexShrink: 0 }}>
                <StarIcon size={11} />
              </span>
              <span style={{ fontSize: '0.825rem', color: 'var(--color-foreground)', lineHeight: 1.55, fontWeight: 500 }}>
                {h}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DotIcon() {
  return <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-border)' }} />;
}

function StarIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
