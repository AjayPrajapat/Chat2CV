import { CVProfile, TemplateId } from '@types/cv';
import { atsClassic } from './atsClassic';
import { minimalClean } from './minimalClean';
import { modernAccent } from './modernAccent';
import { techPortfolio } from './techPortfolio';

export const templateRenderers: Record<TemplateId, (profile: CVProfile) => string> = {
  atsClassic,
  minimalClean,
  modernAccent,
  techPortfolio
};

export const templateMetadata: Record<TemplateId, { title: string; description: string }> = {
  atsClassic: { title: 'ATS Classic', description: 'Safe chronological layout optimized for ATS parsing.' },
  minimalClean: { title: 'Minimal Clean', description: 'Two-column minimal layout with soft accents.' },
  modernAccent: { title: 'Modern Accent', description: 'Bold gradient header with modern flair.' },
  techPortfolio: { title: 'Tech Portfolio', description: 'Monospace, project-heavy layout for engineers.' }
};
