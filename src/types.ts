export interface Technology {
  name: string;
  category: string;
  usage?: string;
}

export interface ProjectMetric {
  label: string;
  before: string;
  after: string;
}

export interface ResearchDecision {
  problem: string;
  research: string;
  options: string[];
  tradeoffs: string;
  decision: string;
  result?: string;
}

export type ProjectType = 'personal' | 'professional' | 'client';

export type ProjectVisibility =
  | 'public'
  | 'professional-confidential'
  | 'anonymous-client';

export interface Project {
  id: string;
  name: string;
  type: ProjectType;
  visibility: ProjectVisibility;
  category: string[];
  role: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'maintained';
  shortDescription: string;
  overview: string;
  problem: string;
  contributions: string[];
  technologies: Technology[];
  architecture: string[];
  research?: ResearchDecision[];
  metrics?: ProjectMetric[];
  github?: string;
  demo?: string;
  docs?: string;
  industry?: string;
  tags: string[];
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  duration: string;
  type: 'fulltime' | 'freelance' | 'contract';
  technologies: string[];
  responsibilities: string[];
  highlights: string[];
}

export interface SkillGroup {
  category: string;
  skills: { name: string; detail?: string }[];
}

export interface EngineeringNote {
  id: string;
  title: string;
  category: string;
  summary: string;
  technologies: string[];
  date: string;
  readTime: string;
}
