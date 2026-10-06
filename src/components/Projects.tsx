import { useState, useMemo } from 'react';
import { projects } from '../data';
import type { Project } from '../types';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Personal Projects', value: 'personal' },
  { label: 'Professional Experience', value: 'professional' },
  { label: 'Client Projects', value: 'client' },
  { label: 'Django', value: 'Django' },
  { label: 'FastAPI', value: 'FastAPI' },
  { label: 'APIs', value: 'APIs' },
  { label: 'Database', value: 'Database' },
  { label: 'Auth', value: 'Authentication' },
  { label: 'Performance', value: 'Performance Optimization' },
];

interface ProjectsProps {
  onOpenProject: (project: Project) => void;
}

export default function Projects({ onOpenProject }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return projects;
    if (activeFilter === 'personal' || activeFilter === 'professional' || activeFilter === 'client') {
      return projects.filter(p => p.type === activeFilter);
    }
    return projects.filter(p => p.category.includes(activeFilter) || p.tags.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section id="projects" style={{ padding: '6rem 0', borderTop: '1px solid var(--color-border)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <p className="section-label" style={{ marginBottom: '0.75rem' }}>Projects</p>
            <h2 style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 700,
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              letterSpacing: '-0.02em', color: 'var(--color-foreground)',
            }}>
              Featured Case Studies
            </h2>
            <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.925rem', marginTop: '0.625rem', maxWidth: 480 }}>
              Each project includes a full technical breakdown: the problem, my contribution, architecture, research decisions, and results.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`filter-btn ${activeFilter === f.value ? 'active' : ''}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.5rem',
        }}>
          {filtered.map(project => (
            <ProjectCard key={project.id} project={project} onClick={() => onOpenProject(project)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const presentation = getProjectPresentation(project);
  const isPublic = project.visibility === 'public';

  return (
    <article
      className="project-card"
      onClick={onClick}
      style={{
        background: 'var(--color-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 10,
        padding: '1.5rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
    >
      {/* Card header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.625rem', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
              color: presentation.color,
              background: presentation.background,
              border: `1px solid ${presentation.border}`,
              padding: '2px 7px', borderRadius: 4, textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>
              {presentation.category}
            </span>
            <StatusBadge status={project.status} />
          </div>
          <h3 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 600,
            fontSize: '1rem', color: 'var(--color-foreground)',
            letterSpacing: '-0.01em', lineHeight: 1.35,
          }}>
            {project.name}
          </h3>
        </div>
        {!isPublic && (
          <span className="confidential-badge" style={{ flexShrink: 0 }}>
            <LockIcon size={10} />
            {presentation.visibility}
          </span>
        )}
      </div>

      {/* Description */}
      <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.875rem', lineHeight: 1.65, flexGrow: 1 }}>
        {project.shortDescription}
      </p>

      {/* Architecture mini preview */}
      <ArchMiniVisual categories={project.category} />

      {/* Role + duration */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <InfoPill label="Role" value={project.role} />
        <InfoPill label="Duration" value={project.duration} />
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
        {project.tags.slice(0, 5).map(tag => (
          <span key={tag} className="tech-badge muted">{tag}</span>
        ))}
        {project.tags.length > 5 && (
          <span className="tech-badge muted">+{project.tags.length - 5}</span>
        )}
      </div>

      {/* Footer */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: '1rem', borderTop: '1px solid var(--color-border)',
      }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {isPublic && project.github && (
            <a
              href={project.github}
              onClick={e => e.stopPropagation()}
              className="btn-ghost"
              style={{ fontSize: '0.75rem' }}
            >
              <GitHubIcon size={13} /> GitHub
            </a>
          )}
        </div>
        <button
          onClick={onClick}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.375rem',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 500,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Case Study <ArrowRight size={13} />
        </button>
      </div>
    </article>
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
      visibility: project.visibility === 'anonymous-client' ? 'Anonymous' : 'Public',
      color: 'var(--color-accent)',
      background: 'rgba(129, 140, 248, 0.08)',
      border: 'rgba(129, 140, 248, 0.2)',
    };
  }

  return {
    category: 'Professional Experience',
    visibility: 'Confidential',
    color: 'var(--color-warning)',
    background: 'rgba(251, 191, 36, 0.08)',
    border: 'rgba(251, 191, 36, 0.2)',
  };
}

function ArchMiniVisual({ categories }: { categories: string[] }) {
  const icons: Record<string, string> = {
    'Django': '⬡ Django',
    'FastAPI': '⚡ FastAPI',
    'APIs': '↕ REST API',
    'Database': '▤ PostgreSQL',
    'Authentication': '⚿ Auth',
    'Payments': '$ Payments',
    'Performance Optimization': '◎ Perf',
  };

  const shown = categories.slice(0, 4).map(c => icons[c] || c);

  return (
    <div style={{
      display: 'flex', gap: '0.375rem', flexWrap: 'wrap',
      padding: '0.875rem', background: 'rgba(8, 12, 24, 0.5)',
      borderRadius: 6, border: '1px solid rgba(26, 37, 64, 0.5)',
    }}>
      {shown.map((label, i) => (
        <span key={i} style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
          color: 'var(--color-muted-foreground)',
          padding: '3px 8px',
          background: 'var(--color-muted)', borderRadius: 4,
          border: '1px solid var(--color-border)',
        }}>
          {label}
        </span>
      ))}
    </div>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: 'var(--color-muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {label}
      </span>
      <span style={{ fontSize: '0.8rem', color: 'var(--color-secondary-foreground)', fontWeight: 500 }}>
        {value}
      </span>
    </div>
  );
}

function StatusBadge({ status }: { status: Project['status'] }) {
  const map = {
    completed: { color: 'var(--color-success)', label: 'Completed' },
    'in-progress': { color: 'var(--color-warning)', label: 'In Progress' },
    maintained: { color: 'var(--color-accent)', label: 'Maintained' },
  };
  const s = map[status];
  return (
    <span style={{
      fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
      color: s.color, background: `${s.color}14`,
      border: `1px solid ${s.color}33`,
      padding: '2px 7px', borderRadius: 4,
    }}>
      {s.label}
    </span>
  );
}

function GitHubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function LockIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}
