import type { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const presentation = getProjectPresentation(project);
  const isPublic = project.visibility === 'public';

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(8, 12, 24, 0.85)', backdropFilter: 'blur(8px)',
        display: 'flex', justifyContent: 'flex-end',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="detail-overlay"
        style={{
          width: '100%', maxWidth: 840,
          background: 'var(--color-background)',
          borderLeft: '1px solid var(--color-border)',
          height: '100%', overflowY: 'auto',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* Sticky header */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 10,
          background: 'rgba(8, 12, 24, 0.95)', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-border)',
          padding: '1rem 2rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span className="section-label">Case Study</span>
            <ChevronRight size={12} style={{ color: 'var(--color-border)' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'var(--color-muted-foreground)' }}>
              {project.name}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--color-muted)', border: '1px solid var(--color-border)',
              borderRadius: 6, padding: '0.375rem 0.75rem',
              color: 'var(--color-muted-foreground)', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontSize: '0.8rem',
              display: 'flex', alignItems: 'center', gap: '0.375rem',
            }}
          >
            <CloseIcon size={13} /> Close
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>

          {/* Project Header */}
          <div>
            {/* Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
                color: presentation.color,
                background: presentation.background,
                border: `1px solid ${presentation.border}`,
                padding: '3px 8px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>
                {presentation.category}
              </span>
              {!isPublic && (
                <span className="confidential-badge">
                  <LockIcon size={10} /> {presentation.visibility}
                </span>
              )}
              <StatusBadge status={project.status} />
            </div>

            <h1 style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 800,
              fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
              letterSpacing: '-0.02em', color: 'var(--color-foreground)',
              marginBottom: '1.5rem', lineHeight: 1.2,
            }}>
              {project.name}
            </h1>

            {/* Meta grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '1rem', padding: '1.25rem',
              background: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: 8,
              marginBottom: '1.5rem',
            }}>
              <MetaItem label="Role" value={project.role} />
              <MetaItem label="Duration" value={project.duration} />
              <MetaItem label="Status" value={project.status.replace('-', ' ')} />
              <MetaItem label="Visibility" value={presentation.visibility} />
              {project.industry && <MetaItem label="Industry" value={project.industry} />}
            </div>

            {/* Links */}
            {isPublic && (project.github || project.demo || project.docs) && (
              <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: '0.825rem', padding: '0.5rem 1rem' }}>
                    <GitHubIcon size={14} /> GitHub
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '0.825rem', padding: '0.5rem 1rem' }}>
                    <ExternalIcon size={14} /> Live Demo
                  </a>
                )}
                {project.docs && (
                  <a href={project.docs} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    <DocIcon size={14} /> Documentation
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Confidentiality notice */}
          {!isPublic && (
            <div style={{
              padding: '1rem 1.25rem',
              background: 'rgba(251, 191, 36, 0.05)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              borderRadius: 8,
              display: 'flex', gap: '0.875rem', alignItems: 'flex-start',
            }}>
              <LockIcon size={14} style={{ color: 'var(--color-warning)', marginTop: 2, flexShrink: 0 }} />
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-warning)', marginBottom: '0.25rem' }}>
                  {project.visibility === 'anonymous-client'
                    ? 'Anonymous Client Project'
                    : 'Professional / Confidential Project'}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-muted-foreground)', lineHeight: 1.6 }}>
                  Selected project details are intentionally limited due to confidentiality and client/company requirements. This case study describes my contribution at an appropriate level without exposing proprietary information or implying ownership of the underlying product.
                </p>
              </div>
            </div>
          )}

          {/* Overview */}
          <CaseSection title={isPublic ? 'Project Overview' : 'Project / System'} number="01">
            <p style={{ color: 'var(--color-secondary-foreground)', lineHeight: 1.75, fontSize: '0.925rem' }}>
              {project.overview}
            </p>
          </CaseSection>

          {/* Problem */}
          <CaseSection title={isPublic ? 'The Problem' : 'General Technical Challenges'} number="02" accent="primary">
            <div style={{
              padding: '1.25rem',
              background: 'rgba(56, 189, 248, 0.04)',
              border: '1px solid rgba(56, 189, 248, 0.15)',
              borderLeft: '3px solid var(--color-primary)',
              borderRadius: '0 8px 8px 0',
            }}>
              <p style={{ color: 'var(--color-secondary-foreground)', lineHeight: 1.75, fontSize: '0.925rem' }}>
                {project.problem}
              </p>
            </div>
          </CaseSection>

          {/* My Contribution */}
          <CaseSection title={isPublic ? 'What I Built' : 'My Responsibilities & Contribution'} number="03" highlight>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {project.contributions.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
                    color: 'var(--color-primary)', marginTop: '0.3rem', minWidth: 24,
                    opacity: 0.7,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p style={{ color: 'var(--color-secondary-foreground)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </CaseSection>

          {/* Architecture */}
          <CaseSection title={isPublic ? 'System Architecture' : 'General Architecture'} number="04">
            <ArchitectureDiagram layers={project.architecture} />
          </CaseSection>

          {/* Technologies */}
          <CaseSection title="Technologies Used" number="05">
            <TechGrid technologies={project.technologies} />
          </CaseSection>

          {/* Research & Engineering Decisions */}
          {project.research && project.research.length > 0 && (
            <CaseSection title="Research & Engineering Decisions" number="06" accent="accent">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {project.research.map((r, i) => (
                  <ResearchBlock key={i} decision={r} />
                ))}
              </div>
            </CaseSection>
          )}

          {/* Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <CaseSection title="Performance Results" number="07" accent="success">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {project.metrics.map((m, i) => (
                  <MetricCard key={i} metric={m} />
                ))}
              </div>
            </CaseSection>
          )}
        </div>
      </div>
    </div>
  );
}

function getProjectPresentation(project: Project) {
  if (project.type === 'personal') {
    return {
      category: 'Personal Project',
      visibility: 'Public',
      color: 'var(--color-primary)',
      background: 'rgba(56, 189, 248, 0.08)',
      border: 'rgba(56, 189, 248, 0.2)',
    };
  }

  if (project.type === 'client') {
    return {
      category: 'Client Project',
      visibility: project.visibility === 'anonymous-client' ? 'Anonymous Client Project' : 'Public',
      color: 'var(--color-accent)',
      background: 'rgba(129, 140, 248, 0.08)',
      border: 'rgba(129, 140, 248, 0.2)',
    };
  }

  return {
    category: 'Professional Experience',
    visibility: 'Professional / Confidential',
    color: 'var(--color-warning)',
    background: 'rgba(251, 191, 36, 0.08)',
    border: 'rgba(251, 191, 36, 0.2)',
  };
}

function CaseSection({ title, number, children, accent, highlight }: {
  title: string; number: string;
  children: React.ReactNode;
  accent?: 'primary' | 'accent' | 'success';
  highlight?: boolean;
}) {
  const accentColors = {
    primary: 'var(--color-primary)',
    accent: 'var(--color-accent)',
    success: 'var(--color-success)',
  };
  const color = accent ? accentColors[accent] : 'var(--color-border)';

  return (
    <div style={{
      padding: highlight ? '1.5rem' : 0,
      background: highlight ? 'rgba(56, 189, 248, 0.03)' : 'transparent',
      border: highlight ? '1px solid rgba(56, 189, 248, 0.12)' : 'none',
      borderRadius: highlight ? 10 : 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.25rem' }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
          color: 'var(--color-muted-foreground)', minWidth: 24,
        }}>
          {number}
        </span>
        <div style={{ height: 1, width: 20, background: color, opacity: 0.5 }} />
        <h2 style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 700,
          fontSize: '1.125rem', color: 'var(--color-foreground)',
          letterSpacing: '-0.01em',
        }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function ArchitectureDiagram({ layers }: { layers: string[] }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
      gap: 0, padding: '1.5rem',
      background: 'var(--color-card)', border: '1px solid var(--color-border)',
      borderRadius: 8,
    }}>
      {layers.map((layer, i) => (
        <div key={layer} style={{ width: '100%' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.625rem 0.875rem',
            background: i === 0
              ? 'rgba(56, 189, 248, 0.08)'
              : i === layers.length - 1
              ? 'rgba(52, 211, 153, 0.06)'
              : 'rgba(26, 37, 64, 0.5)',
            border: '1px solid',
            borderColor: i === 0
              ? 'rgba(56, 189, 248, 0.25)'
              : i === layers.length - 1
              ? 'rgba(52, 211, 153, 0.2)'
              : 'var(--color-border)',
            borderRadius: 6,
          }}>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem', fontWeight: 500,
              color: i === 0
                ? 'var(--color-primary)'
                : i === layers.length - 1
                ? 'var(--color-success)'
                : 'var(--color-muted-foreground)',
            }}>
              {layer}
            </span>
          </div>
          {i < layers.length - 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 0.875rem' }}>
              <div style={{ width: 1, height: 20, background: 'var(--color-border)', margin: '0 auto 0 1.25rem' }} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: 'var(--color-border)', marginLeft: '0.25rem' }}>
                ↓
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TechGrid({ technologies }: { technologies: { name: string; category: string; usage?: string }[] }) {
  const byCategory = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, typeof technologies>);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {Object.entries(byCategory).map(([cat, techs]) => (
        <div key={cat} style={{
          display: 'grid', gridTemplateColumns: '120px 1fr',
          gap: '0.75rem', paddingBottom: '1rem',
          borderBottom: '1px solid var(--color-border)',
          alignItems: 'start',
        }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
            color: 'var(--color-muted-foreground)', letterSpacing: '0.06em',
            textTransform: 'uppercase', paddingTop: '0.125rem',
          }}>
            {cat}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {techs.map(tech => (
              <div key={tech.name} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                <span className="tech-badge" style={{ flexShrink: 0 }}>{tech.name}</span>
                {tech.usage && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-muted-foreground)', lineHeight: 1.5, paddingTop: '0.125rem' }}>
                    — {tech.usage}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ResearchBlock({ decision }: { decision: NonNullable<Project['research']>[0] }) {
  return (
    <div style={{
      background: 'var(--color-card)', border: '1px solid var(--color-border)',
      borderRadius: 8, overflow: 'hidden',
    }}>
      {/* Flow header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.875rem 1.25rem',
        borderBottom: '1px solid var(--color-border)',
        background: 'rgba(129, 140, 248, 0.04)',
        flexWrap: 'wrap',
      }}>
        {['Problem', '→', 'Research', '→', 'Options', '→', 'Decision', '→', 'Result'].map((step, i) => (
          <span key={i} style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
            color: step === '→' ? 'var(--color-border)' : 'var(--color-accent)',
            opacity: step === '→' ? 0.5 : 0.8,
          }}>
            {step}
          </span>
        ))}
      </div>

      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <ResearchRow label="Problem" content={decision.problem} />
        <ResearchRow label="Research" content={decision.research} />

        <div>
          <ResearchLabel label="Options Considered" />
          <ul style={{ listStyle: 'none', padding: 0, margin: '0.5rem 0 0', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {decision.options.map((opt, i) => (
              <li key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'var(--color-accent)', opacity: 0.7, marginTop: 2 }}>
                  {i + 1}.
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-secondary-foreground)', lineHeight: 1.55 }}>
                  {opt}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <ResearchRow label="Trade-offs" content={decision.tradeoffs} />
        <ResearchRow label="Decision" content={decision.decision} accent="primary" />
        {decision.result && <ResearchRow label="Result" content={decision.result} accent="success" />}
      </div>
    </div>
  );
}

function ResearchLabel({ label }: { label: string }) {
  return (
    <span style={{
      fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
      color: 'var(--color-muted-foreground)', letterSpacing: '0.08em',
      textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem',
    }}>
      {label}
    </span>
  );
}

function ResearchRow({ label, content, accent }: { label: string; content: string; accent?: 'primary' | 'success' }) {
  const colors = {
    primary: 'var(--color-primary)',
    success: 'var(--color-success)',
  };
  const c = accent ? colors[accent] : null;

  return (
    <div>
      <ResearchLabel label={label} />
      <p style={{
        fontSize: '0.875rem',
        color: c || 'var(--color-secondary-foreground)',
        lineHeight: 1.65,
        paddingLeft: c ? '0.75rem' : 0,
        borderLeft: c ? `2px solid ${c}` : 'none',
        fontWeight: c ? 500 : 400,
      }}>
        {content}
      </p>
    </div>
  );
}

function MetricCard({ metric }: { metric: NonNullable<Project['metrics']>[0] }) {
  return (
    <div className="metric-card" style={{
      padding: '1.25rem',
      background: 'var(--color-card)',
      border: '1px solid var(--color-border)',
      borderRadius: '0 8px 8px 0',
    }}>
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: 'var(--color-muted-foreground)', marginBottom: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {metric.label}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', color: 'var(--color-muted-foreground)', textDecoration: 'line-through', opacity: 0.6 }}>
            {metric.before}
          </p>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: 'var(--color-muted-foreground)', marginTop: '2px' }}>before</p>
        </div>
        <span style={{ color: 'var(--color-success)', fontSize: '1rem' }}>→</span>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-success)' }}>
            {metric.after}
          </p>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: 'var(--color-success)', marginTop: '2px' }}>after</p>
        </div>
      </div>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: 'var(--color-muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
        {label}
      </p>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-foreground)', fontWeight: 500, textTransform: 'capitalize' }}>
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { color: string; label: string }> = {
    completed: { color: 'var(--color-success)', label: 'Completed' },
    'in-progress': { color: 'var(--color-warning)', label: 'In Progress' },
    maintained: { color: 'var(--color-accent)', label: 'Maintained' },
  };
  const s = map[status] || { color: 'var(--color-muted-foreground)', label: status };
  return (
    <span style={{
      fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
      color: s.color, background: `${s.color}14`,
      border: `1px solid ${s.color}33`,
      padding: '3px 8px', borderRadius: 4,
    }}>
      {s.label}
    </span>
  );
}

function ChevronRight({ size = 14, style: s }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={s}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function CloseIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ExternalIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  );
}

function DocIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function LockIcon({ size = 12, style: s }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={s}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}
