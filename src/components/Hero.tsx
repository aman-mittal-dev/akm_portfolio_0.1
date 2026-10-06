import ProfilePhoto from './ProfilePhoto';

const TECH_BADGES = [
  'Python', 'Django', 'DRF', 'FastAPI',
  'PostgreSQL', 'Redis', 'Celery', 'REST APIs',
  'Docker', 'AWS',
];

const API_FLOW_NODES = [
  { label: 'POST /api/orders', type: 'request' as const },
  { label: 'Auth Middleware', type: 'layer' as const },
  { label: 'Order Service', type: 'service' as const },
  { label: 'PostgreSQL', type: 'db' as const },
  { label: 'Redis Cache', type: 'cache' as const },
  { label: 'Celery Task', type: 'worker' as const },
  { label: '200 OK', type: 'response' as const },
];

interface HeroProps {
  onViewProjects: () => void;
}

export default function Hero({ onViewProjects }: HeroProps) {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div
        className="grid-bg"
        style={{
          position: 'absolute', inset: 0, opacity: 0.6,
          mask: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMask: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* Accent glow */}
      <div style={{
        position: 'absolute', top: '15%', right: '10%',
        width: 480, height: 480,
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '4rem 1.5rem', width: '100%', position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '4rem',
          alignItems: 'center',
        }} className="hero-grid">

          {/* Left: content */}
          <div style={{ maxWidth: 640 }}>
            {/* Professional identity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <ProfilePhoto />
              <div>
                <span className="section-label">Available for backend projects</span>
                <p style={{
                  color: 'var(--color-muted-foreground)',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.68rem',
                  marginTop: '0.25rem',
                }}>
                  Python · APIs · Architecture
                </p>
              </div>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--color-foreground)',
              marginBottom: '1.25rem',
            }}>
              Python Backend
              <br />
              <span style={{ color: 'var(--color-primary)' }}>Developer</span>
            </h1>

            {/* Subheading */}
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--color-secondary-foreground)',
              lineHeight: 1.65,
              marginBottom: '1rem',
              maxWidth: 520,
            }}>
              I build reliable backend systems, REST APIs, database-driven applications,
              integrations, and scalable services using Python.
            </p>

            <p style={{
              fontSize: '0.925rem',
              color: 'var(--color-muted-foreground)',
              lineHeight: 1.75,
              marginBottom: '2.25rem',
              maxWidth: 500,
            }}>
              I enjoy solving backend problems — researching the right approach, improving performance,
              designing clean database schemas, and building systems that are maintainable and reliable
              in production. I care about the reasoning behind technical decisions as much as the code itself.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem' }}>
              <button onClick={onViewProjects} className="btn-primary" style={{ fontSize: '0.925rem', padding: '0.75rem 1.5rem' }}>
                Explore My Projects
                <ArrowRight size={15} />
              </button>
              <a href="/resume.pdf" download className="btn-outline" style={{ fontSize: '0.925rem', padding: '0.75rem 1.5rem' }}>
                <DownloadIcon size={15} />
                Download Resume
              </a>
            </div>

            {/* Tech badges */}
            <div>
              <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--color-muted-foreground)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Core Stack
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {TECH_BADGES.map(tech => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: API flow diagram */}
          <div className="hero-visual" style={{ minWidth: 200 }}>
            <ApiFlowDiagram />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-visual { display: none !important; }
        }
      `}</style>
    </section>
  );
}

function ApiFlowDiagram() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 0,
      padding: '1.5rem',
      background: 'var(--color-card)',
      border: '1px solid var(--color-border)',
      borderRadius: 10,
      minWidth: 220,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '1rem', width: '100%' }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', opacity: 0.8 }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', opacity: 0.8 }} />
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399', opacity: 0.8 }} />
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'var(--color-muted-foreground)', marginLeft: 6 }}>
          api_flow.py
        </span>
      </div>

      {API_FLOW_NODES.map((node, i) => (
        <div key={node.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <FlowNode node={node} index={i} />
          {i < API_FLOW_NODES.length - 1 && (
            <div style={{ position: 'relative', width: 1, height: 28, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--color-border)' }} />
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: '50%',
                background: 'linear-gradient(to bottom, var(--color-primary), transparent)',
                animation: `flowDown ${1.8 + i * 0.3}s ${i * 0.2}s infinite ease-in-out`,
                opacity: 0.7,
              }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function FlowNode({ node, index }: { node: typeof API_FLOW_NODES[0]; index: number }) {
  const colorMap = {
    request: { bg: 'rgba(56, 189, 248, 0.1)', border: 'rgba(56, 189, 248, 0.35)', color: 'var(--color-primary)' },
    layer: { bg: 'rgba(129, 140, 248, 0.08)', border: 'rgba(129, 140, 248, 0.2)', color: 'var(--color-accent)' },
    service: { bg: 'rgba(56, 189, 248, 0.06)', border: 'rgba(56, 189, 248, 0.2)', color: 'var(--color-primary)' },
    db: { bg: 'rgba(52, 211, 153, 0.08)', border: 'rgba(52, 211, 153, 0.25)', color: 'var(--color-success)' },
    cache: { bg: 'rgba(251, 191, 36, 0.06)', border: 'rgba(251, 191, 36, 0.2)', color: 'var(--color-warning)' },
    worker: { bg: 'rgba(129, 140, 248, 0.08)', border: 'rgba(129, 140, 248, 0.2)', color: 'var(--color-accent)' },
    response: { bg: 'rgba(52, 211, 153, 0.1)', border: 'rgba(52, 211, 153, 0.3)', color: 'var(--color-success)' },
  };
  const style = colorMap[node.type];

  return (
    <div style={{
      width: '100%',
      padding: '0.5rem 0.75rem',
      background: style.bg,
      border: `1px solid ${style.border}`,
      borderRadius: 6,
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.68rem',
      color: style.color,
      textAlign: 'center',
      fontWeight: 500,
      animation: `fadeInUp 0.4s ${index * 0.08}s ease-out both`,
    }}>
      {node.label}
    </div>
  );
}

function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function DownloadIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}
