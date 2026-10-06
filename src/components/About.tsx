const PROFILE_ROWS = [
  { label: 'Role', value: 'Python Backend Developer' },
  { label: 'Primary Language', value: 'Python' },
  { label: 'Backend', value: 'Django / DRF / FastAPI' },
  { label: 'Databases', value: 'PostgreSQL / SQL / Redis' },
  { label: 'Infrastructure', value: 'Docker / AWS / Linux' },
  { label: 'API', value: 'REST / JWT / OAuth2 / Webhooks' },
];

const INTERESTS = [
  'Designing REST APIs with clean resource models',
  'Authentication and authorization architecture',
  'Database schema design and query optimization',
  'Third-party API integrations and webhooks',
  'Backend system architecture',
  'Performance profiling and optimization',
  'Background job processing with Celery',
  'Debugging complex production issues',
  'Researching technical approaches and trade-offs',
  'Building maintainable, well-tested backend systems',
];

export default function About() {
  return (
    <section id="about" style={{ padding: '6rem 0', borderTop: '1px solid var(--color-border)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Section header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <p className="section-label" style={{ marginBottom: '0.75rem' }}>About</p>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 700,
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            letterSpacing: '-0.02em', color: 'var(--color-foreground)',
            maxWidth: 560,
          }}>
            Engineering-focused backend developer
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: '4rem',
          alignItems: 'start',
        }} className="about-grid">

          {/* Left: content blocks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <AboutBlock
              title="Who I Am"
              number="01"
              content="I'm a Python backend developer focused on building reliable, well-structured backend systems. I work primarily with Django, Django REST Framework, and FastAPI to design APIs, model databases, implement authentication, and integrate services."
            />
            <AboutBlock
              title="How I Work"
              number="02"
              content="I approach backend work methodically — I research the problem before writing code, consider the trade-offs between approaches, and try to understand why a particular solution is the right one before committing to it. I write tested, documented, and maintainable code. When something breaks in production, I investigate the root cause rather than applying a quick patch."
            />
            <AboutBlock
              title="What I Enjoy Building"
              number="03"
              content={null}
              list={INTERESTS}
            />
          </div>

          {/* Right: profile card */}
          <div style={{ position: 'sticky', top: '5rem' }}>
            <ProfileCard />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}

function AboutBlock({ title, number, content, list }: {
  title: string; number: string;
  content: string | null; list?: string[];
}) {
  return (
    <div style={{ display: 'flex', gap: '1.5rem' }}>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.65rem', fontWeight: 500,
        color: 'var(--color-primary)', opacity: 0.6,
        paddingTop: '0.25rem', minWidth: 28,
      }}>
        {number}
      </div>
      <div>
        <h3 style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 600,
          fontSize: '1.1rem', color: 'var(--color-foreground)',
          marginBottom: '0.875rem', letterSpacing: '-0.01em',
        }}>
          {title}
        </h3>
        {content && (
          <p style={{ color: 'var(--color-secondary-foreground)', lineHeight: 1.75, fontSize: '0.925rem' }}>
            {content}
          </p>
        )}
        {list && (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {list.map(item => (
              <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem', color: 'var(--color-secondary-foreground)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                <span style={{ color: 'var(--color-primary)', marginTop: '0.3rem', flexShrink: 0 }}>
                  <CheckIcon size={12} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function ProfileCard() {
  return (
    <div style={{
      background: 'var(--color-card)',
      border: '1px solid var(--color-border)',
      borderRadius: 10,
      overflow: 'hidden',
    }}>
      {/* Card header */}
      <div style={{
        padding: '1.25rem 1.5rem',
        borderBottom: '1px solid var(--color-border)',
        background: 'rgba(56, 189, 248, 0.04)',
      }}>
        <p style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.65rem', color: 'var(--color-primary)',
          letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.375rem',
        }}>
          developer_profile.json
        </p>
        <div style={{ display: 'flex', gap: '0.375rem' }}>
          {['#f87171', '#fbbf24', '#34d399'].map(c => (
            <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.7 }} />
          ))}
        </div>
      </div>

      {/* Profile rows */}
      <div style={{ padding: '0.25rem 0' }}>
        {PROFILE_ROWS.map((row, i) => (
          <div
            key={row.label}
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderBottom: i < PROFILE_ROWS.length - 1 ? '1px solid rgba(26, 37, 64, 0.5)' : 'none',
              alignItems: 'start',
            }}
          >
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem', color: 'var(--color-muted-foreground)',
              letterSpacing: '0.03em', paddingTop: '0.1rem',
            }}>
              {row.label}
            </span>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.825rem', color: 'var(--color-foreground)',
              fontWeight: 500, lineHeight: 1.4,
            }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        padding: '1rem 1.5rem',
        borderTop: '1px solid var(--color-border)',
        display: 'flex', gap: '0.5rem', flexWrap: 'wrap',
      }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
          color: 'var(--color-success)', opacity: 0.9,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-success)', display: 'inline-block' }} />
          Open to opportunities
        </span>
      </div>
    </div>
  );
}

function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
