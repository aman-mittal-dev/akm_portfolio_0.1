import { skillGroups } from '../data';

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '6rem 0', borderTop: '1px solid var(--color-border)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ marginBottom: '3.5rem' }}>
          <p className="section-label" style={{ marginBottom: '0.75rem' }}>Skills</p>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 700,
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            letterSpacing: '-0.02em', color: 'var(--color-foreground)',
            maxWidth: 560,
          }}>
            Technical Competencies
          </h2>
          <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.9rem', marginTop: '0.75rem', maxWidth: 480 }}>
            Grouped by area of practice — each entry describes how the technology is actually used, not a percentage bar.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {skillGroups.map(group => (
            <SkillGroupCard key={group.category} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillGroupCard({ group }: { group: typeof skillGroups[0] }) {
  const CATEGORY_ICONS: Record<string, string> = {
    'Programming Language': '{ }',
    'Backend Frameworks': '⬡',
    'API Development': '↕',
    'Databases': '▤',
    'Background Processing': '⚙',
    'Infrastructure & DevOps': '◈',
    'Testing & Tools': '✓',
  };

  const icon = CATEGORY_ICONS[group.category] || '·';

  return (
    <div style={{
      background: 'var(--color-card)',
      border: '1px solid var(--color-border)',
      borderRadius: 10,
      overflow: 'hidden',
      transition: 'border-color 0.2s',
    }}
    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.25)')}
    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
    >
      {/* Card header */}
      <div style={{
        padding: '1rem 1.25rem',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        background: 'rgba(8, 12, 24, 0.4)',
      }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.875rem',
          color: 'var(--color-primary)', opacity: 0.7, minWidth: 24,
        }}>
          {icon}
        </span>
        <h3 style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 600,
          fontSize: '0.925rem', color: 'var(--color-foreground)',
          letterSpacing: '-0.01em',
        }}>
          {group.category}
        </h3>
      </div>

      {/* Skills */}
      <div style={{ padding: '0.5rem 0' }}>
        {group.skills.map((skill, i) => (
          <div
            key={skill.name}
            style={{
              padding: '0.75rem 1.25rem',
              borderBottom: i < group.skills.length - 1 ? '1px solid rgba(26, 37, 64, 0.5)' : 'none',
              display: 'flex', flexDirection: 'column', gap: '0.25rem',
            }}
          >
            <span style={{
              fontFamily: 'Inter, sans-serif', fontWeight: 600,
              fontSize: '0.875rem', color: 'var(--color-foreground)',
            }}>
              {skill.name}
            </span>
            {skill.detail && (
              <span style={{
                fontSize: '0.78rem', color: 'var(--color-muted-foreground)',
                lineHeight: 1.5,
              }}>
                {skill.detail}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
