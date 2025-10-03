export type SocialLink = { label: string; url: string };

export type WorkItem = {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  achievements: string[];
  techStack?: string[];
};

export type EducationItem = {
  id: string;
  school: string;
  degree: string;
  startDate?: string;
  endDate?: string;
  details?: string[];
};

export type ProjectItem = {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  techStack?: string[];
  link?: string;
};

export type CertificationItem = {
  id: string;
  name: string;
  org?: string;
  date?: string;
};

export type CVProfile = {
  id: string;
  basic: {
    fullName: string;
    title: string;
    summary: string;
    location?: string;
    phone?: string;
    email?: string;
    website?: string;
    socials?: SocialLink[];
  };
  work: WorkItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  skills: {
    core: string[];
    tools?: string[];
    soft?: string[];
    languages?: string[];
  };
  certifications?: CertificationItem[];
  extras?: Record<string, unknown>;
  targetRole?: string;
  targetJD?: string;
  createdAt: string;
  updatedAt: string;
};

export type TemplateId = 'atsClassic' | 'minimalClean' | 'modernAccent' | 'techPortfolio';
