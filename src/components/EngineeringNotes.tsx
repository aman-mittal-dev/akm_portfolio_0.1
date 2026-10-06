import { engineeringNotes } from '../data';

const CATEGORY_COLORS: Record<string, { bg: string; border: string; color: string }> = {
  'Database': { bg: 'rgba(52, 211, 153, 0.08)', border: 'rgba(52, 211, 153, 0.2)', color: 'var(--color-success)' },
  'API Design': { bg: 'rgba(56, 189, 248, 0.08)', border: 'rgba(56, 189, 248, 0.2)', color: 'var(--color-primary)' },
  'Authentication': { bg: 'rgba(129, 140, 248, 0.08)', border: 'rgba(129, 140, 248, 0.2)', color: 'var(--color-accent)' },
  'Backend': { bg: 'rgba(251, 191, 36, 0.06)', border: 'rgba(251, 191, 36, 0.2)', color: 'var(--color-warning)' },
  'Performance': { bg: 'rgba(56, 189, 248, 0.08)', border: 'rgba(56, 189, 248, 0.2)', color: 'var(--color-primary)' },
};

export default function EngineeringNotes() {
  return (
    <section id="notes" style={{ padding: '6rem 0', borderTop: '1px solid var(--color-border)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ marginBottom: '3.5rem' }}>
          <p className="section-label" style={{ marginBottom: '0.75rem' }}>Engineering Notes</p>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 700,
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            letterSpacing: '-0.02em', color: 'var(--color-foreground)',
            maxWidth: 560,
          }}>
            Technical Research & Decisions
          </h2>
          <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.9rem', marginTop: '0.75rem', maxWidth: 520 }}>
            In-depth technical notes on backend engineering topics — database patterns, API design, authentication security, and performance optimization.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.25rem',
        }}>
          {engineeringNotes.map(note => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NoteCard({ note }: { note: typeof engineeringNotes[0] }) {
  const colors = CATEGORY_COLORS[note.category] || {
    bg: 'rgba(56, 189, 248, 0.06)',
    border: 'rgba(56, 189, 248, 0.15)',
    color: 'var(--color-primary)',
  };

  return (
    <article style={{
      background: 'var(--color-card)',
      border: '1px solid var(--color-border)',
      borderRadius: 10,
      padding: '1.5rem',
      display: 'flex', flexDirection: 'column', gap: '1rem',
      cursor: 'pointer',
      transition: 'border-color 0.2s, transform 0.2s',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.25)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'var(--color-border)';
      e.currentTarget.style.transform = 'none';
    }}
    >
      {/* Meta */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
          padding: '3px 8px', borderRadius: 4,
          background: colors.bg, border: `1px solid ${colors.border}`, color: colors.color,
        }}>
          {note.category}
        </span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'var(--color-muted-foreground)' }}>
          {note.readTime} read
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'Outfit, sans-serif', fontWeight: 600,
        fontSize: '0.975rem', color: 'var(--color-foreground)',
        letterSpacing: '-0.01em', lineHeight: 1.4,
        flexGrow: 1,
      }}>
        {note.title}
      </h3>

      {/* Summary */}
      <p style={{
        fontSize: '0.845rem', color: 'var(--color-muted-foreground)',
        lineHeight: 1.65,
      }}>
        {note.summary}
      </p>

      {/* Footer */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: '0.875rem', borderTop: '1px solid var(--color-border)',
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
          {note.technologies.slice(0, 3).map(t => (
            <span key={t} className="tech-badge muted" style={{ fontSize: '0.6rem' }}>{t}</span>
          ))}
        </div>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--color-muted-foreground)' }}>
          {note.date}
        </span>
      </div>
    </article>
  );
}
