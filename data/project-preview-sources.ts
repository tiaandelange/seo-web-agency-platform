export type ProjectPreviewId = 'damtech' | 'proplytic' | 'wedding';

export type ProjectPreviewSource = {
  id: ProjectPreviewId;
  projectName: string;
  repositoryFullName: string | null;
  localSourcePath?: string;
  sourceBranch: string;
  sourceCommit: string;
  sourceRoute: string;
  sourceFiles: string[];
  assetFiles: string[];
  importedAt: string;
  adaptationNotes: string[];
};

/**
 * Development provenance only — not rendered in public HTML.
 */
export const projectPreviewSources: ProjectPreviewSource[] = [
  {
    id: 'damtech',
    projectName: 'Damtech website',
    repositoryFullName: null,
    sourceBranch: 'unknown',
    sourceCommit: 'live-homepage-2026-07-22',
    sourceRoute: 'https://www.dam-tech.co.za/',
    sourceFiles: [
      'components/projects/project-preview/damtech/damtech-source-markup.ts',
      'components/projects/project-preview/damtech/damtech-homepage-frame.tsx',
      'components/projects/project-preview/damtech/damtech-preview.css',
      'components/projects/project-preview/damtech/damtech-preview.tsx',
    ],
    assetFiles: ['public/project-previews/damtech/western-cape-dam-lining-reservoir-damtech.webp'],
    importedAt: '2026-07-22',
    adaptationNotes: [
      'Header and hero HTML extracted from live SSR homepage at dam-tech.co.za (2026-07-22).',
      'Styles extracted from live homepage stylesheets and scoped under .damtechPreviewRoot.',
      'Repository not available locally; source commit recorded as live homepage snapshot.',
      'Header position changed from fixed to absolute for preview containment.',
      'Links, buttons and tel/mailto actions neutralised; preview is aria-hidden and inert.',
      'Phone number retained visually as on live homepage.',
      'Unlayered typography isolation prevents Koppie globals.css h1–h6 rules from overriding source theme.',
    ],
  },
  {
    id: 'proplytic',
    projectName: 'Proplytic marketing site',
    repositoryFullName: 'AfriviveSA/Property-Website',
    localSourcePath: 'C:/Users/Tiaan/GitHub/Property-Website-temp',
    sourceBranch: 'main',
    sourceCommit: 'live-homepage-2026-07-22',
    sourceRoute: 'https://www.proplytic.co.za/',
    sourceFiles: [
      'components/projects/project-preview/proplytic/proplytic-source-markup.ts',
      'components/projects/project-preview/proplytic/proplytic-homepage-frame.tsx',
      'components/projects/project-preview/proplytic/proplytic-preview.css',
      'components/projects/project-preview/proplytic/proplytic-preview.tsx',
    ],
    assetFiles: [
      'public/project-previews/proplytic/proplytic_logo_600x200_nobg_light.png',
      'public/project-previews/proplytic/proplytic_logo_600x200_nobg.png',
      'public/project-previews/proplytic/proplytic_icon_500x500.png',
    ],
    importedAt: '2026-07-22',
    adaptationNotes: [
      'Header and hero HTML extracted from live production homepage at proplytic.co.za (2026-07-22).',
      'Production homepage differs from AfriviveSA/Property-Website snapshot (legacy The Property Guy marketing).',
      'Styles copied from production bundles index-BjHQKxtZ.css and HomePage-C3-RLYzO.css, scoped under .proplyticPreviewRoot.',
      'Dashboard sample data in hero visual is production demonstration content, not real portfolio data.',
      'Links and controls neutralised; preview is aria-hidden and inert.',
      'Unlayered typography isolation prevents Koppie globals.css from overriding source purple/dark theme.',
    ],
  },
  {
    id: 'wedding',
    projectName: 'Wedding website',
    repositoryFullName: null,
    localSourcePath: 'C:/Users/Tiaan/GitHub/Wedding-site',
    sourceBranch: 'main',
    sourceCommit: 'unverified',
    sourceRoute: '/',
    sourceFiles: [
      'C:/Users/Tiaan/GitHub/Wedding-site/index.html',
      'C:/Users/Tiaan/GitHub/Wedding-site/styles.css',
      'components/projects/project-preview/wedding/wedding-preview.tsx',
      'components/projects/project-preview/wedding/wedding-preview.css',
    ],
    assetFiles: ['public/project-previews/wedding/hero.jpg'],
    importedAt: '2026-07-22',
    adaptationNotes: [
      'Header and hero ported from local Wedding-site repository (index.html + styles.css).',
      'Navigation links converted to inert spans; mobile menu toggle omitted in preview crop.',
      'Hero entrance animations preserved via is-loaded / split-text hooks; respects prefers-reduced-motion.',
      'Private contact, venue and RSVP sections below hero excluded from preview crop.',
      'Owner publication permission for portfolio use not yet recorded.',
    ],
  },
];

export function previewSourceById(id: ProjectPreviewId): ProjectPreviewSource {
  const source = projectPreviewSources.find((entry) => entry.id === id);
  if (!source) throw new Error(`Unknown preview source: ${id}`);
  return source;
}
